import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from 'src/printer/printer.service';
import { getEmploymentLetter } from 'src/report/employment-letter.report ';
import { getHelloWorldReport } from 'src/report/hello-world.report';
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
}
