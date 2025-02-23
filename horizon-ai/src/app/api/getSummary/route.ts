// app/api/gpt4/route.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

// Initialize OpenAI API client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!, // Ensure to set your API key in the environment variable
});

export async function POST(request: Request) {
    try {
        const { prompt } = await request.json(); // Get the prompt from the incoming request body

        console.log(prompt)
        // Send the request to GPT-4 using OpenAI API
        const response = await openai.chat.completions.create({
            model: 'gpt-4', // GPT-4 model
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });

        // Return the response from OpenAI API
        return NextResponse.json({
            success: true,
            data: response.choices[0]?.message.content,
        });
    } catch (error) {
        // Handle any errors
        return NextResponse.json({
            success: false,
            error: 'Failed to communicate with OpenAI API',
        }, { status: 500 });
    }
}
