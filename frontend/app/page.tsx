'use client';
import { useState } from "react";

interface Message {
  sender: String,
  message: String
};

export default function Home() {
  const [prompt, setPrompt] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessages((prev) => [...prev, { sender: 'user', message: prompt }]);
    setPrompt('');
    try {
      console.log(JSON.stringify({ prompt: prompt }));
      const response = await fetch('/api/llm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
      });
      const data = await response.json();
      const message = data.message;
      console.log('LLM message:', message);
      setMessages((prev) => [...prev, { sender: 'assistant', message }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { sender: 'assistant', message: 'Error fetching response' }]);
    }
    setLoading(false);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={handleChange}
          rows={4}
          cols={200}
          placeholder="Enter your prompt here"
          className="border rounded p-2"
        />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 rounded">
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      <div className="mt-4">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))} 
      </div>
    </div>
  );
}
