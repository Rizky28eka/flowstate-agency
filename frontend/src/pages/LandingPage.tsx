import { Link } from 'react-router-dom';
import { ArrowRight, Layout, Smartphone, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-indigo-500/30">

            {/* Navbar */}
            <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
                                A
                            </div>
                            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                AgencyFlow
                            </span>
                        </div>
                        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                            <a href="#features" className="hover:text-white transition-colors">Features</a>
                            <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
                            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                to="/login"
                                className="hidden md:flex px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
                            >
                                Log In
                            </Link>
                            <Link
                                to="/login"
                                className="px-5 py-2 text-sm font-medium bg-white text-slate-900 rounded-full hover:bg-slate-200 transition-colors shadow-lg shadow-white/5"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        v1.0 is now live
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
                            Manage Your Agency
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-violet-400">
                            In Flow State
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Stop juggling 7 different tools. AgencyFlow unifies project management, client portals, and invoicing into one seamless operating system.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            to="/login"
                            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 group"
                        >
                            Start for Free
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-semibold transition-all backdrop-blur-sm">
                            View Demo
                        </button>
                    </motion.div>

                    {/* Hero Image / Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-20 relative"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-2xl blur opacity-20" />
                        <div className="relative rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl overflow-hidden shadow-2xl">
                            {/* Abstract representation of dashboard */}
                            <div className="grid grid-cols-[200px_1fr] h-[400px] md:h-[600px]">
                                <div className="border-r border-white/5 bg-slate-900/50 p-6 hidden md:block text-left">
                                    <div className="space-y-4">
                                        <div className="h-2 w-20 bg-white/10 rounded"></div>
                                        <div className="h-8 bg-indigo-500/20 border border-indigo-500/20 rounded-lg"></div>
                                        <div className="h-4 w-full bg-white/5 rounded"></div>
                                        <div className="h-4 w-3/4 bg-white/5 rounded"></div>
                                    </div>
                                </div>
                                <div className="p-6 md:p-8 text-left">
                                    <div className="flex justify-between mb-8">
                                        <div className="h-8 w-48 bg-white/10 rounded-lg"></div>
                                        <div className="flex gap-2">
                                            <div className="h-8 w-8 rounded-full bg-white/10"></div>
                                            <div className="h-8 w-8 rounded-full bg-white/10"></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6 mb-8">
                                        <div className="h-32 rounded-xl bg-white/5 border border-white/5"></div>
                                        <div className="h-32 rounded-xl bg-white/5 border border-white/5"></div>
                                        <div className="h-32 rounded-xl bg-white/5 border border-white/5"></div>
                                    </div>
                                    <div className="h-64 rounded-xl bg-white/5 border border-white/5"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-slate-950/50 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything an Agency Needs</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Built by agency owners for agency owners. We removed the fluff and kept the power.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Layout className="w-6 h-6 text-indigo-400" />,
                                title: "Project Management",
                                desc: "Kanban boards, Gantt charts, and task lists that actually help you ship faster."
                            },
                            {
                                icon: <Smartphone className="w-6 h-6 text-violet-400" />,
                                title: "Client Portal",
                                desc: "Give clients a professional login to view progress, approve assets, and pay invoices."
                            },
                            {
                                icon: <Zap className="w-6 h-6 text-blue-400" />,
                                title: "Smart Automation",
                                desc: "Turn accepted quotations into active projects with a single click. Save 5+ hours/week."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-600/10"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to streamline your agency?</h2>
                    <p className="text-xl text-slate-400 mb-10">Join 500+ forward-thinking agencies using AgencyFlow.</p>
                    <button className="px-10 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-200 transition-colors shadow-2xl shadow-white/10">
                        Get Started Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/10 bg-slate-900 pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div className="col-span-2 md:col-span-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-xs font-bold">A</div>
                                <span className="font-bold text-lg">AgencyFlow</span>
                            </div>
                            <p className="text-slate-500 text-sm">Use flow state to manage your chaotic agency life.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-white">Features</a></li>
                                <li><a href="#" className="hover:text-white">Pricing</a></li>
                                <li><a href="#" className="hover:text-white">Changelog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-white">About</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-slate-400">
                                <li><a href="#" className="hover:text-white">Privacy</a></li>
                                <li><a href="#" className="hover:text-white">Terms</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/5 pt-8 text-center text-sm text-slate-600">
                        © 2026 AgencyFlow Inc. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
