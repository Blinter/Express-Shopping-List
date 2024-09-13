process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('./app.js');
let items = require("./fakeDb");
let item = { name: "silly", price: 200 };
beforeEach(() => {
  items.push(item);
});
afterEach(() => {
  items.length = 0;
});

describe("GET /items", () => {
  test("Gets a list of items", async () => {
    const response = await request(app).get(`/items`);
    const { items } = response.body;
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
  test("Returns empty array when no items exist", async () => {
    await request(app).delete(`/items/${item.name}`);
    const response = await request(app).get(`/items`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toEqual([]);
  });
  test("Handles large number of items", async () => {
    const largeArray = Array(1000).fill(item);
    items.push(...largeArray);
    const response = await request(app).get(`/items`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1001);
  });
});

describe("GET /items/:name", () => {
  test("Gets a single item", async () => {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });
  test("Responds with 404 if can't find item", async () => {
    const response = await request(app).get(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
  test("Handles case sensitivity correctly", async () => {
    const response = await request(app).get(`/items/${item.name.toUpperCase()}`);
    expect(response.statusCode).toBe(404);
  });
});

describe("POST /items", () => {
  test("Creates a new item", async () => {
    const response = await request(app)
      .post(`/items`)
      .send({
        name: "Taco",
        price: 0
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.added).toHaveProperty("name");
    expect(response.body.added).toHaveProperty("price");
    expect(response.body.added.name).toEqual("Taco");
    expect(response.body.added.price).toEqual(0);
  });

  test("Returns 500 for missing name", async () => {
    const response = await request(app)
      .post(`/items`)
      .send({ price: 100 });
    expect(response.statusCode).toBe(500);
  });
  test("Handles empty string for name", async () => {
    const response = await request(app)
      .post(`/items`)
      .send({ name: "", price: 10 });
    expect(response.statusCode).toBe(404);
  });
  test("Returns OK for a missing price", async () => {
    const response = await request(app)
      .post(`/items`)
      .send({ name: "Pizza" });
    expect(response.statusCode).toBe(200);
  });
  test("Returns 404 for invalid price type", async () => {
    const response = await request(app)
      .post(`/items`)
      .send({ name: "Burger", price: "ten" });
    expect(response.statusCode).toBe(404);
  });
  test("Handles extreme price values", async () => {
    const response = await request(app)
      .post(`/items`)
      .send({ name: "Expensive Item", price: Number.MAX_SAFE_INTEGER + 1 });
    expect(response.statusCode).toBe(404);
  });
});

describe("PATCH /items/:name", () => {
  test("Updates a single item", async () => {
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "Troll"
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.updated).toEqual({
      name: "Troll",
      price: 200,
    });
  });
  test("Responds with 404 if can't find item", async () => {
    const response = await request(app).patch(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
  test("Only updates provided fields", async () => {
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send({ price: 300 });
      console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.updated).toEqual({
      name: item.name,
      price: 300
    });
  });
});

describe("DELETE /items/:name", () => {
  test("Deletes a single a item", async () => {
    const response = await request(app)
      .delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
  });
});

