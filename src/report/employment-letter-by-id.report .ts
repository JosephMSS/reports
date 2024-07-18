import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { DateFormatter } from 'src/helpers';

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
export interface ReportValues {
  employerName: string;
  employerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employerCompany: string;
}
export const getEmploymentLetterById = (
  values: ReportValues,
): TDocumentDefinitions => {
  const {
    employerName,
    employerPosition,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employerCompany,
  } = values;
  const docDefinition: TDocumentDefinitions = {
    header: headerSection({
      showDate: true,
      showLogo: true,
    }),
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral',
      style: {
        alignment: 'center',
      },
    },
    pageMargins: [40, 60, 40, 60],
    styles: styles,
    content: [
      {
        text: 'Constancia de empleo',
        style: 'header',
      },
      {
        text: `Yo, ${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, 
por medio de la presente certifco que ${employeeName} ha sido empleado en nuestra 
empresa desde el ${DateFormatter.getDDMMMMYYY(employeeStartDate)}.\n\n
Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus 
labores.\n\n
La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas 
semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y 
procedimientos establecidos por la empresa.\n\n
Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente.\n\n`,
        style: 'body',
      },
      {
        text: `Atentamente, \n
${employeeName}\n
${employerPosition}\n
${employerCompany}\n
${DateFormatter.getDDMMMMYYY(new Date())}\n`,
        style: 'signature',
      },
    ],
  };
  return docDefinition;
};
