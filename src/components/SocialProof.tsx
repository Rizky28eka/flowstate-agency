const companies = [
  "Acme Studios", "Pixel Perfect", "Creative Co", "Design House", "Brand Lab", "Visual Studio"
];

const SocialProof = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <p className="text-base sm:text-lg text-muted-foreground font-medium">Trusted by leading creative agencies worldwide</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
          {companies.map((company, index) => (
            <div 
              key={company}
              className="logo-hover group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 h-16 sm:h-20 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-accent/50 hover:scale-105">
                <span className="font-semibold text-muted-foreground group-hover:text-primary text-xs sm:text-sm transition-colors">{company}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <p className="text-sm text-muted-foreground">
            Join <span className="font-semibold text-accent">500+</span> agencies managing over <span className="font-semibold text-accent">10,000</span> projects
          </p>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;