/* eslint-disable no-console */
/* eslint-disable max-len */

const userService = require('../services/user.service');

const findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUser(id);
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const user = await userService.list();
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name, email, code, picture, roleId,
    } = req.body;
    await userService.update(id, name, email, code, picture, roleId);
    return res.status(200).send('success');
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  findOne,
  list,
  update,
};
