import { useState, useEffect } from 'react'
import { Plus, Search, FileText, Download, Filter, MoreVertical, Loader2 } from 'lucide-react'
import { invoicesAPI, projectsAPI } from '../services/api'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { Modal } from '../components/shared/Modal'

interface Invoice {
    id: number;
    invoice_number: string;
    project_name: string;
    client_name: string;
    amount: number;
    status: 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
    due_date: string;
    created_at: string;
}

export default function InvoicesPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [projects, setProjects] = useState<{ id: number, name: string, client_id: number }[]>([]);
    const [formData, setFormData] = useState({
        project_id: '',
        invoice_number: '',
        amount: '',
        due_date: ''
    });
    const [error, setError] = useState('');

    const fetchData = async () => {
        try {
            setLoading(true);
            const [invRes, projRes] = await Promise.all([
                invoicesAPI.getAll(),
                projectsAPI.getAll()
            ]);
            setInvoices(invRes.data || []);
            setProjects(projRes.data || []);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCreateInvoice = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            const selectedProject = projects.find(p => p.id === parseInt(formData.project_id));
            if (!selectedProject) {
                throw new Error('Project not found');
            }

            await invoicesAPI.create({
                ...formData,
                project_id: parseInt(formData.project_id),
                client_id: selectedProject.client_id,
                amount: parseFloat(formData.amount)
            });
            setIsModalOpen(false);
            setFormData({ project_id: '', invoice_number: '', amount: '', due_date: '' });
            fetchData();
        } catch (err) {
            setError((err as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to create invoice');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredInvoices = invoices.filter(inv =>
        inv.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.project_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="flex justify-between items-end mb-8 text-left">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
                    <p className="text-slate-500 mt-1">Track payments and manage billing for your agency projects.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Invoice
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 text-left">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Total Receivables</p>
                    <p className="text-2xl font-bold text-slate-900">$12,450.00</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pending</p>
                    <p className="text-2xl font-bold text-amber-600">$4,200.00</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Paid</p>
                    <p className="text-2xl font-bold text-green-600">$8,250.00</p>
                </div>
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Overdue</p>
                    <p className="text-2xl font-bold text-red-600">$0.00</p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex gap-4 text-left">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search invoices by number, client, or project..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                    <Filter className="w-4 h-4" />
                    Filters
                </button>
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice #</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Client & Project</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Due Date</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            Array(5).fill(0).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    <td colSpan={6} className="px-6 py-4">
                                        <div className="h-10 bg-slate-50 rounded w-full"></div>
                                    </td>
                                </tr>
                            ))
                        ) : filteredInvoices.length > 0 ? (
                            filteredInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                                                <FileText size={16} />
                                            </div>
                                            <span className="font-bold text-slate-900">{invoice.invoice_number}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-left">
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-slate-900">{invoice.client_name}</span>
                                            <span className="text-xs text-slate-500">{invoice.project_name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${invoice.status === 'Paid' ? 'bg-green-50 text-green-700 border border-green-100' :
                                                invoice.status === 'Overdue' ? 'bg-red-50 text-red-700 border border-red-100' :
                                                    'bg-amber-50 text-amber-700 border border-amber-100'
                                            }`}>
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="font-bold text-slate-900">${invoice.amount.toLocaleString()}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-slate-600">{new Date(invoice.due_date).toLocaleDateString()}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-1.5 text-slate-400 hover:text-indigo-600 transition-colors">
                                                <Download size={18} />
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-slate-600 transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-20 text-center text-slate-500">
                                    No invoices found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create Invoice Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Invoice"
            >
                <form onSubmit={handleCreateInvoice} className="space-y-4 text-left">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                            {error}
                        </div>
                    )}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Invoice Number</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            placeholder="e.g. INV-2026-001"
                            value={formData.invoice_number}
                            onChange={(e) => setFormData({ ...formData, invoice_number: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Project</label>
                        <select
                            required
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white"
                            value={formData.project_id}
                            onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
                        >
                            <option value="">Select a project...</option>
                            {projects.map(p => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Amount ($)</label>
                            <input
                                required
                                type="number"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                placeholder="0.00"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-semibold text-slate-700">Due Date</label>
                            <input
                                required
                                type="date"
                                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                                value={formData.due_date}
                                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                            />
                        </div>
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
                            {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : 'Generate Invoice'}
                        </button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
}
