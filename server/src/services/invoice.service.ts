import invoiceRepository from '../repositories/invoice.repository';
import { io } from '../config/socket';
import { Prisma, InvoiceStatus } from '@prisma/client';

interface InvoiceItemData {
    description: string;
    quantity: number;
    unitPrice: number;
}

interface InvoiceData {
    clientId: string;
    projectId?: string;
    invoiceNumber: string;
    amount: number;
    status?: InvoiceStatus;
    dueDate: string;
    items: InvoiceItemData[];
}

export class InvoiceService {
    async getAllInvoices(organizationId: string) {
        return invoiceRepository.findMany(organizationId);
    }

    async getInvoiceById(id: string, organizationId: string) {
        return invoiceRepository.findById(id, organizationId);
    }

    async createInvoice(organizationId: string, invoiceData: InvoiceData) {
        const { clientId, projectId, invoiceNumber, amount, status, dueDate, items } = invoiceData;

        const data: Prisma.InvoiceCreateInput = {
            invoiceNumber,
            total: amount,
            status: status || InvoiceStatus.DRAFT,

            dueDate: new Date(dueDate),
            organization: { connect: { id: organizationId } },
            client: { connect: { id: clientId } },
            ...(projectId && { project: { connect: { id: projectId } } }),
            items: {
                create: items?.map((item: InvoiceItemData) => ({
                    description: item.description,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    amount: item.quantity * item.unitPrice,
                    total: item.quantity * item.unitPrice
                }))

            }
        };


        const newInvoice = await invoiceRepository.create(data);
        io.to(organizationId).emit('invoice_created', newInvoice);
        return newInvoice;
    }

    async updateInvoice(id: string, organizationId: string, updateData: Partial<InvoiceData>) {
        const updatedInvoice = await invoiceRepository.update(id, organizationId, updateData as Prisma.InvoiceUpdateInput);


        if (updateData.status === InvoiceStatus.PAID) {
            io.to(organizationId).emit('analytics_updated');
        }

        io.to(organizationId).emit('invoice_updated', updatedInvoice);
        return updatedInvoice;
    }

    async deleteInvoice(id: string, organizationId: string) {
        await invoiceRepository.delete(id, organizationId);
        io.to(organizationId).emit('invoice_deleted', { id });
    }

    async updateInvoiceStatus(id: string, organizationId: string, status: InvoiceStatus) {
        return this.updateInvoice(id, organizationId, { status });
    }
}

export default new InvoiceService();
