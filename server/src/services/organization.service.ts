import { Organization, Prisma } from '@prisma/client';
import organizationRepository from '../repositories/organization.repository';
import { ApiError } from '../utils/ApiError';

export class OrganizationService {
    async getSettings(organizationId: string) {
        const org = await organizationRepository.findSettings(organizationId);
        if (!org) {
            throw new ApiError(404, 'Organization not found');
        }
        return org.settings || {};
    }

    async updateSettings(organizationId: string, settings: Prisma.InputJsonValue) {
        const updatedOrg = await organizationRepository.updateSettings(organizationId, settings);
        return updatedOrg.settings;
    }

    async getOrganization(organizationId: string) {
        const org = await organizationRepository.findById(organizationId);
        if (!org) {
            throw new ApiError(404, 'Organization not found');
        }
        return org;
    }

    async updateOrganization(organizationId: string, data: Prisma.OrganizationUpdateInput) {
        return organizationRepository.update(organizationId, data);
    }

    async getRoles(organizationId: string) {
        return organizationRepository.findRoles(organizationId);
    }

    async getPermissions(organizationId: string) {
        return organizationRepository.findPermissions(organizationId);
    }

    async updateRolePermissions(roleId: string, permissionIds: string[]) {
        return organizationRepository.updateRolePermissions(roleId, permissionIds);
    }
}

export default new OrganizationService();
