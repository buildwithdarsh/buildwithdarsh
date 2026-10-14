import { packages, site } from "@/lib/content";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Symptoms, Why } from "@/components/sections/problem";
import { BeforeAfter, HowItWorks, Packages } from "@/components/sections/offer";
import { About, Work } from "@/components/sections/about";
import { Checklist, Faq, FinalCta, Footer } from "@/components/sections/closing";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${site.name} — Production hardening for AI-built apps`,
  url: site.url,
  email: site.email,
  description: site.description,
  founder: {
    "@type": "Person",
    name: site.name,
    jobTitle: "Full-stack engineer · platform architect",
    address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
    sameAs: [site.portfolio, site.social.github, site.social.linkedin],
  },
  areaServed: "Worldwide",
  makesOffer: packages.items.map((pkg) => ({
    "@type": "Offer",
    name: pkg.name,
    description: pkg.features.join("; "),
  })),
};

export default function Home() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Symptoms />
        <Why />
        <BeforeAfter />
        <Packages />
        <HowItWorks />
        <About />
        <Work />
        <Checklist />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
