import type {
    ContextPageSize,
    DynamicContent
} from 'pdfmake/interfaces';
export const footerSection: DynamicContent = (
    currentPage,
    pageCount,
    _pageSize: ContextPageSize,
) => {
    return {

        text: 'Page ' + currentPage.toString() + ' of ' + pageCount,
        alignment: 'right',
        fontSize: 12,
        margin: [0, 10, 35, 0],


    };
};
