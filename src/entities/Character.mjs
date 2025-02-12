import ResourcePool from '../systems/ResourcePool.mjs'
import LevelingSystem from '../systems/LevelingSystem.mjs'

const baseStats = {
	MAX_HEALTH: 100,
	MAX_MANA: 50,
	DAMAGE: 10
}
export default class Character {
	health = new ResourcePool(baseStats.MAX_HEALTH)
	mana = new ResourcePool(baseStats.MAX_MANA)

	level = new LevelingSystem()

	baseDamage = baseStats.DAMAGE

	skills = new Array(6).fill(null)

	inventory = [];
	maxInventorySize = 20;
	equippedItems = {
		weapon: null,
		armor: null
	};

	addItem(item) {
		if (this.inventory.length >= this.maxInventorySize) {
			throw new Error("Inventory is full!");
		}
		this.inventory.push(item);
	}

	removeItem(itemId) {
		const index = this.inventory.findIndex(item => item.id === itemId);
		if (index === -1) {
			throw new Error("Item not found in inventory!");
		}
		return this.inventory.splice(index, 1)[0];
	}

	equipItem(itemId) {
		const item = this.removeItem(itemId);
		if (!item) return false;

		const slot = item.type === 'weapon' ? 'weapon' : 
					item.type === 'armor' ? 'armor' : null;

		if (!slot) {
			this.addItem(item); // Put it back if it's not equippable
			return false;
		}

		// Unequip current item if any
		if (this.equippedItems[slot]) {
			this.addItem(this.equippedItems[slot]);
		}

		this.equippedItems[slot] = item;
		return true;
	}

	useItem(itemId) {
		const item = this.removeItem(itemId);
		if (!item) return false;

		if (item.type === 'consumable') {
			if (item.healing) {
				this.heal(item.healing);
				return true;
			}
		} else {
			// Put it back if it's not usable
			this.addItem(item);
			return false;
		}
	}

	getInventoryWeight() {
		return this.inventory.length;
	}
}