import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Creative Director",
    company: "Pixel Perfect Agency",
    avatar: "SC",
    rating: 5,
    text: "AgencyFlow transformed how we manage projects. Our team productivity increased by 40% and client satisfaction is at an all-time high."
  },
  {
    name: "Marcus Rodriguez",
    role: "Agency Owner", 
    company: "Brand Lab Studios",
    avatar: "MR",
    rating: 5,
    text: "The client portal feature alone saved us countless hours. Clients love the transparency and we love the reduced back-and-forth communication."
  },
  {
    name: "Emily Johnson",
    role: "Project Manager",
    company: "Creative House",
    avatar: "EJ", 
    rating: 5,
    text: "Finally, a platform that understands creative workflows. The intuitive interface made onboarding our team seamless."
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-12 sm:py-16 lg:py-20 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6">
            Loved by Creative Teams
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Join thousands of agencies who've already transformed their workflow with AgencyFlow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg card-hover animate-fade-in-up transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Rating */}
              <div className="flex space-x-1 mb-4 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-3 sm:space-x-4 pt-4 border-t border-border">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-xs sm:text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="font-semibold text-primary text-sm sm:text-base">{testimonial.name}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs sm:text-sm text-accent">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;