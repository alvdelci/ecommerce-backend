const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../../index");

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

describe("POST /api/cart", () => {
    test("should create a cart and return 201", async () => {
        //create a customer to associate with the cart
        const customer = await request(app).post("/api/customer").send({
            name: "Customer 1",
            email: "customer1@mail.com",
            password: "12345"
        });
        //create a product to associate with the cart
        const product = await request(app).post("/api/product").send({
            name: "Product 1",
            price: 95.90,
            image: "image url",
            stock: 22,
        });
        //create a cart
        const res = await request(app).post("/api/cart").send({
            customer_id: `${customer.body.data._id}`,
            products: [
                {
                    product_id: `${product.body.data._id}`,
                    quantity: 4
                }
            ]
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("success");
    });
});

describe("GET /api/cart/:id", () => {
    test("should return the cart and code 200", async () => {
        //create a customer to associate with the cart
        const customer = await request(app).post("/api/customer").send({
            name: "Customer 1",
            email: "customer1@mail.com",
            password: "12345"
        });
        //create a product to associate with the cart
        const product = await request(app).post("/api/product").send({
            name: "Product 1",
            price: 95.90,
            image: "image url",
            stock: 22,
        });
        //create a cart
        const cart = await request(app).post("/api/cart").send({
            customer_id: `${customer.body.data._id}`,
            products: [
                {
                    product_id: `${product.body.data._id}`,
                    quantity: 4
                }
            ]
        });
        const res = await request(app).get(`/api/cart/${cart.body.data._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("success");
    });

    test("should return cart not found and code 404", async () => {
        const res = await request(app).get(`/api/cart/679133365ff7e8ed5c8ce37a`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Cart not found");
    });
});