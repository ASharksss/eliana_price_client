export const IBasketItems = (productVendorCode, count) => {
  return {
    productVendorCode, count
  }
}

export const IBasketItemPrice = (productVendorCode, price) => {
  return {
    productVendorCode, price
  }
}

export const IOrder = (order, formOrg, nameOrg) => {
  return {
    order, formOrg,nameOrg
  }
}