import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { Response } from 'express';
import { BasicReportsService } from './basic-reports.service';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}
  @Get()
  async hello(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.hello();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'generated-pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
  @Get('employment-letter')
  async employmentLetter(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.employmentLetter();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'generated-pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
  @Get('employment-letter/:id')
  async employmentLetterById(
    @Res() response: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(id);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'generated-pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
  @Get('countries')
  async countriesReport(@Res() response: Response) {
    const pdfDoc = await this.basicReportsService.countriesReport();
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'generated-pdf';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
