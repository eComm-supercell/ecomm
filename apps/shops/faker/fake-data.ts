import { ShopStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

export function fakeProfile() {
  return {
    dateOfBirth: undefined,
    mobile: undefined,
    gender: undefined,
    addressId: undefined,
  };
}
export function fakeProfileComplete() {
  return {
    id: faker.datatype.number(),
    dateOfBirth: undefined,
    mobile: undefined,
    gender: undefined,
    addressId: undefined,
    userId: faker.datatype.number(),
  };
}
export function fakeUser() {
  return {
    emailVerifiedAt: undefined,
    email: undefined,
    username: undefined,
    lname: undefined,
    fname: undefined,
    password: undefined,
    provider: undefined,
    providerId: undefined,
    shopId: undefined,
  };
}
export function fakeUserComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    emailVerifiedAt: undefined,
    email: undefined,
    username: undefined,
    lname: undefined,
    fname: undefined,
    password: undefined,
    provider: undefined,
    providerId: undefined,
    rewardPoints: 0,
    role: 'customer',
    shopId: undefined,
    deliveryBoyId: undefined,
    walletId: faker.datatype.number(),
  };
}
export function fakeDeliveryBoy() {
  return {
    name: undefined,
    email: undefined,
    mobile: undefined,
    suspendReason: undefined,
    suspendDate: undefined,
    depitThreshold: undefined,
    userId: undefined,
  };
}
export function fakeDeliveryBoyComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    name: undefined,
    email: undefined,
    mobile: undefined,
    status: 'active',
    suspendReason: undefined,
    suspendDate: undefined,
    depitThreshold: undefined,
    userId: undefined,
  };
}
export function fakeWalletComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    amount: 0,
  };
}
export function fakeWalletTransaction() {
  return {
    amount: undefined,
  };
}
export function fakeWalletTransactionComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    amount: undefined,
    walletId: undefined,
  };
}
export function fakeUcode() {
  return {
    code: faker.lorem.words(5),
    email: faker.internet.email(),
    dateExpired: undefined,
  };
}
export function fakeUcodeComplete() {
  return {
    id: faker.datatype.number(),
    code: faker.lorem.words(5),
    email: faker.internet.email(),
    dateExpired: undefined,
  };
}
export function fakeCity() {
  return {
    name: faker.name.fullName(),
    deleviryFee: undefined,
    deleviryTime: undefined,
  };
}
export function fakeCityComplete() {
  return {
    id: faker.datatype.number(),
    name: faker.name.fullName(),
    deleviryFee: undefined,
    deleviryTime: undefined,
    provinceId: undefined,
  };
}
export function fakeProvince() {
  return {
    name: faker.name.fullName(),
    deleviryFee: faker.datatype.hexadecimal(),
    deleviryTime: faker.datatype.number(),
  };
}
export function fakeProvinceComplete() {
  return {
    id: faker.datatype.number(),
    name: faker.name.fullName(),
    deleviryFee: faker.datatype.hexadecimal(),
    deleviryTime: faker.datatype.number(),
  };
}
export function fakeAddress() {
  return {
    street: faker.address.streetAddress(),
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
    buildingNo: faker.datatype.number(),
    floorNo: faker.datatype.number(),
    apartmentNo: faker.datatype.number(),
  };
}
export function fakeAddressComplete() {
  return {
    id: faker.datatype.number(),
    street: undefined,
    cityId: undefined,
    provinceId: faker.datatype.number(),
    latitude: undefined,
    longitude: undefined,
    buildingNo: undefined,
    floorNo: undefined,
    apartmentNo: undefined,
    profileId: faker.datatype.number(),
  };
}
export function fakeCategory() {
  return {
    parentId: undefined,
    categoryLink: undefined,
    name: faker.name.fullName(),
    slug: faker.lorem.words(5),
  };
}
export function fakeCategoryComplete(name: string) {
  return {
    parentId: undefined,
    categoryLink: undefined,
    sortOrder: 0,
    authorId: undefined,
    published: true,
    name: name,
    slug: `slug-${name}`,
  };
}
export function fakeTag() {
  return {
    title: faker.lorem.words(5),
    slug: faker.lorem.words(5),
  };
}
export function fakeTagComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: faker.lorem.words(5),
    slug: faker.lorem.words(5),
  };
}
export function fakeProduct() {
  return {
    sku: faker.lorem.words(5),
    barCode: undefined,
    name: faker.name.fullName(),
    slug: undefined,
    metaTitle: undefined,
    metaDescription: undefined,
    metaKeyword: undefined,
    price: faker.datatype.hexadecimal(),
    quantity: undefined,
    brand: undefined,
    description: undefined,
    availableFrom: undefined,
    availableTo: undefined,
    keywords: undefined,
  };
}
export function fakeProductComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    sku: faker.lorem.words(5),
    barCode: undefined,
    name: faker.name.fullName(),
    slug: undefined,
    metaTitle: undefined,
    metaDescription: undefined,
    metaKeyword: undefined,
    defaultVariant: 0,
    isSale: false,
    price: faker.datatype.hexadecimal(),
    quantity: undefined,
    isWholeSale: false,
    trackQuantity: true,
    allowOutOfStockPurchases: false,
    brand: undefined,
    description: undefined,
    published: true,
    authorId: faker.datatype.number(),
    shopId: undefined,
    availableFrom: undefined,
    availableTo: undefined,
    isFeatured: false,
    isBestSeller: false,
    isTopRated: false,
    isSpecialOffer: false,
    isAvliable: true,
    keywords: undefined,
  };
}
export function fakewholesalePrice() {
  return {
    price: undefined,
    quantity: undefined,
  };
}
export function fakewholesalePriceComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    productId: undefined,
    price: undefined,
    quantity: undefined,
  };
}
export function fakeInventoryLog() {
  return {
    quantity: undefined,
    status: undefined,
  };
}
export function fakeInventoryLogComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    productId: undefined,
    productvariantId: undefined,
    quantity: undefined,
    status: undefined,
  };
}
export function fakeProductVariant() {
  return {
    price: undefined,
    discount: undefined,
    quantity: undefined,
    sku: undefined,
    barcode: undefined,
  };
}
export function fakeProductVariantComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    productId: undefined,
    price: undefined,
    discount: undefined,
    quantity: undefined,
    sku: undefined,
    barcode: undefined,
    status: 0,
    sortOrder: 0,
  };
}
export function fakeProductImage() {
  return {
    orginal: undefined,
    thumbnail: undefined,
    medium: undefined,
    large: undefined,
    altText: undefined,
  };
}
export function fakeProductImageComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    orginal: undefined,
    thumbnail: undefined,
    medium: undefined,
    large: undefined,
    altText: undefined,
    productId: faker.datatype.number(),
    status: 0,
    sortOrder: 0,
  };
}
export function fakeProductVariantImage() {
  return {
    orginal: undefined,
    thumbnail: undefined,
    medium: undefined,
    large: undefined,
    altText: undefined,
  };
}
export function fakeProductVariantImageComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    orginal: undefined,
    thumbnail: undefined,
    medium: undefined,
    large: undefined,
    altText: undefined,
    productVariantId: faker.datatype.number(),
    status: 0,
    sortOrder: 0,
  };
}
export function fakeShopComplete(lat: number, lng: number) {
  return {
    status: ShopStatus.active,
    shopDetails: {
      create: {
        displayName: faker.company.name(),
        name: 'Shop 1',
        phone: faker.phone.number('+964##########'),
        email: faker.internet.email(),
        description: faker.lorem.words(5),
        logo: faker.image.imageUrl(),
        latitute: lat,
        longitute: lng,
        cityId: 1,
        provinceId: 1,
      },
    },
  };
}
export function fakeShopDetails() {
  return {
    displayName: undefined,
    name: undefined,
    phone: undefined,
    email: undefined,
    description: undefined,
    logo: undefined,
    shopId: undefined,
    latitute: undefined,
    longitute: undefined,
  };
}
export function fakeShopDetailsComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    displayName: undefined,
    name: undefined,
    phone: undefined,
    email: undefined,
    description: undefined,
    logo: undefined,
    shopId: undefined,
    latitute: undefined,
    longitute: undefined,
    addressId: faker.datatype.number(),
  };
}
export function fakeOrder() {
  return {
    orderId: faker.lorem.words(5),
    orderItemId: faker.lorem.words(5),
    price: faker.datatype.hexadecimal(),
    delivery_fee: undefined,
    discount: undefined,
    total: faker.lorem.words(5),
    paymentMode: faker.lorem.words(5),
    paymentStatus: faker.lorem.words(5),
    status: undefined,
    comment: undefined,
  };
}
export function fakeOrderComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    orderId: faker.lorem.words(5),
    orderItemId: faker.lorem.words(5),
    price: faker.datatype.hexadecimal(),
    delivery_fee: undefined,
    discount: undefined,
    total: faker.lorem.words(5),
    paymentMode: faker.lorem.words(5),
    paymentStatus: faker.lorem.words(5),
    status: undefined,
    comment: undefined,
    addressId: undefined,
    userId: undefined,
    paymentDetailsId: undefined,
  };
}
export function fakeOrderItem() {
  return {
    quantity: faker.datatype.number(),
    price: faker.datatype.hexadecimal(),
    orderItemId: faker.lorem.words(5),
    shopOrderId: undefined,
  };
}
export function fakeOrderItemComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    quantity: faker.datatype.number(),
    price: faker.datatype.hexadecimal(),
    orderItemId: faker.lorem.words(5),
    productId: faker.datatype.number(),
    orderId: faker.datatype.uuid(),
    shopOrderId: undefined,
  };
}
export function fakeSubOrderItem() {
  return {
    quantity: faker.datatype.number(),
    price: faker.datatype.hexadecimal(),
    subOrderId: undefined,
  };
}
export function fakeSubOrderItemComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    quantity: faker.datatype.number(),
    price: faker.datatype.hexadecimal(),
    subOrderId: undefined,
    productId: faker.datatype.number(),
  };
}
export function fakePaymentDetails() {
  return {
    orderId: faker.datatype.number(),
    amount: faker.datatype.number(),
    provider: undefined,
    status: undefined,
  };
}
export function fakePaymentDetailsComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    orderId: faker.datatype.number(),
    amount: faker.datatype.number(),
    provider: undefined,
    status: undefined,
  };
}
export function fakecart() {
  return {
    quantity: faker.datatype.number(),
  };
}
export function fakecartComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    quantity: faker.datatype.number(),
    productId: faker.datatype.number(),
    userId: faker.datatype.number(),
  };
}
export function fakeApiKey() {
  return {
    key: faker.lorem.words(5),
  };
}
export function fakeApiKeyComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    key: faker.lorem.words(5),
  };
}
export function fakeSystemConfig() {
  return {
    startHour: faker.lorem.words(5),
    endHour: faker.lorem.words(5),
    pricePerKm: faker.datatype.hexadecimal(),
    minOrderAmount: faker.datatype.hexadecimal(),
    forceCloseMessage: faker.lorem.words(5),
  };
}
export function fakeSystemConfigComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    startHour: faker.lorem.words(5),
    endHour: faker.lorem.words(5),
    pricePerKm: faker.datatype.hexadecimal(),
    minOrderAmount: faker.datatype.hexadecimal(),
    forceClose: false,
    allowGuestCheckout: false,
    mobileAppConfigId: faker.datatype.number(),
    forceCloseMessage: faker.lorem.words(5),
  };
}
export function fakeMobileAppConfig() {
  return {
    appVersion: faker.lorem.words(5),
  };
}
export function fakeMobileAppConfigComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    retailLayout: {},
    resturantLayout: {},
    appConfig: {},
    appVersion: faker.lorem.words(5),
  };
}
export function fakeNotification() {
  return {
    title: faker.lorem.words(5),
    body: faker.lorem.words(5),
    type: faker.lorem.words(5),
  };
}
export function fakeNotificationComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    title: faker.lorem.words(5),
    body: faker.lorem.words(5),
    type: faker.lorem.words(5),
    userId: faker.datatype.number(),
    isRead: false,
    isDeleted: false,
  };
}
export function fakeNotificationToken() {
  return {
    token: faker.lorem.words(5),
  };
}
export function fakeNotificationTokenComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    token: faker.lorem.words(5),
    userId: faker.datatype.number(),
  };
}
export function fakeAuditLog() {
  return {
    action: faker.lorem.words(5),
    entity: faker.lorem.words(5),
    entityId: faker.datatype.number(),
    query: faker.lorem.words(5),
    userId: faker.datatype.number(),
  };
}
export function fakeAuditLogComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    action: faker.lorem.words(5),
    entity: faker.lorem.words(5),
    entityId: faker.datatype.number(),
    query: faker.lorem.words(5),
    userId: faker.datatype.number(),
  };
}
export function fakeCoupon() {
  return {
    code: faker.lorem.words(5),
    type: faker.lorem.words(5),
    value: undefined,
    maxDiscount: undefined,
    minOrderAmount: undefined,
    maxUsage: undefined,
    usageCount: undefined,
    applyFor: undefined,
    categoryId: undefined,
    productId: undefined,
    shopId: undefined,
    startDate: undefined,
    endDate: undefined,
  };
}
export function fakeCouponComplete() {
  return {
    id: faker.datatype.number(),
    createdAt: new Date(),
    updatedAt: new Date(),
    code: faker.lorem.words(5),
    type: faker.lorem.words(5),
    isReferral: false,
    referrerId: undefined,
    value: undefined,
    maxDiscount: undefined,
    minOrderAmount: undefined,
    maxUsage: undefined,
    usageCount: undefined,
    applyFor: undefined,
    categoryId: undefined,
    productId: undefined,
    shopId: undefined,
    startDate: undefined,
    endDate: undefined,
    isActive: true,
    isDeleted: false,
  };
}
