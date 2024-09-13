const items = require("./fakeDb");

class Item {
    static getAll = () => items;
    constructor(name, price) {
        if (name === "" ||
            (name.length > 0 && name.replace(" ", "").length === 0))
            throw { message: "Name not valid", status: 404 }
        if (price !== undefined &&
            (isNaN(price) || parseInt(price) > Number.MAX_SAFE_INTEGER))
            throw { message: "Price not valid", status: 404 }
        if (items.length > 0 &&
            items.findIndex(item => item.name === name) !== -1) {
            throw { message: "Item contained in shopping list already" }
        }
        this.name = name;
        if (price !== undefined)
            this.price = 0
        else
            this.price = parseInt(price);
        items.push(this);
    }

    static getIndex = name => {
        if (name.length === 0 ||
            (name && name.replace(" ", "").length === 0))
            throw { message: "Invalid name", status: 404 }
        const itemIndex = items.findIndex(item => item.name === name);
        if (itemIndex === -1)
            throw { message: "Item not found", status: 404 }
        return itemIndex;
    }

    static get = name => items[this.getIndex(name)];

    static update(name, data) {
        if (data == null ||
            (data.price === undefined &&
                data.name === undefined))
            throw { message: "Invalid data to update for item", status: 404 }
        let foundItem = this.get(name);
        const foundItemIndex = this.getIndex(name);
        if (data.price !== undefined &&
            (isNaN(data.price) || parseInt(data.price) > Number.MAX_SAFE_INTEGER))
            throw { message: "Price not valid", status: 404 }
        if (data.name === "" ||
            (data.name && data.name.replace(" ", "").length === 0))
            throw { message: "Invalid Name update", status: 404 }
        else if (items.findIndex((item, idx) => idx !== foundItemIndex && item.name === foundItem.name) !== -1)
            throw { message: "Name exists already in the list", status: 404 }
        if (data.price !== undefined) {
            foundItem.price = parseInt(data.price);
        }
        if (data.name !== undefined) {
            foundItem.name = data.name;
        }
        return foundItem;
    }

    static remove = name => items.splice(this.get(name), 1);
}

module.exports = Item;
