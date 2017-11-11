import Book from '../models/item';

const bookController = {};

bookController.post = (req, res) => {
  const { title, description, image, price } = req.body;

  const book = new Book({
    title,
    description,
    image,
    price
  });

  book
    .save()
    .then(newBook => {
      res.status(200).json({
        success: true,
        data: newBook
      });
    })
    .catch(err => res.status(500).json({ message: err }));
};

bookController.getAll = (req, res) => {
  Book
    .find({})
    .then(posts =>
      res.status(200).json({
        success: true,
        data: posts
      })
    )
    .catch(err => {
      res.status(500).json({
        message: err.toString()
      });
    });
};

bookController.remove = (req, res) => {
  const query = { _id: req.params._id };

  Book
    .remove(query)
    .then(removedBook =>
      res.status(200).json({
        success: true,
        data: removedBook
      })
    )
    .catch(err => {
      res.status(500).json({
        message: err.toString()
      });
    });
};

bookController.update = (req, res) => {
  const { title, description, image, price } = req.body;

  const query = req.params._id;
  const update = {
    $set: {
      title,
      description,
      image,
      price
    }
  };

  const options = { new: true };

  Book
    .findOneAndUpdate(query, update, options)
    .then(updatedBook =>
      res.status(200).json({
        success: true,
        data: updatedBook
      })
    )
    .catch(err =>
      res.status(500).json({
        message: err.toString()
      })
    );
};

export default bookController;
