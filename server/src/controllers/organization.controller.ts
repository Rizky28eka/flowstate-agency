import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import organizationService from '../services/organization.service';

export class OrganizationController {
    getSettings = asyncHandler(async (req: Request, res: Response) => {
        const settings = await organizationService.getSettings(req.organizationId);
        return res.status(200).json(new ApiResponse(200, settings, "Organization settings fetched successfully"));
    });

    updateSettings = asyncHandler(async (req: Request, res: Response) => {
        const settings = req.body;
        const updatedSettings = await organizationService.updateSettings(req.organizationId, settings);
        return res.status(200).json(new ApiResponse(200, updatedSettings, "Organization settings updated successfully"));
    });

    getOrganization = asyncHandler(async (req: Request, res: Response) => {
        const organization = await organizationService.getOrganization(req.organizationId);
        return res.status(200).json(new ApiResponse(200, organization, "Organization details fetched successfully"));
    });

    updateOrganization = asyncHandler(async (req: Request, res: Response) => {
        const data = req.body;
        const updatedOrg = await organizationService.updateOrganization(req.organizationId, data);
        return res.status(200).json(new ApiResponse(200, updatedOrg, "Organization updated successfully"));
    });

    getRoles = asyncHandler(async (req: Request, res: Response) => {
        const roles = await organizationService.getRoles(req.organizationId);
        return res.status(200).json(new ApiResponse(200, roles, "Roles fetched successfully"));
    });

    getPermissions = asyncHandler(async (req: Request, res: Response) => {
        const permissions = await organizationService.getPermissions(req.organizationId);
        return res.status(200).json(new ApiResponse(200, permissions, "Permissions fetched successfully"));
    });

    updateRolePermissions = asyncHandler(async (req: Request, res: Response) => {
        const { roleId } = req.params;
        const { permissionIds } = req.body;
        const updatedRole = await organizationService.updateRolePermissions(roleId, permissionIds);
        return res.status(200).json(new ApiResponse(200, updatedRole, "Role permissions updated successfully"));
    });
}

export default new OrganizationController();
