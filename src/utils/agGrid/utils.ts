import { DefaultMenuItem, MenuItemDef } from "ag-grid-community";

interface GetNoOverlayNoRowsTemplateProps {
    entity?: string;
    customMessage?: string;
}

//TODO: unit test
export const getNoOverlayNoRowsTemplate = ( { entity, customMessage }: GetNoOverlayNoRowsTemplateProps) => {
    const message = customMessage ? customMessage : `There are no ${entity} available.`;
    return `<span class=ag-overlay-no-rows-center>${message}</span>`;
};

export const defaultMainMenuItems: DefaultMenuItem[] = ["sortAscending", "sortDescending"];
export const defaultContextMenuItems: DefaultMenuItem[] = ["copy"];

//TODO: unit test
type MenuType = "context" | "main";
export const getMenuItems = (menuItems: (DefaultMenuItem | MenuItemDef)[] | undefined, menuType: MenuType) => {
    return menuItems !== undefined ? menuItems : menuType === "context" ? defaultContextMenuItems : defaultMainMenuItems;
};



