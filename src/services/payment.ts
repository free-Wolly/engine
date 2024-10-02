import Stripe from 'stripe';

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_TEST_KEY, { apiVersion: '2020-08-27' });

// @ts-ignore
export default (amount) =>
  stripe.charges.create({
    amount: amount * 100,
    currency: 'gel',
    source: 'tok_mastercard',
    description: 'დასუფთავების სერვისის საფასური',
  });
