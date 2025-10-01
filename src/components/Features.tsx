import { FolderKanban, Users, DollarSign, MessageSquare, ChartBar as BarChart3, Shield } from "lucide-react";

const features = [
  {
    icon: FolderKanban,
    title: "Project Management",
    description: "Organize projects with Kanban boards, Gantt charts, and automated workflows. Track progress and deadlines effortlessly.",
    side: "left"
  },
  {
    icon: Users,
    title: "Client Portal",
    description: "Give clients real-time access to project updates, files, and communication. Strengthen relationships with transparency.",
    side: "right"
  },
  {
    icon: DollarSign,
    title: "Finance Hub",
    description: "Track expenses, generate invoices, and monitor profitability. Complete financial control for your agency.",
    side: "left"
  },
  {
    icon: MessageSquare,
    title: "Team Collaboration",
    description: "Built-in messaging, file sharing, and real-time updates. Keep your team aligned and productive.",
    side: "right"
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Comprehensive insights into project performance, team productivity, and business metrics.",
    side: "left"
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security with role-based access control and data encryption.",
    side: "right"
  }
];

const Features = () => {
  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6">
            Everything Your Agency Needs
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            From project inception to client delivery, AgencyFlow provides all the tools 
            you need to run a successful creative agency.
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16 lg:space-y-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center animate-fade-in-up ${
                  feature.side === "right" ? "lg:grid-flow-col-dense" : ""
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={feature.side === "right" ? "lg:col-start-2" : ""}>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-accent" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-primary mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                    {feature.description}
                  </p>
                  <button className="text-accent font-medium hover:text-accent-hover transition-colors text-sm sm:text-base">
                    Learn more →
                  </button>
                </div>
                
                <div className={`${feature.side === "right" ? "lg:col-start-1" : ""} mt-6 lg:mt-0`}>
                  <div className="relative bg-gradient-to-br from-secondary/50 via-accent/5 to-primary/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 h-60 sm:h-80 flex items-center justify-center border border-border/50 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative text-center">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full"></div>
                        <IconComponent className="relative w-16 h-16 sm:w-24 sm:h-24 text-accent/60 mx-auto mb-3 sm:mb-4" />
                      </div>
                      <p className="text-muted-foreground font-medium">Interactive Demo</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;