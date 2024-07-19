import { countries as Country } from '@prisma/client';
import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection, headerSection } from './sections';
import { CUSTOM_LAYOUTS } from 'src/printer/printer.service';
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
    footer: footerSection,
    pageMargins: [40, 110, 40, 60],
    styles: styles,
    content: [
      {
        layout: CUSTOM_LAYOUTS.CUSTOM_01,
        table: {
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
            ['', '', '', '', 'Totales', `${countries.length.toString()}`],
          ],
        },
      },

      //#section Total table
      {
        text: 'Totales',
        style: {
          fontSize: 16,
          margin: [0, 40, 0, 0],
        },
      },
      {
        layout: 'noBorderLines',
        table: {
          widths: [50, 50, 50, '*', '*', '*'],
          body: [
            [
              { text: 'Total Counties', colSpan: 2, bold: true },
              {},
              {},
              {
                text: `Countries ${countries.length.toString()}`,
              },
              {},
              {},
            ],
          ],
        },
      },
      //#endsection Total table
    ],
  };
  return docDefinition;
};
