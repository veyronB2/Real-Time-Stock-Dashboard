import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import { CSSProperties, RefObject, useImperativeHandle, useMemo, useRef } from "react";
import { ColDef, ColGroupDef, DefaultMenuItem, MenuItemDef, themeQuartz } from "ag-grid-enterprise";

import { getMenuItems } from "../utils/agGrid/utils";

const rowBorder = {
    color: "var(--color-neutral-dark)", width: 1
};

const colBorder = {
    width: 0
};

const theme = themeQuartz
    .withParams({
        backgroundColor: "#FFFFFF",
        browserColorScheme: "light",
        foregroundColor: "#000000",
        headerBackgroundColor: "var(--color-neutral-dark)",
        rowHeight: 64,
        headerHeight: 64,
        rowBorder,
        headerRowBorder: rowBorder,
        columnBorder: colBorder,
        headerColumnBorder: colBorder,
    });

export interface TableProps<T> extends Omit<AgGridReactProps<T>, "rowData" | "columnDefs" > {
    rowData: T[];
    columnDefs: (ColDef<T> | ColGroupDef<T>)[];
    className?: string;
    gridRef?: RefObject<AgGridReact<T> | null>;
    gridStyle?: CSSProperties;
    contextMenuItems?: (DefaultMenuItem | MenuItemDef)[];
    mainMenuItems?: (DefaultMenuItem | MenuItemDef)[];
    testId?: string;
}

const Table = <T,>({
    rowData,
    columnDefs,
    className,
    gridRef,
    gridStyle,
    defaultColDef,
    gridOptions,
    contextMenuItems,
    mainMenuItems,
    testId,
    ...rest}: TableProps<T>) => {
    const ref = useRef<AgGridReact<T>>(null);
    const tableWrapperRef = useRef<HTMLDivElement | null>(null);
    useImperativeHandle(gridRef, () => ref.current as AgGridReact<T>);

    const defaultGridStyle = useMemo((): CSSProperties => ({
        height: "600px",
        minHeight: "18.75rem",
        width: "100%"
    }), []);

    const mergedGridStyles = useMemo((): CSSProperties => ({
        ...defaultGridStyle,
        ...gridStyle,
    }), [defaultGridStyle, gridStyle]);

    const mergedGridOptions = useMemo((): AgGridReactProps => {
        const updatedOptions = {
            ...gridOptions,
        };

        updatedOptions.getContextMenuItems = () => {
            return getMenuItems(contextMenuItems, "context");
        };
        updatedOptions.getMainMenuItems = () => {
            return getMenuItems(mainMenuItems, "main");
        };

        return updatedOptions;
    }, [contextMenuItems, gridOptions, mainMenuItems]);

    return (
        <div className={`${className ?? ""}`} style={mergedGridStyles} ref={tableWrapperRef}>
            <AgGridReact
                theme={theme}
                data-testid={testId}
                ref={ref}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                {...mergedGridOptions}
                {...rest}
            />
        </div>
    );
};

export default Table;
