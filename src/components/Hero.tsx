import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-accent/10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
              Trusted by 500+ Creative Agencies
            </div>
            
            <h1 className="text-hero text-primary mb-6">
              Streamline Your
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Creative Agency</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Manage projects, clients, teams, and finances in one powerful platform. 
              AgencyFlow helps creative agencies work smarter, not harder.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button className="btn-hero group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="btn-hero-outline group">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <span className="w-4 h-4 text-success mr-2">✓</span>
                14-day free trial
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 text-success mr-2">✓</span>
                No credit card required
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 text-success mr-2">✓</span>
                Cancel anytime
              </div>
            </div>
          </div>
          
          {/* Right Column - Dashboard Mockup */}
          <div className="relative animate-fade-in">
            <div className="relative">
              <img 
                src={dashboardMockup} 
                alt="AgencyFlow Dashboard" 
                className="w-full h-auto rounded-2xl shadow-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating cards for extra visual appeal */}
            <div className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center">
                  <span className="text-success text-sm">✓</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Project Completed</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <span className="text-accent text-sm">$</span>
                </div>
                <div>
                  <p className="text-sm font-medium">+$12,500</p>
                  <p className="text-xs text-muted-foreground">Monthly revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;