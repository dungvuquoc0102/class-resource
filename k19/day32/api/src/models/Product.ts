import { v7 as uuidv7 } from "uuid";

export class Product {
  private _id: string = uuidv7();

  constructor(
    private _name: string,
    private _price: number,
    private _stock: number,
  ) {}

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get price(): number {
    return this._price;
  }
  get stock(): number {
    return this._stock;
  }

  set name(name: string) {
    this._name = name;
  }
  set price(price: number) {
    if (price < 0) {
      throw new Error("Price cannot be negative");
    }
    this._price = price;
  }

  increaseStock(quantity: number): void {
    if (quantity < 0) {
      throw new Error("Quantity cannot be negative");
    }
    this._stock += quantity;
  }

  decreaseStock(quantity: number): void {
    if (quantity < 0) {
      throw new Error("Quantity cannot be negative");
    }
    if (this._stock - quantity < 0) {
      throw new Error("Insufficient stock");
    }
    this._stock -= quantity;
  }

  toString() {
    return `Product [id=${this._id}, name=${this._name}, price=${this._price}, stock=${this._stock}]`;
  }
}
