import { useState, useEffect } from 'react'
import { Plus, Search, FileText, Send, CheckCircle, XCircle, Rocket, Loader2, ArrowRight } from 'lucide-react'
import { quotationsAPI, clientsAPI } from '../services/api'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { Modal } from '../components/shared/Modal'
import { useNavigate } from 'react-router-dom'

interface Quotation {
    id: number;
    title: string;
    description: string;
    client_name: string;
    amount: number;
    status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
    created_at: string;
}

export default function QuotationsPage() {
    const [quotations, setQuotations] = useState<Quotation[]>([]);
    const [clients, setClients] = useState<{ id: number, name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        client_id: '',
        title: '',
        description: '',
        amount: ''
    });
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const [quotRes, clientRes] = await Promise.all([
                quotationsAPI.getAll(),
                clientsAPI.getAll()
            ]);
            setQuotations(quotRes.data || []);
            setClients(clientRes.data || []);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateQuotation = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await quotationsAPI.create({
                ...formData,
                client_id: parseInt(formData.client_id),
                amount: parseFloat(formData.amount)
            });
            setIsModalOpen(false);
            setFormData({ client_id: '', title: '', description: '', amount: '' });
            fetchData();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to create quotation');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleConvertToProject = async (id: number) => {
        try {
            const res = await quotationsAPI.convertToProject(id);
            alert('Quotation converted to project successfully!');
            navigate(`/projects/${res.data.project.id}`);
        } catch (error) {
            console.error('Failed to convert:', error);
            alert('Failed to convert quotation.');
        }
    };

    const handleUpdateStatus = async (id: number, status: string) => {
        try {
            await quotationsAPI.updateStatus(id, status);
            fetchData();
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const filteredQuotations = quotations.filter(q =>
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.client_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="flex justify-between items-end mb-8 text-left">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Quotations</h1>
                    <p className="text-slate-500 mt-1">Create and manage professional proposals for your clients.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Proposal
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex gap-4 text-left">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search proposals by title or client..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                </div>
            </div>

            {/* Quotations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                {loading ? (
                    Array(3).fill(0).map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 animate-pulse h-64"></div>
                    ))
                ) : filteredQuotations.length > 0 ? (
                    filteredQuotations.map((q) => (
                        <div key={q.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${q.status === 'Accepted' ? 'bg-green-50 text-green-700 border border-green-100' :
                                        q.status === 'Rejected' ? 'bg-red-50 text-red-700 border border-red-100' :
                                            q.status === 'Sent' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                'bg-slate-50 text-slate-500 border border-slate-100'
                                    }`}>
                                    {q.status}
                                </span>
                                <span className="text-lg font-bold text-slate-900">${q.amount.toLocaleString()}</span>
                            </div>

                            <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{q.title}</h3>
                            <p className="text-xs text-slate-500 mb-4 font-medium">Client: {q.client_name}</p>

                            <p className="text-sm text-slate-600 line-clamp-2 mb-6">
                                {q.description || 'No description provided for this proposal.'}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <div className="flex gap-2">
                                    {q.status === 'Draft' && (
                                        <button
                                            onClick={() => handleUpdateStatus(q.id, 'Sent')}
                                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                            title="Send to Client"
                                        >
                                            <Send size={18} />
                                        </button>
                                    )}
                                    {q.status === 'Sent' && (
                                        <>
                                            <button
                                                onClick={() => handleUpdateStatus(q.id, 'Accepted')}
                                                className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                                                title="Approve"
                                            >
                                                <CheckCircle size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(q.id, 'Rejected')}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                title="Reject"
                                            >
                                                <XCircle size={18} />
                                            </button>
                                        </>
                                    )}
                                    {q.status === 'Accepted' && (
                                        <button
                                            onClick={() => handleConvertToProject(q.id)}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-sm shadow-indigo-200"
                                        >
                                            <Rocket size={14} />
                                            Launch Project
                                        </button>
                                    )}
                                </div>
                                <button className="text-slate-300 group-hover:text-slate-900 transition-colors">
                                    <ArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center">
                        <FileText className="w-12 h-12 text-slate-300 mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No Proposals Yet</h3>
                        <p className="text-slate-500 max-w-xs mb-6">Create professional quotations to win more projects.</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-6 py-2 bg-white border border-slate-200 rounded-xl font-bold text-indigo-600 hover:bg-indigo-50 transition-all shadow-sm"
                        >
                            Start First Proposal
                        </button>
                    </div>
                )}
            </div>

            {/* Create Quotation Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Proposal"
            >
                <form onSubmit={handleCreateQuotation} className="space-y-4 text-left">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                            {error}
                        </div>
                    )}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Proposal Title</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            placeholder="e.g. Website Development for Fintech"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Client</label>
                        <select
                            required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white"
                            value={formData.client_id}
                            onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                        >
                            <option value="">Select a client...</option>
                            {clients.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Description</label>
                        <textarea
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all min-h-[100px]"
                            placeholder="Detail service scope and deliverables..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Proposed Amount ($)</label>
                        <input
                            required
                            type="number"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            placeholder="0.00"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        />
                    </div>
                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : 'Create Proposal'}
                        </button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
}
