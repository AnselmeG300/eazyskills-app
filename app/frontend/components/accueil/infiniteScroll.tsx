"use client";

import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Link from "next/link";

// TODO: remplacer par les suggestions pertinentes pour votre domaine
const suggestions = [
  { prompt: "Quelle est votre première question ?" },
  { prompt: "Comment puis-je commencer ?" },
  { prompt: "Quelles ressources me recommandez-vous ?" },
  { prompt: "Aidez-moi à créer un plan d'apprentissage ↗" },
  { prompt: "Quelles sont les bonnes pratiques ? ↗" },
  { prompt: "Par où commencer pour un débutant ? ↗" },
  { prompt: "Quels sont les prérequis ? ↗" },
  { prompt: "Comment progresser rapidement ? ↗" },
];

function SuggestionCard({ prompt }: { prompt: string }) {
  return (
    <Link
      href={`/chat?prompt=${encodeURIComponent(prompt.replace(" ↗", ""))}`}
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl border px-4 py-2",
        "border-gray-200 bg-white hover:bg-gray-50 transition-colors",
        "text-sm text-gray-700"
      )}
    >
      {prompt}
    </Link>
  );
}

export function InfiniteScroll() {
  const firstRow = suggestions.slice(0, Math.ceil(suggestions.length / 2));
  const secondRow = suggestions.slice(Math.ceil(suggestions.length / 2));

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8 bg-white gap-4">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((s, i) => (
          <SuggestionCard key={i} prompt={s.prompt} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s]">
        {secondRow.map((s, i) => (
          <SuggestionCard key={i} prompt={s.prompt} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white" />
    </div>
  );
}
