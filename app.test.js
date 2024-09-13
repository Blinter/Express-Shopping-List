process.env.NODE_ENV = "test";
const request = require('supertest');
const app = require('./app.js');
let items = require("./fakeDb");
let item = { name: "silly", price:200 };
beforeEach(() => {
  items.push(item);
});
afterEach(() => {
  items = [];
});

describe("GET /items", () => {
  test("Gets a list of items", async () => {
    const response = await request(app).get(`/items`);
    const { items } = response.body;
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(1);
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
});

describe("POST /items", () => {
  test("Creates a new item", async () => {
    const response = await request(app)
      .post(`/items`)
      .send({
        name: "Taco",
        price: 0
      });
    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.added).toHaveProperty("name");
    expect(response.body.added).toHaveProperty("price");
    expect(response.body.added.name).toEqual("Taco");
    expect(response.body.added.price).toEqual(0);
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
      name: "Troll"
    });
  });
  test("Responds with 404 if can't find item", async () => {
    const response = await request(app).patch(`/items/0`);
    expect(response.statusCode).toBe(404);
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

