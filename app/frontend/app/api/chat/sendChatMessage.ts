interface ChatResponse {
  response?: string;
  message?: string;
}

/**
 * Envoie un message au backend via la route API interne Next.js.
 */
export async function sendChatMessage(prompt: string): Promise<ChatResponse> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (
    !data ||
    (typeof data.response !== "string" && typeof data.message !== "string")
  ) {
    throw new Error("Format de réponse invalide");
  }

  return {
    response: data.response || data.message,
    message: data.message,
  };
}
