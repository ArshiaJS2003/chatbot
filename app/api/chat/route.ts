import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools'; 

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  console.log("Messages are ", messages);

  const context = `
  The chatbot helps students track:
  1) Subject-wise attendance (classes attended / total classes conducted)
  2) Internal marks (marks obtained / maximum marks)

  Rules:
  - Attendance % = (attended / total) * 100
  - 75% is minimum eligibility criteria
  - Internal % = (marks obtained / maximum marks) * 100

  Risk Levels:
  - High Risk: Attendance < 65% OR Internal < 40%
  - Moderate Risk: Attendance 65%–74% OR Internal 40%–50%
  - Low Risk: Attendance >= 75% AND Internal >= 50%

  If total classes = 0, say attendance cannot be calculated.
  Always round percentages to 2 decimal places.
  Always give summary and improvement suggestions.
  `;

  const systemPrompt = `
  You are a College Academic Assistant chatbot.
  Your job is to calculate attendance percentage, internal marks percentage,
  check 75% eligibility criteria, and determine academic risk level.

  Always:
  - Show clear calculations.
  - Be supportive and professional.
  - Ask for missing data if needed.
  - Give subject-wise results and overall summary.
  - Provide actionable improvement suggestions.

  Keep responses structured and easy to read.

  Following is the context:
  ${context}
  `;

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),

    // Optional: enable tool calling later
    // tools,
    // maxSteps: 5,
  });

  return result.toUIMessageStreamResponse();
}

