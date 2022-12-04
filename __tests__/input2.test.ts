import { describe } from "@jest/globals";
import supertest from "supertest";
import app from "../src/app";

describe("POST calculate bill", () => {
  it("Given input 2", async () => {
    const mockRequest = [
      {
        name: "chocolates",
        category: "food",
        price: 10,
        quantity: 1,
        isImported: true,
      },
      {
        name: "perfume",
        category: "others",
        price: 47.5,
        quantity: 1,
        isImported: true,
      },
    ];

    const mockResponse = {
      totalItems: [
        {
          name: "chocolates",
          category: "food",
          price: 10,
          quantity: 1,
          isImported: true,
          priceWithTax: 10.5,
          itemTax: 0.5,
          taxPercentage: 5
        },
        {
          name: "perfume",
          category: "others",
          price: 47.5,
          quantity: 1,
          isImported: true,
          priceWithTax: 54.65,
          itemTax: 7.15,
          taxPercentage: 15
        },
      ],
      totalSalesTax: 7.65,
      totalCost: 65.15,
    };

    const response = await supertest(app).post(`/calculate-bill`).send(mockRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });
});
