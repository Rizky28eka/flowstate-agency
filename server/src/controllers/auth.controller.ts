import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import authService from '../services/auth.service';

export class AuthController {
    login = asyncHandler(async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        return res.status(200).json(new ApiResponse(200, result, "Login successful"));
    });

    googleLogin = asyncHandler(async (req: Request, res: Response) => {
        const { credential } = req.body; // credential is the ID token from Google
        const result = await authService.googleLogin(credential);
        return res.status(200).json(new ApiResponse(200, result, "Google login successful"));
    });

    register = asyncHandler(async (req: Request, res: Response) => {
        const { agencyName, name, email, password } = req.body;
        const result = await authService.registerAgency(agencyName, name, email, password);
        return res.status(201).json(new ApiResponse(201, result, "Agency registered successfully"));
    });
}

export default new AuthController();
