import { describe } from "@jest/globals";
import supertest from "supertest";
import app from "../src/app";

describe("POST calculate bill", () => {
  it("Given input 2", async () => {
    const mockRequest = [
      {
        name: "perfume",
        category: "others",
        price: 27.99,
        quantity: 1,
        isImported: true,
      },
      {
        name: "perfume",
        category: "others",
        price: 18.99,
        quantity: 1,
        isImported: false,
      },
      {
        name: "headache pills",
        category: "medicine",
        price: 9.75,
        quantity: 1,
        isImported: false,
      },
      {
        name: "chocolates",
        category: "food",
        price: 11.25,
        quantity: 1,
        isImported: true,
      },
    ];

    const mockResponse = {
      totalItems: [
        {
          name: "perfume",
          category: "others",
          price: 27.99,
          quantity: 1,
          isImported: true,
          priceWithTax: 32.19,
          itemTax: 4.2,
          taxPercentage: 15
        },
        {
          name: "perfume",
          category: "others",
          price: 18.99,
          quantity: 1,
          isImported: false,
          priceWithTax: 20.89,
          itemTax: 1.9,
          taxPercentage: 10
        },
        {
          name: "headache pills",
          category: "medicine",
          price: 9.75,
          quantity: 1,
          isImported: false,
          priceWithTax: 9.75,
          itemTax: 0,
          taxPercentage: 0
        },
        {
          name: "chocolates",
          category: "food",
          price: 11.25,
          quantity: 1,
          isImported: true,
          priceWithTax: 11.85,
          itemTax: 0.6,
          taxPercentage: 5
        },
      ],
      totalSalesTax: 6.7,
      totalCost: 74.68,
    };

    const response = await supertest(app)
      .post(`/calculate-bill`)
      .send(mockRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });
});
