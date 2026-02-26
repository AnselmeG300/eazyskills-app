"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

// TODO: remplacer par les suggestions pertinentes pour votre domaine
const DEMO_SUGGESTIONS = [
  "Quelle ressource me recommandez-vous ?",
  "Comment puis-je commencer ?",
  "Aidez-moi à progresser.",
];

export function DemoChatbot() {
  const [input, setInput] = useState("");

  return (
    <Card className="w-full max-w-md p-4 space-y-4 shadow-lg">
      <div className="flex items-center gap-2 font-semibold text-gray-800">
        <MessageSquare className="w-5 h-5" />
        <span>Aperçu du chatbot</span>
      </div>

      <div className="space-y-2">
        {DEMO_SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => setInput(s)}
            className="w-full text-left text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Essayez une suggestion…"
          className="flex-1"
        />
        <Button asChild>
          <a href={`/chat?prompt=${encodeURIComponent(input)}`}>
            Essayer
          </a>
        </Button>
      </div>
    </Card>
  );
}
