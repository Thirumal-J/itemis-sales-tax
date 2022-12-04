import { describe, it, expect } from "@jest/globals";
import supertest from "supertest";
import app from "../src/app";

describe("POST calculate bill", () => {
  it("Given wrong item category should return error message", async () => {
    const mockRequest = [
      {
        name: "perfume",
        category: "perfume",
        price: 27.99,
        quantity: 1,
        isImported: true
      }
    ];

    const mockResponse = {
        errorMsg:"One or more item category is not from the allowed categories"
    };

    const response = await supertest(app)
      .post(`/calculate-bill`)
      .send(mockRequest);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual(mockResponse);
  });
});
