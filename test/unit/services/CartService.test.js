const mongoose = require("mongoose");
const CartService = require("../../../src/services/CartService");
const ProductService = require("../../../src/services/ProductService");
const CustomerService = require("../../../src/services/CustomerService");

require("dotenv").config();

/**Open mongodb connection */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST);

    //remove all collection of the databse before each test
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

/**Close mongodb connection */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("Save cart", () => {
    test("should create a cart", async () => {
        //create a customer to associate with the cart
        const customer = await CustomerService.save({
            name: "Customer 1",
            email: "customer1@mail.com",
            password: "12345"
        });
        //create a product to associate with the cart
        const product = await ProductService.save({
            name: "Product 1",
            price: 95.90,
            image: "image url",
            stock: 22,
        });
        //create a cart
        const res = await CartService.save({
            customer_id: `${customer.data._id}`,
            products: [
                {
                    product_id: `${product.data._id}`,
                    quantity: 4
                }
            ]
        });
        expect(res.code).toBe(201);
        expect(res.message).toBe("success");
    });
});

describe("GET a cart", () => {
    test("should return the cart", async () => {
        //create a customer to associate with the cart
        const customer = await CustomerService.save({
            name: "Customer 1",
            email: "customer1@mail.com",
            password: "12345"
        });
        //create a product to associate with the cart
        const product = await ProductService.save({
            name: "Product 1",
            price: 95.90,
            image: "image url",
            stock: 22,
        });
        //create a cart
        const cart = await CartService.save({
            customer_id: `${customer.data._id}`,
            products: [
                {
                    product_id: `${product.data._id}`,
                    quantity: 4
                }
            ]
        });
        const res = await CartService.get(cart.data._id);
        expect(res.code).toBe(200);
        expect(res.message).toBe("success");
    });

    test("should return cart not found", async () => {
        const res = await CartService.get("612b8e5f9f5e4d0c6a4e7b7d");
        expect(res.code).toBe(404);
        expect(res.message).toBe("Cart not found");
    });
});