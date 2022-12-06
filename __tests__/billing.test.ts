import { describe, it, expect } from "@jest/globals";
import supertest from "supertest";
import app from "../src/app";


describe(" Testing => calculate bill API", () => {
    it(" Given mock request, should get mock response scenario 1", async () => {
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
            taxPercentage: 0
          },
          {
            name: "music CD",
            category: "others",
            price: 14.99,
            quantity: 1,
            isImported: false,
            priceWithTax: 16.49,
            itemTax: 1.5,
            taxPercentage: 10
          },
          {
            name: "chocolate bar",
            category: "food",
            price: 0.85,
            quantity: 1,
            isImported: false,
            priceWithTax: 0.85,
            itemTax: 0,
            taxPercentage: 0
          },
        ],
        totalSalesTax: 1.5,
        totalPrice: 29.83,
      };
  
      const response = await supertest(app)
        .post(`/calculate-bill`)
        .send(mockRequest);
  
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });


    it(" Given mock request, should get mock response scenario 2", async () => {
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
          totalPrice: 65.15,
        };
    
        const response = await supertest(app).post(`/calculate-bill`).send(mockRequest);
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockResponse);
      });


      it(" Given mock request, should get mock response scenario 3", async () => {
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
          totalPrice: 74.68,
        };
    
        const response = await supertest(app)
          .post(`/calculate-bill`)
          .send(mockRequest);
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockResponse);
      });

      it(" Given 2 quantity in a item, price with tax should be calculated for total item quantity with tax", async () => {
        const mockRequest = [
          {
            name: "book",
            category: "books",
            price: 12.49,
            quantity: 2,
            isImported: false,
          },
        ];
    
        const mockResponse = {
          totalItems: [
            {
              name: "book",
              category: "books",
              price: 12.49,
              quantity: 2,
              isImported: false,
              priceWithTax: 24.98,
              itemTax: 0,
              taxPercentage: 0,
            },
          ],
          totalSalesTax: 0,
          totalPrice: 24.98,
        };
    
        const response = await supertest(app)
          .post(`/calculate-bill`)
          .send(mockRequest);
    
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockResponse);
      });


      it(" Given wrong item category should return error message", async () => {
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
  