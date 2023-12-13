enum AuthStrategy {
  LOCAL = 'local',
  CUSTOMERS_NATIVE_LOCAL = 'customers-local', // email & password
  CUSTOMERS_NATIVE_JWT = 'customers-jwt', // email & password
  CUSTOMERS_GOOGLE_OAUTH = 'google', // note: keep value "google" for passport to recognize it.
}

export default AuthStrategy;
