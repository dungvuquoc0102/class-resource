import type { Customer } from "../models/Customer";
import { Order, OrderStatus } from "../models/Order";
import { ProductService } from "./ProductService";
import { OrderItem } from "../models/OrderItem";

export class OrderService {
  private orders: Order[] = [];

  constructor(private productService: ProductService) {}

  createOrder(customer: Customer): void {
    const order = new Order(customer);
    this.orders.push(order);
  }

  addProduct(orderId: string, productId: string, quantity: number): void {
    const order = this.findOrder(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }
    const product = this.productService.findById(productId);
    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }
    const orderItem = new OrderItem(product, quantity);
    order.addItem(orderItem);
  }

  removeProduct(orderId: string, productId: string): void {
    const order = this.findOrder(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }
    order.removeItem(productId);
  }

  checkout(orderId: string): void {
    const order = this.findOrder(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }
    if (order.status !== "NEW") {
      throw new Error(`Order with id ${orderId} cannot be checked out`);
    }
    order.status = OrderStatus.PAID;
  }

  cancelOrder(orderId: string): void {
    const order = this.findOrder(orderId);
    if (!order) {
      throw new Error(`Order with id ${orderId} not found`);
    }
    if (order.status === "PAID") {
      throw new Error(`Cannot cancel a paid order`);
    }
    order.status = OrderStatus.CANCELLED;
  }

  findOrder(orderId: string): Order | undefined {
    return this.orders.find((order) => order.id === orderId);
  }

  getOrders() {
    return [...this.orders];
  }

  printOrders() {
    console.log("Order List:");
    this.orders.forEach((order) => {
      console.log(`Order: ${order.id}, Status: ${order.status}`);
    });
  }
}
