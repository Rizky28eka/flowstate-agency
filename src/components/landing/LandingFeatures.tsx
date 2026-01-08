
import { motion } from "framer-motion";
import { LayoutDashboard, Users, CreditCard, BarChart3, Clock, Share2 } from "lucide-react";

const features = [
    {
        icon: <LayoutDashboard className="w-6 h-6" />,
        title: "Project Management",
        description: "Keep track of all your projects with kanban boards, lists, and timelines. Never miss a deadline again."
    },
    {
        icon: <Users className="w-6 h-6" />,
        title: "Client Portal",
        description: "Give your clients a professional space to view progress, approve assets, and communicate."
    },
    {
        icon: <CreditCard className="w-6 h-6" />,
        title: "Invoicing & Payments",
        description: "Create beautiful invoices and get paid faster with integrated payment gateways and automated reminders."
    },
    {
        icon: <BarChart3 className="w-6 h-6" />,
        title: "Advanced Analytics",
        description: "Understand your agency's health with detailed reports on revenue, team performance, and profitability."
    },
    {
        icon: <Clock className="w-6 h-6" />,
        title: "Time Tracking",
        description: "Effortlessly track time spent on tasks and projects to ensure accurate billing and resource allocation."
    },
    {
        icon: <Share2 className="w-6 h-6" />,
        title: "Collaboration",
        description: "Seamlessly collaborate with your team and clients with real-time comments, mentions, and file sharing."
    }
];

const LandingFeatures = () => {
    return (
        <section id="features" className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to run your agency</h2>
                    <p className="text-muted-foreground text-lg">
                        Stop juggling multiple tools. FlowState brings your entire workflow into one cohesive operating system.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-background border hover:border-primary/50 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LandingFeatures;
