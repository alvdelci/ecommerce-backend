const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../../index");

require("dotenv").config();

/**Open mongodb connection */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST);
    //Remove all collection of the databse before each test
    const collections = await mongoose.connection.db.collections();
    for (const collection of collections) {
        await collection.deleteMany({});
    }
});

/**Close mongodb connection */
afterEach(async () => {
    await mongoose.connection.close();
});

describe("POST /api/product", () => {
    test("should create a product and return 201", async () => {
        const res = await request(app).post("/api/product").send({
            name: "Product 1",
            price: 95.90,
            image: "image url",
            stock: 22,
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("success");
    });

    test("should failed to register product and return 400", async () => {
        const res = await request(app).post("/api/product").send({
            name: "Product 1",
            price: 95.90,
            image: "", // image is required
            stock: 22,
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Missing required fields");
    });
});

describe("GET /api/product", () => {
    test("should list products and return 200", async () => {
        //create a product to list
        await request(app).post("/api/product").send({
            name: "Product 1",
            price: 95.90,
            image: "image url",
            stock: 22,
        });
        const res = await request(app).get("/api/product");
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("success");
    });

    test("should return a empty list and products not found", async () => {
        const res = await request(app).get("/api/product");
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Products not found");
    });
});

describe("GET /api/product/:id", () => {
    test("should return the product and code 200", async () => {
        // Create a product to get the id
        const product = await request(app).post("/api/product").send({
            name: "Product 1",
            price: 95.90,
            image: "image url",
            stock: 22,
        });
        const res = await request(app).get(`/api/product/${product.body.data._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("success");
    });

    test("should return product not found and code 404", async () => {
        const res = await request(app).get(`/api/product/612b8e5f9f5e4d0c6a4e7b7d`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Product not found");
    });
});