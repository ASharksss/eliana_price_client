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

export const IOrder = (order, formOrg, nameOrg, generalCount, paymentType) => {
  return {
    order, formOrg,nameOrg, generalCount, paymentType
  }
}

export const IUserLogin = (email, password) => ({email, password})

