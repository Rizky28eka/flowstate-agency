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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-section-title text-primary mb-6">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Transform your agency workflow in less than 15 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Step Number */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{step.number}</span>
                  </div>
                  
                  {/* Connecting line (except for last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-accent to-primary/20 -translate-y-1/2"></div>
                  )}
                </div>

                <h3 className="text-feature-title text-primary mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
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