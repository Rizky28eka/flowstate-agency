import { FolderKanban, Users, DollarSign, MessageSquare, BarChart3, Shield } from "lucide-react";

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
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-section-title text-primary mb-6">
            Everything Your Agency Needs
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From project inception to client delivery, AgencyFlow provides all the tools 
            you need to run a successful creative agency.
          </p>
        </div>

        <div className="space-y-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center animate-fade-in-up ${
                  feature.side === "right" ? "lg:grid-flow-col-dense" : ""
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={feature.side === "right" ? "lg:col-start-2" : ""}>
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-feature-title text-primary mb-4">{feature.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <button className="text-accent font-medium hover:text-accent-hover transition-colors">
                    Learn more →
                  </button>
                </div>
                
                <div className={feature.side === "right" ? "lg:col-start-1" : ""}>
                  <div className="bg-gradient-to-br from-secondary to-muted rounded-2xl p-8 h-80 flex items-center justify-center">
                    <div className="text-center">
                      <IconComponent className="w-20 h-20 text-primary/20 mx-auto mb-4" />
                      <p className="text-muted-foreground">Feature Mockup</p>
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