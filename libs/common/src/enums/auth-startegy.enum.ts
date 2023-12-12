enum AuthStrategy {
  LOCAL = 'local',
  CUSTOMERS_PHONE = 'PHONE', // phone & otp
  CUSTOMERS_NATIVE = 'NATIVE', // email & password
  CUSTOMERS_GOOGLE_OAUTH = 'google', // note: keep value "google" for passport to recognize it.
}

export default AuthStrategy;
