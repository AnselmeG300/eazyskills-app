import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

// TODO: remplacer par les liens de navigation réels
const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Chat", href: "/chat" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <Popover className="relative bg-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-30 shadow-sm"
      />
      <div className="relative z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:py-4 md:justify-start md:space-x-10 lg:px-8">
          {/* Logo */}
          <div>
            <a href="/" className="text-xl font-bold text-gray-900">
              {/* TODO: remplacer par le logo / nom de l'app */}
              MyApp
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="-my-2 -mr-2 md:hidden">
            <PopoverButton className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Ouvrir le menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </PopoverButton>
          </div>

          {/* Desktop navigation */}
          <PopoverGroup as="nav" className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                {link.label}
              </a>
            ))}
          </PopoverGroup>
        </div>
      </div>

      {/* Mobile menu panel */}
      <PopoverPanel
        focus
        className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition md:hidden"
      >
        <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black/5">
          <div className="px-5 pb-6 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">MyApp</span>
              <div className="-mr-2">
                <PopoverButton className="relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Fermer le menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </PopoverButton>
              </div>
            </div>
            <div className="mt-6">
              <nav className="grid gap-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
}
