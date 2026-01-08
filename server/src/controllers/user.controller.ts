import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import userService from '../services/user.service';

export class UserController {
    getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
        const user = await userService.getCurrentUser(req.userId);
        return res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
    });

    updateProfile = asyncHandler(async (req: Request, res: Response) => {
        const { name, bio } = req.body;
        const user = await userService.updateProfile(req.userId, req.organizationId, { name, bio });
        return res.status(200).json(new ApiResponse(200, user, "Profile updated successfully"));
    });

    updateAvatar = asyncHandler(async (req: Request, res: Response) => {
        const { avatarUrl } = req.body;
        const user = await userService.updateAvatar(req.userId, req.organizationId, avatarUrl);
        return res.status(200).json(new ApiResponse(200, user, "Avatar updated successfully"));
    });

    getAllUsers = asyncHandler(async (req: Request, res: Response) => {
        const users = await userService.getAllUsers(req.organizationId);
        return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
    });

    createUser = asyncHandler(async (req: Request, res: Response) => {
        const { email, name, roleId } = req.body;
        const user = await userService.createUser(req.organizationId, email, name, roleId);
        return res.status(201).json(new ApiResponse(201, user, "User created successfully"));
    });

    updateUser = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        const { email, name } = req.body;
        const user = await userService.updateUser(id, req.organizationId, email, name);
        return res.status(200).json(new ApiResponse(200, user, "User updated successfully"));
    });

    deleteUser = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        await userService.deleteUser(id, req.organizationId);
        return res.status(200).json(new ApiResponse(200, {}, "User deleted successfully"));
    });
}

export default new UserController();
