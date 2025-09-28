import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes AgencyFlow different from other project management tools?",
    answer: "AgencyFlow is specifically designed for creative agencies. Unlike generic project management tools, we understand the unique workflows, client relationships, and financial needs of creative businesses. Our platform combines project management, client collaboration, team communication, and financial tracking in one seamless experience."
  },
  {
    question: "Can I migrate my existing projects and data?",
    answer: "Yes! We provide comprehensive migration support including data import tools and dedicated onboarding assistance. Our team will help you transfer your existing projects, client information, and team data from most popular platforms including Asana, Monday.com, Trello, and others."
  },
  {
    question: "How does the client portal work?",
    answer: "The client portal gives your clients secure access to their projects without needing full platform access. They can view project progress, download files, leave feedback, approve deliverables, and communicate with your team. It's fully branded with your agency's look and feel."
  },
  {
    question: "Is there a limit on team members or projects?",
    answer: "Our plans scale with your agency. Starter plans include up to 10 team members and unlimited projects. Professional and Enterprise plans offer unlimited team members and advanced features like white-labeling and API access. Check our pricing page for detailed information."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We offer multiple support channels including live chat, email support, comprehensive documentation, video tutorials, and webinar training sessions. Enterprise customers also get dedicated account managers and priority support with guaranteed response times."
  },
  {
    question: "Can I customize the platform for my agency's workflow?",
    answer: "Absolutely! AgencyFlow is highly customizable. You can create custom project templates, workflows, client onboarding processes, and even customize the interface with your branding. Our Professional and Enterprise plans offer additional customization options including custom fields and integrations."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-section-title text-primary mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Got questions? We've got answers. If you can't find what you're looking for, reach out to our team.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-xl border-0 shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-primary hover:text-accent-hover transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <button className="btn-accent">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;