import path from 'path';

const fs = require('fs');

const imageController = {};

imageController.get = (req, res) => {
  const imgFolder = path.join(__dirname, '../../client/public/images/');
  const filesArr = [];
  fs.readdir(imgFolder, (err, files) => {
    if (err) {
      console.error(err);
    }

    files.forEach(file => filesArr.push({ name: file }));
    return res.status(200).json({ success: true, data: filesArr });
  });
  return 0;
};

export default imageController;
