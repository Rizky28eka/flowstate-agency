import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky Navbar biar selalu kelihatan */}
      <Navbar />

      {/* Hero biasanya full width */}
      <section className="px-4 sm:px-6 lg:px-8">
        <Hero />
      </section>

      {/* Section dengan container biar konten lebih rapih */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto">
          <SocialProof />
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto">
          <Features />
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto">
          <Testimonials />
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto">
          <HowItWorks />
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto">
          <FAQ />
        </div>
      </section>

      {/* Final CTA biasanya full width */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <FinalCTA />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;