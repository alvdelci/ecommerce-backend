const cache = require('../cache');

const get = async (id) => {
    try {
        const cart = await cache.get(id);
        if (!cart) {
            return { code: 404, message: "Cart not found" };
        }
        return { code: 200, message: "success", data: cart };
    } catch (error) {
        return { code: 400, message: "Failed to get cart", error: error.message };
    }
}

const save = async (data) => {
    try {
        const cart = await cache.set(data.customer_id, data);
        return { code: 201, message: "success", data: cart };
    } catch (error) {
        return { code: 400, message: "Failed to register cart", error: error.message };
    }
}

const remove = async (id) => {
    try {
        const cart = await cache.get(id);
        if (!cart) {
            return { code: 404, message: "Cart not found" };
        }
        await cache.remove(id);
        return { code: 200, message: "Cart deleted", data: cart };
    } catch (error) {
        return { code: 400, message: "Failed to delete cart", error: error.message };
    }
}

module.exports = {
    get,
    save,
    remove
}