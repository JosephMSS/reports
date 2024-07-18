import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
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
const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
};
export const getEmploymentLetter = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    header: headerSection({
      showDate: false,
      showLogo: false,
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
        text: `Yo, [Nombre del Empleador], en mi calidad de [Cargo del Empleador] de [Nombre de la Empresa], 
por medio de la presente certifco que [Nombre del Empleado] ha sido empleado en nuestra 
empresa desde el [Fecha de Inicio del Empleado].\n\n
Durante su empleo, el Sr./Sra. [Nombre del Empleado] ha desempeñado el cargo de [Cargo del 
Empleado], demostrando responsabilidad, compromiso y habilidades profesionales en sus 
labores.\n\n
La jornada laboral del Sr./ Sra. [Nombre del Empleado] es de [Número de Horas] horas 
semanales, con un horario de [Horario de Trabajo], cumpliendo con las políticas y 
procedimientos establecidos por la empresa.\n\n
Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente.\n\n`,
        style: 'body',
      },
      {
        text: `Atentamente, \n
[Nombre del Empleador]\n
[Cargo del Empleador]\n
[Nombre de la Empresa]\n
[Fecha de Emisión]\n`,
        style: 'signature',
      },
    ],
  };
  return docDefinition;
};
