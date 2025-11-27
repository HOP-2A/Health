"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SetStateAction, useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setPrompt(e.target.value);
  };
  const Aigetting = async () => {
    const response = await fetch("/api/ai-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    setResponse(data);
  };
  return (
    <div className="max-w-xl mx-auto mt-16 space-y-6">
      {/* Header */}
      <h1 className="text-center text-4xl font-extrabold tracking-tight text-indigo-600">
        Health AI Chat
      </h1>
      <p className="text-center text-sm text-muted-foreground">
        Ask your health-related questions and get AI responses instantly.
      </p>

      {/* Input Card */}
      <Card className="rounded-xl shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Your Question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            value={prompt}
            onChange={handleChange}
            placeholder="Type your question here..."
            className="h-12 rounded-lg"
          />
          <Button
            onClick={Aigetting}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Ask AI
          </Button>
        </CardContent>
      </Card>

      {/* Response Card */}
      <Card className="rounded-xl shadow-lg border border-gray-200 bg-gray-50">
        <CardHeader className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            AI
          </div>
          <CardTitle className="text-lg font-semibold">AI Response</CardTitle>
        </CardHeader>
        <CardContent className="p-4 text-gray-800 text-sm min-h-[120px] whitespace-pre-wrap">
          {response || "Your AI response will appear here."}
        </CardContent>
      </Card>
    </div>
  );
}
