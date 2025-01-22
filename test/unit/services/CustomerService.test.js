const mongoose = require("mongoose");
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

describe("SAVE Customer", () => {
    test("should create a customer", async () => {
        const res = await CustomerService.save({
            name: "Customer 1",
            email: "customer1@mail.com",
            password: "12345"
        });
        expect(res.code).toBe(201);
        expect(res.message).toBe("success");
    });

    test("should failed to register customer", async () => {
        const res = await CustomerService.save({
            name: "Customer 1", //name is required
            email: "", //email is required
            password: "12345" //password is required
        });
        expect(res.code).toBe(400);
        expect(res.message).toBe("Failed to register customer");
    });
});

describe("GET a customer", () => {
    test("should return the customer", async () => {
        //create a customer to get the id
        const customer = await CustomerService.save({
            name: "Customer 1",
            email: "customer1@mail.com",
            password: "12345"
        });
        const res = await CustomerService.get(customer.data._id);
        expect(res.code).toBe(200);
        expect(res.message).toBe("success");
    });

    test("should return customer not found", async () => {
        const res = await CustomerService.get("60f1b9e3b3b3b32f8c1f4b1d");
        expect(res.code).toBe(404);
        expect(res.message).toBe("Customer not found");
    });
});