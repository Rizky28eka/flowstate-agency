import reportRepository from '../repositories/report.repository';
import { io } from '../config/socket';
import { Prisma, ReportType } from '@prisma/client';

export class ReportService {
    async getAllReports(organizationId: string) {
        return reportRepository.findMany(organizationId);
    }

    async createReport(organizationId: string, reportData: { title: string; type: ReportType; generatedBy?: string; content?: Prisma.InputJsonValue }) {
        const { title, type, generatedBy = "System", content } = reportData;

        // Ensure type matches enum (simple validation)
        const validTypes: ReportType[] = ["FINANCIAL", "RESOURCE", "CLIENT", "PROJECT", "TIME", "CUSTOM"];
        const finalType = validTypes.includes(type) ? type : "CUSTOM";

        const data: Prisma.ReportCreateInput = {
            title,
            type: finalType,
            generatedBy,
            content: content || {},
            organization: { connect: { id: organizationId } },
        };

        const newReport = await reportRepository.create(data);
        io.to(organizationId).emit('report_updated', newReport);
        return newReport;
    }
}

export default new ReportService();
