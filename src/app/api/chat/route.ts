import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const RESUME_URL = "/resume.pdf";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const fallbackBio = `
Azhar is a Software Developer specializing in Next.js, Django, React, Vue.js, Payload CMS, and WordPress. 
He built the Vertec project (Django CMS), Kendris (Payload CMS), and Vibe Logs (Mood Tracker). 
He is currently focusing on mastering AI Integration and LLM workflows.
`;

function buildSystemInstruction() {
  const bio = process.env.PORTFOLIO_BIO_CONTEXT?.trim() || fallbackBio.trim();

  return `
You are Azhar's AI assistant.
Use only the portfolio/resume context below to answer questions about Azhar.
If someone ask about his availability so say this Azhar is available on weekdays from 11:00 AM to 07:00 PM.
If a question is unrelated to Azhar, his work, skills, projects, experience,
If asked for a resume or CV, provide this link: ${RESUME_URL}
education, availability, or contact details, politely say you can only answer
questions about Azhar.
If the answer is not in the context, say that the portfolio does not include
that detail yet.
Keep responses concise, helpful, professional and confident.
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

function buildTranscript(messages: ReturnType<typeof sanitizeMessages>) {
  return messages
    .map((message) => {
      const speaker = message.role === "user" ? "Visitor" : "Assistant";
      return `${speaker}: ${message.content}`;
    })
    .join("\n\n");
}

function extractGeminiError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Gemini request failed.";
}

export async function POST(request: Request) {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "Missing GOOGLE_API_KEY. Add it in Vercel Project Settings." },
      { status: 500 },
    );
  }

  const body = (await request.json()) as { messages?: ChatMessage[] };
  const messages = sanitizeMessages(body.messages ?? []);

  if (messages.length === 0) {
    return Response.json({ error: "Please send at least one message." }, { status: 400 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
      systemInstruction: buildSystemInstruction(),
      generationConfig: {
        maxOutputTokens: 420,
        temperature: 0.45,
      },
    });

    const result = await model.generateContent(`
Continue this portfolio chat. Answer the latest visitor message only.

Conversation:
${buildTranscript(messages)}
`);

    const message = result.response.text().trim();

    return Response.json({
      message:
        message ||
        "I could not produce a response from the portfolio context. Please try again.",
    });
  } catch (error) {
    return Response.json({ error: extractGeminiError(error) }, { status: 500 });
  }
}
