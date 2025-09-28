const companies = [
  "Acme Studios", "Pixel Perfect", "Creative Co", "Design House", "Brand Lab", "Visual Studio"
];

const SocialProof = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-muted-foreground text-lg">Trusted by leading creative agencies worldwide</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company, index) => (
            <div 
              key={company}
              className="logo-hover text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white rounded-lg p-6 shadow-sm h-16 flex items-center justify-center">
                <span className="font-semibold text-muted-foreground text-sm">{company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;