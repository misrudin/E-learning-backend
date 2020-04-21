const authModels = require("../models/auth");
const helpers = require("../helpers/helpers");

module.exports = {
  loginAdmin: (req, res) => {
    const { email, password } = req.body;
    const data = {
      email,
      password,
    };
    authModels
      .loginAdmin(data)
      .then((result) => {
        helpers.response(res, result, 200);
      })
      .catch((err) => helpers.response(res, err, 201));
  },
  loginSiswa: (req, res) => {
    const { nis, password } = req.body;
    const data = {
      nis,
      password,
    };
    authModels
      .loginSiswa(data)
      .then((result) => {
        helpers.response(res, result, 200);
      })
      .catch((err) => helpers.response(res, err, 201));
  },
  loginGuru: (req, res) => {
    const { nip, password } = req.body;
    const data = {
      nip,
      password,
    };
    authModels
      .loginGuru(data)
      .then((result) => {
        helpers.response(res, result, 200);
      })
      .catch((err) => helpers.response(res, err, 201));
  },
};
