"use client";

import React, { useState, FormEvent, useRef, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { sendChatMessage } from "@/app/api/chat/sendChatMessage";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";

/** Structure d'un message dans la conversation */
interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

/** Effet "typing" pour les réponses de l'assistant */
function AssistantMessage({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = React.useState("");

  React.useEffect(() => {
    setDisplayedText("");
    let index = 0;
    const speed = 15;

    const intervalId = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <div className="prose prose-sm leading-relaxed text-justify whitespace-normal">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside my-2" {...props} />
          ),
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          h2: ({ node, ...props }) => (
            <h2 className="mt-4 mb-2 text-lg font-bold" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="mt-3 mb-2 text-base font-semibold" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a
              style={{ textDecoration: "underline", color: "#1f6feb" }}
              {...props}
              target="_blank"
            />
          ),
        }}
      >
        {displayedText}
      </ReactMarkdown>
    </div>
  );
}

function ChatComponent() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const prompt = inputValue.trim();
    if (!prompt || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", text: prompt }]);
    setInputValue("");
    setIsLoading(true);

    try {
      const data = await sendChatMessage(prompt);
      const reply = data.response || data.message || "Pas de réponse.";
      setMessages((prev) => [...prev, { role: "assistant", text: reply }]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: `Erreur : ${error.message}` },
      ]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-3xl mx-auto px-4 py-8 gap-4">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <MessageSquare className="w-6 h-6" />
        Assistant
      </h1>

      <Card className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.length === 0 && (
          <p className="text-muted-foreground text-center mt-8">
            Posez votre première question…
          </p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-[80%] ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground"
              }`}
            >
              {msg.role === "assistant" ? (
                <AssistantMessage text={msg.text} />
              ) : (
                <p>{msg.text}</p>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-2 text-muted-foreground animate-pulse">
              En cours de traitement…
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Votre message…"
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !inputValue.trim()}>
          Envoyer
        </Button>
      </form>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Chargement…</div>}>
      <ChatComponent />
    </Suspense>
  );
}
