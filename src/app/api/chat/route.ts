export const runtime = "nodejs";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const fallbackBio = `
Azhar is a full-stack developer who builds fast, intelligent, and visually precise
products with Next.js, Django, Tailwind CSS, PostgreSQL, TypeScript, and AI workflows.
Featured work includes Vertec, AI apps, and a futuristic portfolio system. Azhar is
available for web builds and focuses on clean UI, reliable backend operations, and
practical automation.
`;

function buildInstructions() {
  const bio = process.env.PORTFOLIO_BIO_CONTEXT?.trim() || fallbackBio.trim();

  return `
You are Azhar's portfolio assistant.
Use only the provided portfolio/resume context below to answer questions about Azhar.
If a question is unrelated to Azhar, his work, skills, projects, experience, education,
availability, or contact details, politely say you can only answer questions about Azhar.
If the answer is not in the context, say that the portfolio does not include that detail yet.
Keep responses concise, helpful, and confident.

Portfolio/resume context:
${bio}
`;
}

function sanitizeMessages(messages: ChatMessage[]) {
  return messages
    .filter((message) => message.role === "assistant" || message.role === "user")
    .slice(-8)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 1200),
    }));
}

function extractText(data: unknown) {
  if (
    data &&
    typeof data === "object" &&
    "output_text" in data &&
    typeof data.output_text === "string"
  ) {
    return data.output_text;
  }

  if (!data || typeof data !== "object" || !("output" in data) || !Array.isArray(data.output)) {
    return null;
  }

  return (data.output as unknown[])
    .flatMap((item) => {
      if (!item || typeof item !== "object" || !("content" in item) || !Array.isArray(item.content)) {
        return [];
      }

      return (item.content as unknown[]).flatMap((contentItem) => {
        if (
          contentItem &&
          typeof contentItem === "object" &&
          "text" in contentItem &&
          typeof contentItem.text === "string"
        ) {
          return [contentItem.text];
        }

        return [];
      });
    })
    .join("\n")
    .trim();
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "Missing OPENAI_API_KEY. Add it in Vercel Project Settings." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as { messages?: ChatMessage[] };
  const messages = sanitizeMessages(body.messages ?? []);

  if (messages.length === 0) {
    return Response.json({ error: "Please send at least one message." }, { status: 400 });
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
      instructions: buildInstructions(),
      input: messages,
      max_output_tokens: 420,
    }),
  });

  const data = (await response.json()) as unknown;

  if (!response.ok) {
    const message =
      data && typeof data === "object" && "error" in data
        ? JSON.stringify(data.error)
        : "OpenAI request failed.";

    return Response.json({ error: message }, { status: response.status });
  }

  const message = extractText(data);

  return Response.json({
    message:
      message ||
      "I could not produce a response from the portfolio context. Please try again.",
  });
}
