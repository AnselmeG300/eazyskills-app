import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { PlusSmallIcon, MinusSmallIcon } from "@heroicons/react/24/outline";

// TODO: remplacer par les vraies questions/réponses de l'application
const faqs = [
  {
    question: "Comment fonctionne l'assistant ?",
    answer:
      "L'assistant analyse votre question et vous propose des réponses contextualisées basées sur un corpus de ressources.",
  },
  {
    question: "Est-ce gratuit ?",
    answer: "Oui, l'accès de base est entièrement gratuit.",
  },
  {
    question: "Quels types de ressources sont recommandés ?",
    answer:
      "Des cours, articles et guides adaptés à votre niveau et vos objectifs.",
  },
  {
    question: "Puis-je l'utiliser si je suis débutant ?",
    answer:
      "Absolument ! L'assistant s'adapte à tous les niveaux.",
  },
];

export function FAQ() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Questions fréquentes
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure key={faq.question} as="div" className="pt-6">
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base font-semibold">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon
                        aria-hidden="true"
                        className="size-6 group-data-open:hidden"
                      />
                      <MinusSmallIcon
                        aria-hidden="true"
                        className="size-6 group-not-data-open:hidden"
                      />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base text-gray-600">{faq.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
