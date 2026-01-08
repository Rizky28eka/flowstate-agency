import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../utils/ApiResponse';
import reportService from '../services/report.service';

export class ReportController {
    getAllReports = asyncHandler(async (req: Request, res: Response) => {
        const reports = await reportService.getAllReports(req.organizationId);
        return res.status(200).json(new ApiResponse(200, reports, "Reports fetched successfully"));
    });

    createReport = asyncHandler(async (req: Request, res: Response) => {
        const report = await reportService.createReport(req.organizationId, req.body);
        return res.status(201).json(new ApiResponse(201, report, "Report created successfully"));
    });
}

export default new ReportController();
