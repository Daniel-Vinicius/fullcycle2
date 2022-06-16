import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for customer", () => {
	beforeEach(async () => {
		await sequelize.sync({ force: true });
	});

	afterAll(async () => {
		await sequelize.close();
	});

	const address = {
		street: "123 Main St",
		city: "Anytown",
		number: 123,
		zip: "12345",
	};

	it("should create a customer", async () => {
		const response = await request(app)
			.post("/customer")
			.send({ name: "John Doe", address });

		expect(response.status).toEqual(201);
		expect(response.body).toHaveProperty("id");
		expect(response.body.name).toEqual("John Doe");
		expect(response.body.address).toEqual(address);
	});

	it("should not create a customer when name is not provided", async () => {
		const response = await request(app)
			.post("/customer")
			.send({ name: "", address });

		expect(response.status).toEqual(400);
	});

	it("should list all customers", async () => {
		await request(app).post("/customer").send({ name: "John Doe", address });
		await request(app).post("/customer").send({ name: "Jane Doe", address });

		const response = await request(app).get("/customer").send();
		const customer1 = response.body.customers[0];
		const customer2 = response.body.customers[1];

		expect(response.status).toEqual(200);
		expect(response.body.customers.length).toEqual(2);

		expect(customer1.name).toEqual("John Doe");
		expect(customer2.name).toEqual("Jane Doe");
	});

	it("should list all customers in XML", async () => {
		const customer1 = await request(app).post("/customer").send({ name: "John Doe", address });
		const customer2 = await request(app).post("/customer").send({ name: "Jane Doe", address });

		const responseXML = await request(app)
			.get("/customer")
			.set("Accept", "application/xml")
			.send();

		expect(responseXML.status).toEqual(200);
		expect(responseXML.text).toContain("<?xml version=\"1.0\" encoding=\"UTF-8\"?>");

		expect(responseXML.text)
			.toMatchInlineSnapshot(`
		"<?xml version=\\"1.0\\" encoding=\\"UTF-8\\"?>
		<customers>
		 <customer>
		  <id>${customer1.body.id}</id>
		  <name>${customer1.body.name}</name>
		  <address>
		   <street>123 Main St</street>
		   <number>123</number>
		   <zip>12345</zip>
		   <city>Anytown</city>
		  </address>
		  <id>${customer2.body.id}</id>
		  <name>${customer2.body.name}</name>
		  <address>
		   <street>123 Main St</street>
		   <number>123</number>
		   <zip>12345</zip>
		   <city>Anytown</city>
		  </address>
		 </customer>
		</customers>"
	`);
	});
});
