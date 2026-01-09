import { useState, useEffect } from 'react'
import { Plus, Search, Mail, MoreVertical, ExternalLink, Loader2 } from 'lucide-react'
import { clientsAPI } from '../services/api'
import { DashboardLayout } from '../components/layout/DashboardLayout'
import { Users } from 'lucide-react'
import { Modal } from '../components/shared/Modal'

interface Client {
    id: number;
    name: string;
    email: string;
    avatar_url?: string;
    is_active: boolean;
    created_at: string;
}

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const [error, setError] = useState('');

    const fetchClients = async () => {
        try {
            setLoading(true);
            const response = await clientsAPI.getAll();
            setClients(response.data || []);
        } catch (error) {
            console.error('Failed to fetch clients:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleAddClient = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await clientsAPI.create(formData);
            setIsModalOpen(false);
            setFormData({ name: '', email: '' });
            fetchClients();
        } catch (err) {
            setError((err as { response?: { data?: { error?: string } } }).response?.data?.error || 'Failed to add client');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Clients</h1>
                    <p className="text-slate-500 mt-1">Manage your customer relationships and contact details.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Client
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                </div>
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 animate-pulse text-left">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-4 bg-slate-100 rounded w-3/4 mb-2"></div>
                                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="h-3 bg-slate-100 rounded w-full"></div>
                                <div className="h-3 bg-slate-100 rounded w-5/6"></div>
                            </div>
                        </div>
                    ))
                ) : filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                        <div key={client.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-200 transition-all group text-left">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center font-bold text-lg overflow-hidden border border-indigo-100">
                                    {client.avatar_url ? (
                                        <img src={client.avatar_url} alt={client.name} className="w-full h-full object-cover" />
                                    ) : (
                                        client.name[0]
                                    )}
                                </div>
                                <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                                    <MoreVertical size={18} />
                                </button>
                            </div>

                            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">{client.name}</h3>
                            <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                                <Mail size={12} />
                                <span>{client.email}</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-semibold rounded-lg transition-colors">
                                    <Mail size={14} />
                                    Email
                                </button>
                                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 text-xs font-semibold rounded-lg transition-colors">
                                    <ExternalLink size={14} />
                                    Profile
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 bg-white rounded-xl border border-slate-200 border-dashed text-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                            <Users size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No clients found</h3>
                        <p className="text-slate-500 mt-1">Try adjusting your search or add a new client.</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-6 text-indigo-600 font-bold hover:underline"
                        >
                            Add your first client
                        </button>
                    </div>
                )}
            </div>

            {/* Add Client Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Client"
            >
                <form onSubmit={handleAddClient} className="space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg">
                            {error}
                        </div>
                    )}
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Full Name</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            placeholder="e.g. John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Email Address</label>
                        <input
                            required
                            type="email"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                            placeholder="e.g. john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                            {isSubmitting ? <Loader2 className="animate-spin w-4 h-4" /> : 'Create Client'}
                        </button>
                    </div>
                </form>
            </Modal>
        </DashboardLayout>
    );
}
