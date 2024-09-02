import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const KEY: any = process.env.OPENAI_API_KEY;

export async function POST(request: Request) {
    const _content = await request.json();
    // console.log(`클라에서 넘어온것: ${_content.data}`);

    const openai = new OpenAI({
        apiKey: KEY,
    });

    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                "role": "user",
                "content": _content.data // Error Code and Prompt Modules from client that student sends
            }
        ],
        // Parameters for the enhanced version of the prompt
        temperature: 0.2, // previous value is '1'
        max_tokens: 320, // previous value is '480'
        top_p: 0.8, // previous value is '1'
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    return NextResponse.json({
        response
    });
}

