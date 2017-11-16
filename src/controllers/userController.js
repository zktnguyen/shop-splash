import User from '../models/user';

const userController = {};

userController.post = (req, res) => {
  const { email, password } = req.body;

  const user = new User({
    email
  });

  user.setPassword(password);
  user
    .save()
    .then(newUser => {
      res.status(200).json({
        success: true,
        data: newUser.toAuthJSON()
      });
    })
    .catch(err => res.status(500).json({ message: err }));
};

export default userController;
