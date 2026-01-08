import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import invoiceService from '../services/invoice.service';

export class InvoiceController {
    getAllInvoices = asyncHandler(async (req: Request, res: Response) => {
        const invoices = await invoiceService.getAllInvoices(req.organizationId);
        return res.status(200).json(new ApiResponse(200, invoices, "Invoices fetched successfully"));
    });

    getInvoiceById = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const invoice = await invoiceService.getInvoiceById(id, req.organizationId);
        return res.status(200).json(new ApiResponse(200, invoice, "Invoice fetched successfully"));
    });

    createInvoice = asyncHandler(async (req: Request, res: Response) => {
        const invoice = await invoiceService.createInvoice(req.organizationId, req.body);
        return res.status(201).json(new ApiResponse(201, invoice, "Invoice created successfully"));
    });

    updateInvoice = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const invoice = await invoiceService.updateInvoice(id, req.organizationId, req.body);
        return res.status(200).json(new ApiResponse(200, invoice, "Invoice updated successfully"));
    });

    deleteInvoice = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        await invoiceService.deleteInvoice(id, req.organizationId);
        return res.status(200).json(new ApiResponse(200, {}, "Invoice deleted successfully"));
    });

    updateStatus = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { status } = req.body;
        const invoice = await invoiceService.updateInvoiceStatus(id, req.organizationId, status);
        return res.status(200).json(new ApiResponse(200, invoice, "Invoice status updated successfully"));
    });
}

export default new InvoiceController();
