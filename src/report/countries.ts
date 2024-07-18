import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { continents, countries as Country } from '@prisma/client';
import { blob } from 'stream/consumers';
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
export interface CountryReportValues {
  title?: string;
  subTitle?: string;
  countries: Country[];
}
export const getCountryReport = (
  options: CountryReportValues,
): TDocumentDefinitions => {
  const { subTitle, title, countries } = options;
  const docDefinition: TDocumentDefinitions = {
    pageOrientation: 'landscape',
    header: headerSection({
      title: title ?? 'Countries Report',
      subTitle: subTitle ?? 'List of countries',
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
          widths: [50, 50, 50, '*', '*', '*'],

          body: [
            ['ID', 'ISO2', 'ISO3', 'Name', 'Continent', 'Local Name'],
            ...countries.map((country) => [
              country.id,
              country.iso2,
              country.iso3,
              { text: country.name, bold: true },
              country.continent,
              country.local_name,
            ]),
          ],
        },
      },
    ],
  };
  return docDefinition;
};
