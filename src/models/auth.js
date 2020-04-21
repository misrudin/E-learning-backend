const conn = require("../configs/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  loginAdmin: (data) => {
    return new Promise((reslove, reject) => {
      conn.query(
        "SELECT * FROM admin WHERE email =?",
        data.email,
        (err, result) => {
          if (!err) {
            if (result.length > 0) {
              const passwordInput = data.password;
              const passwordHash = result[0].password;
              const id = result[0].id;
              const rule = result[0].rule;
              bcrypt.compare(passwordInput, passwordHash, function (
                err,
                resPass
              ) {
                if (resPass) {
                  const token = jwt.sign({ id, rule }, process.env.PRIVATE_KEY);
                  const result = {
                    token: token,
                  };
                  reslove(result);
                } else {
                  const result = {
                    msg: "Password yang anda masukan salah!",
                  };
                  reslove(result);
                }
              });
            } else {
              const result = {
                msg: "Email Tidak Terdaftar",
              };
              reslove(result);
            }
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  loginSiswa: (data) => {
    return new Promise((reslove, reject) => {
      conn.query(
        "SELECT * FROM siswa WHERE nis =?",
        data.nis,
        (err, result) => {
          if (!err) {
            if (result.length > 0) {
              const passwordInput = data.password;
              const passwordHash = result[0].password;
              const id = result[0].id;
              const rule = result[0].rule;
              bcrypt.compare(passwordInput, passwordHash, function (
                err,
                resPass
              ) {
                if (resPass) {
                  const token = jwt.sign({ id, rule }, process.env.PRIVATE_KEY);
                  const result = {
                    token: token,
                  };
                  reslove(result);
                } else {
                  const result = {
                    msg: "Password yang anda masukan salah!",
                  };
                  reslove(result);
                }
              });
            } else {
              const result = {
                msg: "NIS Tidak Terdaftar",
              };
              reslove(result);
            }
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  loginGuru: (data) => {
    return new Promise((reslove, reject) => {
      conn.query("SELECT * FROM guru WHERE nip =?", data.nip, (err, result) => {
        if (!err) {
          if (result.length > 0) {
            const passwordInput = data.password;
            const passwordHash = result[0].password;
            const id = result[0].id;
            const rule = result[0].rule;
            bcrypt.compare(passwordInput, passwordHash, function (
              err,
              resPass
            ) {
              if (resPass) {
                const token = jwt.sign({ id, rule }, process.env.PRIVATE_KEY);
                const result = {
                  token: token,
                };
                reslove(result);
              } else {
                const result = {
                  msg: "Password yang anda masukan salah!",
                };
                reslove(result);
              }
            });
          } else {
            const result = {
              msg: "NIP Tidak Terdaftar",
            };
            reslove(result);
          }
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
