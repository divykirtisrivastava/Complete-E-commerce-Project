
const Razorpay = require('razorpay');

const crypto = require('crypto');


const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});
console.log( process.env.RAZORPAY_KEY_SECRET)
console.log( process.env.RAZORPAY_KEY_ID)
exports.createOrder =  async (req, res) => {
  const { amount, currency, receipt } = req.body;
console.log(req.body)
  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency,
    receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log(order)
    res.json(order);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong' });
  }
}

exports.verifyPayment =  (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  console.log(razorpay_order_id)
  console.log(razorpay_payment_id)
  console.log(razorpay_signature)

  const body = razorpay_order_id + '|' + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac('sha256',  process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === razorpay_signature) {
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failure' });
  }
}

