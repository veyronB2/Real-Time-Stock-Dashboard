import { DefaultMenuItem, MenuItemDef, RowClassParams } from "ag-grid-community";

interface GetNoOverlayNoRowsTemplateProps {
    entity?: string;
    customMessage?: string;
}

export const getNoOverlayNoRowsTemplate = ( { entity, customMessage }: GetNoOverlayNoRowsTemplateProps) => {
    const message = customMessage ? customMessage : `There are no ${entity} available.`;
    return `<span class=ag-overlay-no-rows-center>${message}</span>`;
};

export const defaultMainMenuItems: DefaultMenuItem[] = ["sortAscending", "sortDescending"];
export const defaultContextMenuItems: DefaultMenuItem[] = ["copy"];

type MenuType = "context" | "main";
export const getMenuItems = (menuItems: (DefaultMenuItem | MenuItemDef)[] | undefined, menuType: MenuType) => {
    return menuItems !== undefined ? menuItems : menuType === "context" ? defaultContextMenuItems : defaultMainMenuItems;
};

export const getRowStyles = (params: RowClassParams) => {
    if (params.node.rowIndex && params.node.rowIndex % 2 !== 0) {
        return {background: "rgba(145, 209, 228, 0.1)"}
    }
}



