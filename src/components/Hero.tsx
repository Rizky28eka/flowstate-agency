import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import dashboardMockup from "@/assets/dashboard-mockup.jpg";

const Hero = () => {
  return (
    <section className="relative pt-20 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-accent/10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
              Trusted by 500+ Creative Agencies
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary mb-4 sm:mb-6">
              Streamline Your
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Creative Agency</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Manage projects, clients, teams, and finances in one powerful platform. 
              AgencyFlow helps creative agencies work smarter, not harder.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Button className="btn-hero group w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="btn-hero-outline group w-full sm:w-auto">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
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
          <div className="relative animate-fade-in mt-8 lg:mt-0">
            <div className="relative">
              <img 
                src={dashboardMockup} 
                alt="AgencyFlow Dashboard" 
                className="w-full h-auto rounded-xl sm:rounded-2xl shadow-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl sm:rounded-2xl"></div>
            </div>
            
            {/* Floating cards for extra visual appeal */}
            <div className="hidden sm:block absolute -top-4 sm:-top-6 -right-4 sm:-right-6 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-success/20 rounded-lg flex items-center justify-center">
                  <span className="text-success text-xs sm:text-sm">✓</span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium">Project Completed</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
            </div>
            
            <div className="hidden sm:block absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <span className="text-accent text-xs sm:text-sm">$</span>
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium">+$12,500</p>
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