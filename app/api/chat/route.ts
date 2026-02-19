import { streamText, UIMessage, convertToModelMessages } from 'ai';
import { google } from '@ai-sdk/google';
import { tools } from './tools'; 

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();
  console.log("Messages are ",messages)
  //TODO TASK 1
  const context=`
  we have two main entry gates for CEG 
  1) kotturpuram entry
  2) main gate entry

  Timings of the college 
  8:30am-4:30pm

  `
  const systemPrompt = `You are a security person for CEG guindy , 
  you stop people and ask them why they are here , and also help them with details
  always be crisp, only 2 sentences at max
  following is the context:
  ${context}
  `;

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),

    //TODO TASK 2 - Tool Calling
    // tools,            // Uncomment to enable tool calling
    // maxSteps: 5,      // Allow multi-step tool use (model calls tool → gets result → responds)
  });

  return result.toUIMessageStreamResponse();
}

