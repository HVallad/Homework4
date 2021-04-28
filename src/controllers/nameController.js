const NameService = require('../services/nameService');

exports.getNames = async (req, res) => {
  const queryForThis = req.query.Name || '';
  const names = await NameService.getNames(queryForThis);

  return res.status(200).json({ status: 200, data: names === undefined ? {} : names, message: 'Successfully Retrieved Users' });
};

exports.createName = async (req, res) => {
  const backURL = req.header('Referer') || '/';
  await NameService.createName({ Name: req.body.Name });
  res.redirect(backURL);
};
