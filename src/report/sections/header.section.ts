import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

interface HeaderOptions {
  title?: string;
  showLogo?: boolean;
  showDate?: boolean;
}
const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
};
export const headerSection = (options: HeaderOptions): Content => {
  const { showDate = true, showLogo = true, title } = options;
  const headerLogo: Content | null = showLogo ? logo : null;
  const headerDate: Content | null = showDate
    ? {
        text: `${DateFormatter.getDDMMMMYYY(new Date())}`,
        alignment: 'right',
        margin: [20, 20],
      }
    : null;

  const headerTitle: Content = title
    ? {
        text: title,
        style: {
          bold: true,
        },
      }
    : null;

  const header: Content = {
    columns: [headerLogo, headerTitle, headerDate],
  };
  return header;
};
