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
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-section-title text-primary mb-6">
            Loved by Creative Teams
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of agencies who've already transformed their workflow with AgencyFlow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Rating */}
              <div className="flex space-x-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-accent">{testimonial.company}</p>
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