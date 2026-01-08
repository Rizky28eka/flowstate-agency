import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import analyticsService from '../services/analytics.service';

export class AnalyticsController {
    getDashboardData = asyncHandler(async (req: Request, res: Response) => {
        const data = await analyticsService.getDashboardData(req.organizationId);
        return res.status(200).json(new ApiResponse(200, data, "Analytics data fetched successfully"));
    });
}

export default new AnalyticsController();
