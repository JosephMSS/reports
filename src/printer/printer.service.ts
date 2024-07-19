import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import type {
  BufferOptions,
  CustomTableLayout,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};
export enum CUSTOM_LAYOUTS {
  CUSTOM_01 = 'customLayout01',
}
const customTableLayouts: Record<CUSTOM_LAYOUTS, CustomTableLayout> = {
  [CUSTOM_LAYOUTS.CUSTOM_01]: {
    hLineWidth: (i, node) => {
      if (i === 0 || i === node.table.body.length) {
        return 0;
      }
      return i === node.table.headerRows ? 2 : 1;
    },
    vLineWidth: (_i) => {
      return 0;
    },
    hLineColor: (i) => {
      return i === 1 ? 'black' : '#aaa';
    },
    paddingLeft: (i) => {
      return i === 0 ? 0 : 8;
    },
    paddingRight: (i, node) => {
      return i === node.table.widths.length - 1 ? 0 : 8;
    },
    fillColor: (i,node) => {
      if (i === 0) return '#7b90be';
      if (i === node.table.body.length - 1) return '#7b90be';
      return i % 2 === 0 ? '#7a787b' : null;
    },
  },
};
@Injectable()
export class PrinterService {
  private printer = new PdfPrinter(fonts);
  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {
      tableLayouts: customTableLayouts,
    },
  ): PDFKit.PDFDocument {
    const doc = this.printer.createPdfKitDocument(docDefinition, options);
    return doc;
  }
}
