import type { Customer } from "../models/Customer";

interface CustomerServiceI {
  addCustomer(customer: Customer): void;
  updateCustomer(id: string, data: Partial<Customer>): void;
  deleteCustomer(id: string): void;
  findById(id: string): Customer | undefined;
  findByPhone(phone: string): Customer | undefined;
  getAllCustomers(): Customer[];
  printCustomers(): void;
}

export class CustomerService implements CustomerServiceI {
  private customers: Customer[] = [];

  addCustomer(customer: Customer): void {
    const existingCustomer = this.findById(customer.id);
    if (existingCustomer) {
      throw new Error(`Customer with id ${customer.id} already exists`);
    }
    this.customers.push(customer);
  }

  updateCustomer(id: string, data: Partial<Customer>): void {
    const customer = this.findById(id);
    if (!customer) {
      throw new Error(`Customer with id ${id} not found`);
    }
    if (data.name) {
      customer.name = data.name;
    }
    if (data.phone) {
      customer.updatePhone(data.phone);
    }
    if (data.address) {
      customer.updateAddress(data.address);
    }
  }

  deleteCustomer(id: string) {
    this.customers = this.customers.filter((customer) => customer.id !== id);
  }

  findById(id: string): Customer | undefined {
    return this.customers.find((customer) => customer.id === id);
  }

  findByPhone(phone: string): Customer | undefined {
    return this.customers.find((customer) => customer.phone === phone);
  }

  getAllCustomers(): Customer[] {
    return [...this.customers];
  }

  printCustomers(): void {
    console.log("Customer List:");
    this.customers.forEach((customer) => {
      console.log(customer.toString());
    });
  }
}
