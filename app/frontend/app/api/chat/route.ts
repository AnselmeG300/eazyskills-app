import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy vers l'API backend (AWS API Gateway / Lambda).
 * La clé API et l'URL sont gérées via des variables d'environnement.
 * TODO: remplacer NEXT_PUBLIC_BACKEND_CHAT_URL par l'URL réelle en production.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendUrl = process.env.BACKEND_CHAT_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: "BACKEND_CHAT_URL is not configured" },
      { status: 500 }
    );
  }

  const res = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.API_KEY ?? "",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
