import { Router } from 'express';
import invoiceController from '../controllers/invoice.controller';

const router = Router();

router.get('/', invoiceController.getAllInvoices);
router.get('/:id', invoiceController.getInvoiceById);
router.post('/', invoiceController.createInvoice);
router.patch('/:id', invoiceController.updateInvoice);
router.delete('/:id', invoiceController.deleteInvoice);
router.patch('/:id/status', invoiceController.updateStatus);

export default router;