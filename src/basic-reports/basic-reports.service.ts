import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import {
  getEmploymentLetter,
  getEmploymentLetterById,
  getHelloWorldReport,
} from 'src/report';
@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  constructor(private readonly printerService: PrinterService) {
    super();
  }
  async hello() {
    const docDefinition = getHelloWorldReport({
      name: 'Joseph',
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
  async employmentLetter() {
    const docDefinition = getEmploymentLetter();
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
  async employmentLetterById(id: number): Promise<PDFKit.PDFDocument> {
    const employee = await this.employees.findUnique({
      where: {
        id,
      },
    });
    if (!employee) throw new NotFoundException('Employee not found');
    const docDefinition = getEmploymentLetterById({
      employerName: 'Joseph',
      employerCompany: 'Chamba Inc.',
      employerPosition: 'Software Engineer',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
    });
    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
