import { PrismaClient, Project, Invoice, InvoiceStatus, Client } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { getRandomElement, getRandomInt, getRandomDate } from './utils';

const INVOICES_PER_PROJECT = { min: 1, max: 4 };

export async function seedInvoices(prisma: PrismaClient, organizationId: string, projects: Project[], clients: Client[]): Promise<number> {
  let totalInvoices = 0;
  const invoiceStatuses = [InvoiceStatus.DRAFT, InvoiceStatus.SENT, InvoiceStatus.PAID, InvoiceStatus.OVERDUE, InvoiceStatus.CANCELLED];

  for (const project of projects) {
    const invoiceCount = getRandomInt(INVOICES_PER_PROJECT.min, INVOICES_PER_PROJECT.max);
    for (let inv = 0; inv < invoiceCount; inv++) {
      const invoiceStatus = getRandomElement(invoiceStatuses);
      const amount = Math.floor((project.budget || 0) / invoiceCount);
      await prisma.invoice.create({
        data: {
          invoiceNumber: `INV-${organizationId.slice(0, 4).toUpperCase()}-${String(totalInvoices + 1).padStart(4, '0')}`,
          projectId: project.id,
          organizationId: organizationId,
          clientId: project.clientId!,
          total: amount,
          status: invoiceStatus,
          issuedDate: getRandomDate(project.createdAt, new Date()),
          dueDate: getRandomDate(new Date(), project.endDate || new Date()),
          paidAt: invoiceStatus === InvoiceStatus.PAID ? getRandomDate(project.createdAt, new Date()) : null,
        }
      });
      totalInvoices++;
    }
  }
  console.log(`   ✓ Invoices: ${totalInvoices}`);
  return totalInvoices;
}
