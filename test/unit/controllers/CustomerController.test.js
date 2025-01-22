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

describe("POST /api/customer", () => {
    it("should create a customer and return 201", async () => {
        const res = await request(app).post("/api/customer").send({
            name: "Customer 1",
            email: "customer1@mail.com",
            password: "12345"
        });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("success");
    });

    it("should failed to register customer and return 400", async () => {
        const res = await request(app).post("/api/customer").send({
            name: "Customer 1", //name is required
            email: "", //email is required
            password: "12345" //password is required
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Missing required fields");
    });
});

describe("GET /api/customer/:id", () => {
    it("should return the customer and code 200", async () => {
        //create a customer to get the id
        const customer = await request(app).post("/api/customer").send({
            name: "Customer 1",
            email: "customer1@mail.com",
            password: "12345"
        });
        const res = await request(app).get(`/api/customer/${customer.body.data._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe("success");
    });

    it("should return customer not found and code 404", async () => {
        const res = await request(app).get(`/api/customer/67914f4b02373ec8a01f3681`);
        expect(res.statusCode).toBe(404);
        expect(res.body.message).toBe("Customer not found");
    });
});