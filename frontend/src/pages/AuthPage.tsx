import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Lock, Mail, User, AlertCircle } from 'lucide-react';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const { login, register, isLoading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                if (!name.trim()) {
                    setError('Name is required');
                    return;
                }
                await register(email, password, name);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        }
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-slate-50">

            {/* Left Side - Visual */}
            <div className="hidden md:flex relative bg-slate-900 text-white flex-col justify-between p-12 overflow-hidden">
                <div className="absolute inset-0 bg-indigo-600/20 z-0"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/30 rounded-full blur-[120px] -z-10" />

                <div className="relative z-10">
                    <Link to="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-8 w-fit">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">A</div>
                        <span className="text-xl font-bold">AgencyFlow</span>
                    </div>
                </div>

                <div className="relative z-10 space-y-6">
                    <blockquote className="text-2xl font-medium leading-relaxed">
                        "AgencyFlow has completely transformed how we manage our projects. The client portal alone has saved us countless hours of email back-and-forth."
                    </blockquote>
                    <div>
                        <p className="font-semibold">Sarah Jenkins</p>
                        <p className="text-slate-400">CEO, Creative Pulse</p>
                    </div>
                </div>

                <div className="relative z-10 text-sm text-slate-500">
                    © 2026 AgencyFlow Inc.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-slate-900">
                            {isLogin ? 'Welcome back' : 'Create an account'}
                        </h2>
                        <p className="mt-2 text-slate-600">
                            {isLogin ? 'Enter your details to access your dashboard' : 'Start your 14-day free trial today'}
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    placeholder="••••••••"
                                    minLength={6}
                                />
                            </div>
                            {!isLogin && (
                                <p className="text-xs text-slate-500">Must be at least 6 characters</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-lg shadow-indigo-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                isLogin ? 'Sign In' : 'Create Account'
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-600">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                            }}
                            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
                        >
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </p>

                    {isLogin && (
                        <div className="text-center">
                            <p className="text-sm text-slate-600 mb-2">Demo Credentials:</p>
                            <div className="text-xs text-slate-500 space-y-1">
                                <p>Email: <code className="bg-slate-100 px-2 py-0.5 rounded">admin@agencyflow.com</code></p>
                                <p>Password: <code className="bg-slate-100 px-2 py-0.5 rounded">admin123</code></p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
