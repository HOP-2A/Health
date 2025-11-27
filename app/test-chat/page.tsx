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
    <div className="max-w-lg mx-auto mt-10 space-y-4">
      <h1 className="text-center text-3xl font-bold tracking-tight">
        Health AI
      </h1>

      <Card className="shadow-md border">
        <CardHeader>
          <CardTitle className="text-lg">Ask something</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <Input
            value={prompt}
            onChange={handleChange}
            placeholder="Type your question..."
            className="h-11"
          />

          <Button onClick={Aigetting} className="w-full">
            Go
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-md border">
        <CardHeader>
          <CardTitle className="text-lg">Response</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[100px] p-4 text-sm text-muted-foreground">
          {response ? response : "No response yet."}
        </CardContent>
      </Card>
    </div>
  );
}
