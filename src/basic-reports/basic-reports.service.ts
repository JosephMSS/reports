import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import pdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};
@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
  /**
   * this will be fixed in the future
   *
   */
  async hello() {
    /**
     * Creo el contenido del documento
     */
    const docDefinition: TDocumentDefinitions = {
      content: ['Digamelo mamod'],
    };
    const printer = new pdfPrinter(fonts);
    const doc = printer.createPdfKitDocument(docDefinition);

    return doc;
  }
}
