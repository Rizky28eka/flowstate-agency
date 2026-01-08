import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import clientService from '../services/client.service';

export class ClientController {
    getAllClients = asyncHandler(async (req: Request, res: Response) => {
        const clients = await clientService.getAllClients(req.organizationId);
        return res.status(200).json(new ApiResponse(200, clients, "Clients fetched successfully"));
    });

    getClientById = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const client = await clientService.getClientById(id, req.organizationId);
        return res.status(200).json(new ApiResponse(200, client, "Client fetched successfully"));
    });

    createClient = asyncHandler(async (req: Request, res: Response) => {
        const client = await clientService.createClient(req.organizationId, req.userId, req.body);
        return res.status(201).json(new ApiResponse(201, client, "Client created successfully"));
    });

    updateClient = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const client = await clientService.updateClient(id, req.organizationId, req.body);
        return res.status(200).json(new ApiResponse(200, client, "Client updated successfully"));
    });

    deleteClient = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        await clientService.deleteClient(id, req.organizationId);
        return res.status(200).json(new ApiResponse(200, {}, "Client deleted successfully"));
    });
}

export default new ClientController();
