const mapelmodels = require("../models/mapel");
const helpers = require("../helpers/helpers");
const conn = require("../configs/db");

module.exports = {
  getmapel: (req, res) => {
    const { page, key } = req.query;
    if (!page) {
      mapelmodels
        .getmapel()
        .then((result) => {
          helpers.response(res, result, 200);
        })
        .catch((err) => console.log(err));
    } else if (key) {
      conn.query(
        "SELECT COUNT(*) as total FROM mapel where nama_mapel like ?",
        "%" + key + "%",
        (err, result) => {
          const total = result[0].total;
          if (total > 0) {
            if (page > 0) {
              mapelmodels
                .pagination(key, page, total)
                .then((result) => {
                  helpers.response(res, result, 200);
                })
                .catch((err) => console.log(err));
            }
          } else {
            helpers.response(res, [1, "Curren Page: 1", []], 200);
          }
        }
      );
    } else {
      conn.query("SELECT COUNT(*) as total FROM mapel", (err, result) => {
        const total = result[0].total;
        if (total > 0) {
          if (page > 0) {
            mapelmodels
              .pagination2(page, total)
              .then((result) => {
                helpers.response(res, result, 200);
              })
              .catch((err) => helpers.response(res, {}, 201, err));
          }
        } else {
          helpers.response(res, [1, "Curren Page: 1", []], 200);
        }
      });
    }
  },
  addmapel: (req, res) => {
    const { nama_mapel } = req.body;
    const data = {
      nama_mapel,
    };
    mapelmodels
      .addmapel(data)
      .then((result) => {
        const dataresponse = { id: result.insertId, ...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
  },
  deletemapel: (req, res) => {
    const id = req.query.id;
    mapelmodels
      .deletemapel(id)
      .then((result) => {
        helpers.response(res, id, 200);
      })
      .catch((err) => console.log(err));
  },
  updatemapel: (req, res) => {
    const id = req.query.id;
    const { nama_mapel } = req.body;
    const data = {
      nama_mapel,
    };
    mapelmodels
      .updatemapel(id, data)
      .then((result) => {
        const dataresponse = { id, ...data };
        helpers.response(res, dataresponse, 200);
      })
      .catch((err) => console.log(err));
  },
};
