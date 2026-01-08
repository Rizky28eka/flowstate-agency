
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const LandingHero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-primary/5 to-transparent -z-10" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    v2.0 is now live
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                >
                    Manage Your Agency <br className="hidden md:block" />
                    <span className="text-primary">With FlowState</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
                >
                    The all-in-one platform for creative agencies. Streamline projects, track finances, and collaborate with your team in one beautiful interface.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to="/register">
                        <Button size="lg" className="h-12 px-8 text-lg gap-2 shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300">
                            Start Free Trial <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Link to="/demo">
                        <Button variant="outline" size="lg" className="h-12 px-8 text-lg gap-2 bg-background/50 backdrop-blur-sm">
                            <Zap className="w-4 h-4" /> Live Demo
                        </Button>
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-20 relative mx-auto max-w-5xl rounded-xl border bg-background/50 shadow-2xl overflow-hidden"
                >
                    <div className="absolute top-0 left-0 right-0 h-10 bg-muted/50 border-b flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>
                    {/* Mock Dashboard Image Placeholder - Since I cannot generate image right now, I'll use a div structure simulating UI */}
                    <div className="pt-10 p-4 bg-muted/10 min-h-[400px] md:min-h-[600px] flex items-center justify-center">
                        <div className="w-full h-full grid grid-cols-12 gap-4 p-4">
                            <div className="col-span-3 hidden md:block space-y-4">
                                <div className="h-8 w-3/4 bg-muted rounded animate-pulse"></div>
                                <div className="h-4 w-full bg-muted/50 rounded animate-pulse"></div>
                                <div className="h-4 w-5/6 bg-muted/50 rounded animate-pulse"></div>
                                <div className="h-4 w-4/6 bg-muted/50 rounded animate-pulse"></div>
                            </div>
                            <div className="col-span-12 md:col-span-9 space-y-6">
                                <div className="flex gap-4 mb-8">
                                    <div className="h-32 w-1/3 bg-primary/5 border border-primary/10 rounded-xl p-4"></div>
                                    <div className="h-32 w-1/3 bg-primary/5 border border-primary/10 rounded-xl p-4"></div>
                                    <div className="h-32 w-1/3 bg-primary/5 border border-primary/10 rounded-xl p-4"></div>
                                </div>
                                <div className="h-64 w-full bg-muted/20 border rounded-xl p-6"></div>
                            </div>
                        </div>
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
                </motion.div>

                <div className="mt-16 flex flex-wrap justify-center gap-x-12 gap-y-8 text-muted-foreground opacity-70">
                    {['Google', 'Spotify', 'Airbnb', 'Linear', 'Stripe'].map((brand) => (
                        <span key={brand} className="text-lg font-semibold grayscale hover:grayscale-0 transition-all duration-300 cursor-default">{brand}</span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LandingHero;
