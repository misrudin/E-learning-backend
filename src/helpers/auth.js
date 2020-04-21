const jwt = require("jsonwebtoken");

module.exports = {
  verify: (req, res, next) => {
    try {
      const token = req.headers["token"];
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      next();
    } catch (err) {
      res.json({
        msg: "Token infalid, Please Login!",
      });
    }
  },
};
