import { TDocumentDefinitions } from 'pdfmake/interfaces';
export interface ReportOptions {
  name: string;
}
export const getHelloWorldReport = ({
  name,
}: ReportOptions): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    content: [`Digamelo ${name}`],
  };
  return docDefinition;
};
