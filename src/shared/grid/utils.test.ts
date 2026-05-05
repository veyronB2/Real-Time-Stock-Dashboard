import { DefaultMenuItem, MenuItemDef } from 'ag-grid-community';

import { defaultContextMenuItems, defaultMainMenuItems, getMenuItems, getNoOverlayNoRowsTemplate } from './utils';

describe('Testing getNoOverlayNoRowsTemplate', () => {
    it('It should return correct message', () => {
        const getResult = (text: string) => `<span class=ag-overlay-no-rows-center>${text}</span>`;
        expect(getNoOverlayNoRowsTemplate({ entity: 'stocks' })).toBe(getResult('There are no stocks available.'));

        const customMessage = 'Something went wrong';
        expect(getNoOverlayNoRowsTemplate({ customMessage })).toBe(getResult(customMessage));
    });
});

describe('Testing getMenuItems', () => {
    it('It should return provided menu items when they exist', () => {
        const customMenuItems: (DefaultMenuItem | MenuItemDef)[] = ['copy', { name: 'Custom action' }];

        expect(getMenuItems(customMenuItems, 'context')).toBe(customMenuItems);
        expect(getMenuItems(customMenuItems, 'main')).toBe(customMenuItems);
    });

    it('It should return default menu items when none are provided', () => {
        expect(getMenuItems(undefined, 'context')).toEqual(defaultContextMenuItems);
        expect(getMenuItems(undefined, 'main')).toEqual(defaultMainMenuItems);
    });
});