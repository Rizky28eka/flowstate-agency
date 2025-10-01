import { UserPlus, Settings, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Sign Up & Setup",
    description: "Create your account and invite your team. Customize your workspace in minutes."
  },
  {
    icon: Settings,
    number: "02", 
    title: "Configure Workflows",
    description: "Set up your project templates, client onboarding process, and team permissions."
  },
  {
    icon: Rocket,
    number: "03",
    title: "Launch & Scale",
    description: "Start managing projects efficiently and watch your agency productivity soar."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Transform your agency workflow in less than 15 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index}
                className="text-center animate-fade-in-up relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Step Number */}
                <div className="relative mb-6 sm:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-accent via-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <div className="absolute -top-1 sm:-top-2 -right-8 sm:right-1/4 w-7 h-7 sm:w-8 sm:h-8 bg-accent rounded-full flex items-center justify-center shadow-md z-20">
                    <span className="text-white text-xs sm:text-sm font-bold">{step.number}</span>
                  </div>
                  
                  {/* Connecting line (except for last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 sm:top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent via-primary/40 to-transparent"></div>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 sm:mb-4">{step.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed px-2">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;