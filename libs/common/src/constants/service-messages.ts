// eslint-disable-next-line @typescript-eslint/naming-convention
export const ServiceMessages = {
  auth: {
    admins: {},
    customers: {
      signupByEmail: 'signupCustomerByEmail',
      loginByEmail: 'customerNativeLogin',
      signupByPhone: 'signupCustomerByPhone',
      loginByPhone: 'loginCustomerByPhone',
      IDPsignin: 'customerIdpSignin',
    },
  },
} as const;
