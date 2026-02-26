import { PulsatingButton } from "../ui/pulsating-button";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gray-50">
      <div className="relative pt-6 pb-16">
        <div className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              {/* TODO: remplacer par le titre de l'application */}
              <span>Votre plateforme intelligente</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base tracking-tight text-gray-500 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              {/* TODO: remplacer par la description de la valeur ajoutée */}
              Découvrez les fonctionnalités de notre assistant IA.
            </p>
            <div className="mx-auto mt-5 max-w-md sm:flex sm:justify-center md:mt-8">
              <div className="flex items-center justify-center">
                <PulsatingButton>
                  <a href="/chat">Commencer</a>
                </PulsatingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
