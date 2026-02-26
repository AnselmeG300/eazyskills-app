// TODO: remplacer par les vraies images et descriptions de fonctionnalités
const features = [
  {
    id: 1,
    title: "Un assistant sur mesure",
    description: "Réponses adaptées à votre niveau et vos objectifs.",
  },
  {
    id: 2,
    title: "Des ressources de qualité",
    description: "Accès à des cours, bootcamps et certifications pertinents.",
  },
  {
    id: 3,
    title: "Réponses instantanées",
    description: "Obtenez des recommandations précises en quelques secondes.",
  },
];

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {/* TODO: titre de la section */}
            Nos fonctionnalités clés
          </h2>
        </div>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.id} className="rounded-2xl border p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
