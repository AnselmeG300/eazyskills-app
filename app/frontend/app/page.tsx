import Hero from "@/components/accueil/hero";
import Features from "@/components/accueil/features";
import CTA from "@/components/accueil/cta";
import FAQS from "@/components/accueil/faqs";
import Footer from "@/components/common/footer";
import { InfiniteScroll } from "@/components/accueil/infiniteScroll";
import Sugestions from "@/components/accueil/sugestions";

export default function Home() {
  return (
    <div className="overflow-y-scroll h-screen scrollbar-hide">
      <main>
        <section>
          <Hero />
          <InfiniteScroll />
          <Features />
          <Sugestions />
          <CTA />
        </section>

        <section id="faqs">
          <FAQS />
        </section>

        <section>
          <Footer />
        </section>
      </main>
    </div>
  );
}
