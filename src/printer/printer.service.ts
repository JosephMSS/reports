import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import pdfPrinter from 'pdfmake';
import type { BufferOptions, TDocumentDefinitions } from 'pdfmake/interfaces';
const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};
@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);
  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {},
  ): PDFKit.PDFDocument {
    const doc = this.printer.createPdfKitDocument(docDefinition, options);
    return doc;
  }
}
