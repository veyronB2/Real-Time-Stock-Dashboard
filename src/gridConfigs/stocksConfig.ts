import { ColDef, GridOptions } from "ag-grid-community";
import { getNoOverlayNoRowsTemplate, getRowStyles } from "../shared/grid/utils";

import { currencyFormatter } from "../shared/formatters/currency";

export interface RowData {
    id: string;
    symbol: string;
    price: number;
}

export const columnDefs: ColDef<RowData>[] = [
    { field: "id", hide: true},
    { field: "symbol",cellClass: "number"},
    { 
        field: "price",  
        cellClass: ["number", "stock-price-cell"],
        filter: 'agNumberColumnFilter',
        cellRenderer: 'agAnimateShowChangeCellRenderer',
        valueFormatter: ({ value, data }) => typeof value === "number"
            ? currencyFormatter(value, data?.symbol)
            : "", 
    },
];

export const gridOptions: GridOptions = {
    overlayNoRowsTemplate: getNoOverlayNoRowsTemplate({ entity: "stocks" }),
    domLayout: "autoHeight",
    paginationPageSize: 5,
    suppressCellFocus: true,
    paginationPageSizeSelector: [5, 10, 15],
    getRowId: params => params.data.id,
    getRowStyle: getRowStyles,
    defaultColDef: {
        flex: 1,
        resizable: false,
        headerClass: "center-header",
        filter: "agTextColumnFilter",
        filterParams: { buttons: ["reset"] }
    },
};
