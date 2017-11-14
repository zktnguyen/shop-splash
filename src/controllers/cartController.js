const cartController = {};

cartController.post = (req, res) => {
  const cart = req.body;
  req.session.cart = cart;
  req.session.save(err => {
    if (err) {
      console.log(err);
    }
    return res.json({
      success: true,
      data: req.session.cart
    });
  });
};

cartController.get = function stupid(req, res) {
  if (typeof req.session.cart === 'undefined') {
    return res.status(200).json({
      success: true,
      data: []
    });
  }
  if (
    (req.session.cart.length >= 1 &&
      typeof req.session.cart[0].quantity === 'undefined') ||
    (typeof req.session.cart.id !== 'undefined' &&
      typeof req.session.cart.quantity === 'undefined') ||
    (Object.keys(req.session.cart).length === 0 &&
      req.session.cart.constructor === Object)
  ) {
    return req.session.destroy(err => res.status(500).json({ message: err }));
  }

  return res.status(200).json({
    success: true,
    data: req.session.cart
  });
};

export default cartController;
