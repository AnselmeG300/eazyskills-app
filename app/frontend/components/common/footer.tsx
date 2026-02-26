export default function Footer() {
  return (
    <footer className="bg-black mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12">
        <p className="text-center text-sm text-white">
          {/* TODO: remplacer par les informations de copyright réelles */}
          &copy; {new Date().getFullYear()} MyApp. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
