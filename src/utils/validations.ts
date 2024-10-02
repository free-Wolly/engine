// @ts-ignore
const minLengthString = (minLen, value) => value && typeof value === 'string' && value.length >= minLen;
// @ts-ignore
const minValueFloat = (minValue, value) => value && typeof value === 'number' && value >= minValue;

export default {
  password: {
    // @ts-ignore
    validator: ({ password }) => minLengthString(6, password),
    error: 'Password must be equal or more than 6 characters',
  },
  confirmPassword: {
    // @ts-ignore
    validator: ({ password, confirmPassword }) => password === confirmPassword,
    error: 'Password and Confirm Password must be equal',
  },
  email: {
    // @ts-ignore
    validator: ({ email }) => email && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email),
    error: 'Email is invalid',
  },
  mobile: {
    // @ts-ignore
    validator: ({ mobile }) => /^\d{9}$/.test(mobile),
    error: 'Mobile number is invalid',
  },
  name: {
    // @ts-ignore
    validator: ({ name }) => minLengthString(1, name),
    error: 'Name can not be empty',
  },
  firstName: {
    // @ts-ignore
    validator: ({ firstName }) => minLengthString(1, firstName),
    error: 'Firstname can not be empty',
  },
  countryCode: {
    // @ts-ignore
    validator: ({ countryCode }) => minLengthString(1, countryCode),
    error: 'Country Code can not be empty',
  },
  id: {
    // @ts-ignore
    validator: ({ id }) => minLengthString(1, id),
    error: 'Country Code can not be empty',
  },
  price: {
    // @ts-ignore
    validator: ({ price }) => minValueFloat(0, price),
    error: 'Price must be >= 0',
  },
  resetToken: {
    // @ts-ignore
    validator: ({ resetToken }) => minValueFloat(100000, resetToken),
    error: 'Reset token must be a valid 6 digit number',
  },
};
