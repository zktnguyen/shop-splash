const cartController = {};

cartController.post = (req, res) => {
  const cart = req.body;
  req.session.cart = cart;
  req.session.save(err => {
    if (err) {
      throw err;
    }
    res.json({
      success: true,
      data: req.session.cart
    });
  });
};

cartController.get = function stupid(req, res) {
  if (
    typeof req.session.cart === 'undefined' ||
    typeof req.session.cart.quantity === 'undefined'
  ) {
    return req.session.destroy(err => res.status(500).json({ message: err }));
  }

  return res.status(200).json({
    success: true,
    data: req.session.cart
  });
};

export default cartController;
