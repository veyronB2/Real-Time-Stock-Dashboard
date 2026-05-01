import { ColDef, GridOptions } from "ag-grid-community";
import { getNoOverlayNoRowsTemplate, getRowStyles } from "./utils";

import { currencyFormatter } from "../helpers";

export interface RowData {
    id: string;
    symbol: string;
    price: number;
}

export const columnDefs: ColDef<RowData>[] = [
    { field: "id", hide: true},
    { field: "symbol" },
    { 
        field: "price",  
        filter: 'agNumberColumnFilter',
        valueFormatter: ({ value, data }) => typeof value === "number"
            ? currencyFormatter(value, data?.symbol)
            : "", 
    },
];

export const gridOptions: GridOptions = {
    overlayNoRowsTemplate: getNoOverlayNoRowsTemplate({ entity: "stocks" }),
    domLayout: "normal",
    paginationPageSize: 5,
    suppressCellFocus: true,
    paginationPageSizeSelector: [5, 10, 15],
    getRowStyle: getRowStyles,
    defaultColDef: {
        flex: 1,
        resizable: false,
        filter: "agTextColumnFilter",
        filterParams: { buttons: ["reset"] }
    },
};
