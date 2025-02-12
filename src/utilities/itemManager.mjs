import itemData from '../data/itemData.json';

export function createItem(itemId) {
    const itemTemplate = itemData[itemId];
    if (!itemTemplate) {
        throw new Error(`Invalid item ID: ${itemId}`);
    }
    return { ...itemTemplate };
}

export function isEquippable(item) {
    return item.type === 'weapon' || item.type === 'armor';
}

export function isConsumable(item) {
    return item.type === 'consumable';
} 