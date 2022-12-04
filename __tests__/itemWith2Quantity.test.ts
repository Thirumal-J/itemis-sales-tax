import { describe } from "@jest/globals";
import supertest from "supertest";
import app from "../src/app";

describe("POST calculate bill", () => {
  it("Given 2 quantity in a item, price with tax should be calculated properly", async () => {
    const mockRequest = [
      {
        name: "book",
        category: "books",
        price: 12.49,
        quantity: 2,
        isImported: false,
      }
    ];

    const mockResponse = {
      "totalItems": [
          {
              "name": "book",
              "category": "books",
              "price": 12.49,
              "quantity": 2,
              "isImported": false,
              "priceWithTax": 24.98,
              "itemTax": 0
          }
      ],
      "totalSalesTax": 0,
      "totalCost": 24.98
  };

    const response = await supertest(app)
      .post(`/calculate-bill`)
      .send(mockRequest);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });
});
