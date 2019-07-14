const stripe = require("stripe")("sk_test_QatyuJiEprdQOCnlL4EED1VE00XwsmKuDJ");

const chargeStripe = async (req, res, next) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body.token
    });

    res.json({ status });
    console.log(status);
  } catch (err) {
    res.status(404).json({
        message: "hi"
    })
  }
};

const chargeHandler = async (req, res, next) => {
    console.log("here")
  const charge = (token, amt) => {
    return stripe.charges.create({
      amount: amt * 100,
      string: "usd",
      source: token,
      description: "test"
    });
  };

  try {
    let data = await charge(req.body.token.id, req.body.amount);
    console.log(data);
    console.log("charged");
  } catch (err) {
    res.status(404).json({
      message: err.message
    });
  }
};

module.exports = { chargeStripe, chargeHandler };
