import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    console.log("ABC")
    // return NextResponse.json({ message: 'Hello from the server!' });
    const payload = await request.json();
    console.log('Received payload:', payload);
    try{
        const llmResponse = await fetch('http://127.0.0.1:8000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( payload )
        });
        const data = await llmResponse.json();
        console.log('LLM response:', data);
        const message = data.message;
        return NextResponse.json({ message: message });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
};