export default function CTA() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-8 lg:px-8">
        <div className="relative isolate overflow-hidden bg-black px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
            {/* TODO: remplacer par l'appel à l'action principal */}
            Prenez le contrôle de votre parcours dès aujourd'hui !
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg/8 text-pretty text-gray-300">
            {/* TODO: description de la valeur ajoutée */}
            Explorez nos ressources et atteignez vos objectifs grâce à un assistant intelligent.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/chat"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Commencer gratuitement
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
