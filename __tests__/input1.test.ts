import { describe } from "@jest/globals";
import supertest from "supertest";
import app from "../src/app";

describe("POST calculate bill", () => {
  it("Given input 1", async () => {
    const mockRequest = [
      {
        name: "book",
        category: "books",
        price: 12.49,
        quantity: 1,
        isImported: false,
      },
      {
        name: "music CD",
        category: "others",
        price: 14.99,
        quantity: 1,
        isImported: false,
      },
      {
        name: "chocolate bar",
        category: "food",
        price: 0.85,
        quantity: 1,
        isImported: false,
      },
    ];

    const mockResponse = {
      totalItems: [
        {
          name: "book",
          category: "books",
          price: 12.49,
          quantity: 1,
          isImported: false,
          priceWithTax: 12.49,
          itemTax: 0,
        },
        {
          name: "music CD",
          category: "others",
          price: 14.99,
          quantity: 1,
          isImported: false,
          priceWithTax: 16.49,
          itemTax: 1.5,
        },
        {
          name: "chocolate bar",
          category: "food",
          price: 0.85,
          quantity: 1,
          isImported: false,
          priceWithTax: 0.85,
          itemTax: 0,
        },
      ],
      totalSalesTax: 1.5,
      totalCost: 29.83,
    };

    const response = await supertest(app)
      .post(`/calculate-bill`)
      .send(mockRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });
});
