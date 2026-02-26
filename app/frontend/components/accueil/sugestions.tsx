import { DemoChatbot } from "./demoChatBot";

// TODO: remplacer par les suggestions pertinentes pour votre domaine
const EXAMPLE_PROMPTS = [
  "Première suggestion d'exemple.",
  "Deuxième suggestion d'exemple.",
  "Troisième suggestion d'exemple.",
];

export default function Sugestions() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="container mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <DemoChatbot />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              {/* TODO: titre de la section */}
              Des suggestions adaptées à vos objectifs
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {/* TODO: description de la section */}
              Partagez vos objectifs et recevez un plan d'action personnalisé.
            </p>

            <div className="mt-8 space-y-3">
              {EXAMPLE_PROMPTS.map((prompt, i) => (
                <a
                  key={i}
                  href={`/chat?prompt=${encodeURIComponent(prompt)}`}
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <span>→</span>
                  <span>{prompt}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
