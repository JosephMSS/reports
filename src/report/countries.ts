import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';

const styles: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 50],
  },
  body: {
    marginBottom: 50,
    alignment: 'justify',
  },
  signature: {
    fontSize: 14,
    bold: true,
    alignment: 'left',
  },
};
export interface CountryReportValues {}
export const getCountryReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    pageOrientation: 'landscape',
    header: headerSection({
      title: 'Countries Report',
      subTitle: 'List of countries',
    }),
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral',
      style: {
        alignment: 'center',
      },
    },
    pageMargins: [40, 110, 40, 60],
    styles: styles,
    content: [
      {
        layout: 'noBorders', // optional
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: ['*', 'auto', 100, '*'],

          body: [
            ['First', 'Second', 'Third', 'The last one'],
            ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
            [{ text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4'],
          ],
        },
      },
    ],
  };
  return docDefinition;
};
