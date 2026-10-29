"use strict";
// const string: string = "10";
function addItem(cart, item) {
    if (item.quantity <= 0 ||
        item.unitPrice < 0 ||
        item.productId === "" ||
        item.name === "") {
        throw new Error("Invalid item");
    }
    const existedItem = cart.items.find((i) => i.productId === item.productId);
    if (existedItem) {
        existedItem.quantity += item.quantity;
        return {
            ...cart,
        };
    }
    return {
        ...cart,
        items: [...cart.items, item],
    };
}
function subTotal(cart) {
    return cart.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
}
function discount(cart) {
    if (cart.couponCode === "SALE10") {
        return Math.round(subTotal(cart) * 0.1);
    }
    return 0;
}
function shippingFee(cart) {
    if (subTotal(cart) >= 500000) {
        return 0;
    }
    return 30000;
}
function formatMoney(value) {
    return `${value.toLocaleString("vi-VN")}₫`;
}
function priceRange(cart) {
    if (cart.items.length === 0) {
        throw new Error("Cart is empty");
    }
    const min = Math.min(...cart.items.map((item) => item.unitPrice));
    const max = Math.max(...cart.items.map((item) => item.unitPrice));
    return [min, max];
}
async function validateCoupon(code) {
    const response = await new Promise((resolve) => {
        const cleanCode = code.trim().toUpperCase();
        setTimeout(() => {
            if (cleanCode === "SALE10") {
                resolve(true);
            }
            else {
                resolve(false);
            }
        }, 500);
    });
    return response;
}
function renderInvoice(cart) {
    let invoiceString = `
-----------------------------------------------------
|   Tên sản phẩm  | Số lượng | Đơn giá  | Thành tiền |
-----------------------------------------------------
${cart.items.map((item) => `| ${item.name}${" ".repeat(15 - item.name.length)} | ${item.quantity}${" ".repeat(8 - item.quantity.toString().length)} | ${formatMoney(item.unitPrice)}${" ".repeat(8 - formatMoney(item.unitPrice).length)} | ${formatMoney(item.unitPrice * item.quantity)}${" ".repeat(10 - formatMoney(item.unitPrice * item.quantity).length)} |`).join("\n-----------------------------------------------------\n")}
-----------------------------------------------------
| Tạm tính                              | ${formatMoney(subTotal(cart))}${" ".repeat(10 - formatMoney(subTotal(cart)).length)} |
-----------------------------------------------------
| Giảm giá                              | ${formatMoney(discount(cart))}${" ".repeat(10 - formatMoney(discount(cart)).length)} |
-----------------------------------------------------
| Phí vận chuyển                        | ${formatMoney(shippingFee(cart))}${" ".repeat(10 - formatMoney(shippingFee(cart)).length)} |
-----------------------------------------------------
| Tổng cộng                             | ${formatMoney(subTotal(cart) - discount(cart) + shippingFee(cart))}${" ".repeat(10 - formatMoney(subTotal(cart) - discount(cart) + shippingFee(cart)).length)} |
-----------------------------------------------------
  `;
    return invoiceString;
}
const cart = {
    cartId: "cart-1",
    currency: "VND",
    items: [],
    couponCode: "SALE10",
};
const newCart = addItem(cart, {
    productId: "product-1",
    name: "Áo thun",
    unitPrice: 200000,
    quantity: 2,
});
const newCart2 = addItem(newCart, {
    productId: "product-2",
    name: "Quần jean",
    unitPrice: 500000,
    quantity: 1,
});
console.log(renderInvoice(newCart2));
