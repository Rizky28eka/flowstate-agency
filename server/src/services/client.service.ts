import clientRepository from '../repositories/client.repository';
import { io } from '../config/socket';
import { Prisma } from '@prisma/client';
import { ApiError } from '../utils/ApiError';

export class ClientService {
    async getAllClients(organizationId: string) {
        const clients = await clientRepository.findMany(organizationId);
        return clients.map(client => ({
            ...client,
            activeProjects: client.projects.filter((p: { status: string }) => p.status === 'ACTIVE').length
        }));
    }

    async getClientById(id: string, organizationId: string) {
        const client = await clientRepository.findById(id, organizationId);
        if (!client) {
            throw new ApiError(404, 'Client not found');
        }
        return client;
    }

    async createClient(organizationId: string, userId: string, clientData: Omit<Prisma.ClientCreateInput, 'organization' | 'createdBy'>) {
        const data: Prisma.ClientCreateInput = {
            ...clientData,
            organization: { connect: { id: organizationId } },
            createdBy: { connect: { id: userId } }
        };

        const newClient = await clientRepository.create(data);
        io.emit('client_updated', newClient);
        return newClient;
    }

    async updateClient(id: string, organizationId: string, clientData: Prisma.ClientUpdateInput) {
        const updatedClient = await clientRepository.update(id, organizationId, clientData);
        io.emit('client_updated', updatedClient);
        return updatedClient;
    }

    async deleteClient(id: string, organizationId: string) {
        await clientRepository.delete(id, organizationId);
        io.emit('client_deleted', id);
    }
}

export default new ClientService();
