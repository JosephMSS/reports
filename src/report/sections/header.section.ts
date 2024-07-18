import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};
const currentDate: Content = {
  text: DateFormatter.getDDMMMMYYY(new Date()),
  alignment: 'right',
  margin: [20, 40],
  width: 150,
  style: {
    bold: true,
  },
};
interface HeaderOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subTitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate ? currentDate : null;
  const headerSubtitle: Content = {
    text: subTitle,
    style: {
      fontSize: 20,
      bold: true,
    },
  };
  const headerTitle: Content = {
    text: title,
    style: {
      fontSize: 24,
      bold: true,
    },
  };
  const headerTitles: Content = {
    style: {
      alignment: 'center',
      bold: true,
    },
    margin: [0, 15],
    stack: [],
  };
  if (title) headerTitles.stack.push(headerTitle);

  if (subTitle) headerTitles.stack.push(headerSubtitle);
  return {
    margin: [20, 0],
    columns: [headerLogo, headerTitles, headerDate],
  };
};
