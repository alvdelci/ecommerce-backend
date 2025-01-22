const mongoose = require("mongoose");
const ProductService = require("../../../src/services/ProductService");

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

describe("SAVE Product", () => {
    test("should create a product", async () => {
        const res = await ProductService.save({
            name: "Product 1",
            price: 95.90,
            image: "image url",
            stock: 22,
        })
        expect(res.code).toBe(201)
    });

    test("should failed to create product", async () => {
        const res = await ProductService.save({
            name: "Product 1", // name is required
            price: 95.90, // price is required
            image: "", // image is required
            stock: 22, // stock is required
        });
        expect(res.code).toBe(400);
        expect(res.message).toBe("Failed to register product");
    });
});

describe("GET a product list", () => {
    test("should list products", async () => {
        //create a product to list
        await ProductService.save({
            name: "Product 1",
            price: 95.90,
            image: "image url",
            stock: 22,
        });
        const res = await ProductService.list();
        expect(res.code).toBe(200);
        expect(res.message).toBe("success");
    });

    test("should return a empty list and products not found", async () => {
        const res = await ProductService.list();
        expect(res.code).toBe(404);
        expect(res.message).toBe("Products not found");
    });
});

describe("GET a product", () => {
    test("should return the product", async () => {
        // Create a product to get the id
        const product = await ProductService.save({
            name: "Product 1",
            price: 95.90,
            image: "image url",
            stock: 22,
        });
        const res = await ProductService.detail(product.data._id);
        expect(res.code).toBe(200);
        expect(res.message).toBe("success");
    });

    test("should return product not found", async () => {
        const res = await ProductService.detail("612b8e5f9f5e4d0c6a4e7b7d");
        expect(res.code).toBe(404);
        expect(res.message).toBe("Product not found");
    });
});