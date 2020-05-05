const tugasModel = require("../models/tugas");
const helper = require("../helpers/helpers");

module.exports = {
  // get data
  getTugas: (req, res) => {
    const { status } = req.query;
    tugasModel
      .getTugas(status)
      .then((result) => {
        helper.response(res, result, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },
  getEsay: (req, res) => {
    const { tugas } = req.query;
    tugasModel
      .getEsay(tugas)
      .then((result) => {
        helper.response(res, result, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },
  getJawaban: (req, res) => {
    const { tugas, siswa } = req.query;
    tugasModel
      .getJawaban(tugas, siswa)
      .then((result) => {
        helper.response(res, result, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },
  getPg: (req, res) => {
    const { tugas } = req.query;
    tugasModel
      .getPg(tugas)
      .then((result) => {
        helper.response(res, result, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },
  getPgJawaban: (req, res) => {
    const { tugas, siswa } = req.query;
    tugasModel
      .getPgJawaban(tugas, siswa)
      .then((result) => {
        helper.response(res, result, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },

  //   post data

  addTugas: (req, res) => {
    const {
      id_mapel,
      id_kelas,
      id_guru,
      description,
      batas_waktu,
      status,
    } = req.body;
    const data = {
      id_mapel,
      id_kelas,
      id_guru,
      description,
      batas_waktu,
      status,
    };
    tugasModel
      .addTugas(data)
      .then((result) => {
        const dataResponse = { id: result.insertId, ...data };
        helper.response(res, dataResponse, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },
  addEsay: (req, res) => {
    const { id_tugas, soal } = req.body;
    const data = {
      id_tugas,
      soal,
    };
    tugasModel
      .addEsay(data)
      .then((result) => {
        const dataResponse = { id: result.insertId, ...data };
        helper.response(res, dataResponse, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },
  addPg: (req, res) => {
    const { id_tugas, soal, A, B, C, D, E, benar } = req.body;
    const data = {
      id_tugas,
      soal,
      A,
      B,
      C,
      D,
      E,
      benar,
    };
    tugasModel
      .addPg(data)
      .then((result) => {
        const dataResponse = { id: result.insertId, ...data };
        helper.response(res, dataResponse, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },
  addEsayJawaban: (req, res) => {
    const { id, id_siswa, jawaban } = req.body;
    const data = {
      id_detail_tugas: id,
      id_siswa,
      jawaban,
    };
    tugasModel
      .addEsayJawaban(data)
      .then((result) => {
        const dataResponse = { id: result.insertId, ...data };
        helper.response(res, dataResponse, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },
  addPgJawaban: (req, res) => {
    const { id, id_siswa, jawaban } = req.body;
    const data = {
      id_detail_tugas: id,
      id_siswa,
      jawaban,
    };
    tugasModel
      .addPgJawaban(data)
      .then((result) => {
        const dataResponse = { id: result.insertId, ...data };
        helper.response(res, dataResponse, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },

  //   edit data
  editTugas: (req, res) => {
    const { id } = req.query;
    const {
      id_mapel,
      id_kelas,
      id_guru,
      description,
      batas_waktu,
      status,
    } = req.body;
    const data = {
      id_mapel,
      id_kelas,
      id_guru,
      description,
      batas_waktu,
      status,
    };
    tugasModel
      .editTugas(data, id)
      .then((result) => {
        const dataResponse = { id, ...data };
        helper.response(res, dataResponse, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },
  editEsay: (req, res) => {
    const { id } = req.query;
    const { id_tugas, soal } = req.body;
    const data = {
      id_tugas,
      soal,
    };
    tugasModel
      .editEsay(data, id)
      .then((result) => {
        const dataResponse = { id, ...data };
        helper.response(res, dataResponse, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },
  editPg: (req, res) => {
    const { id } = req.query;
    const { id_tugas, soal, A, B, C, D, E, benar } = req.body;
    const data = {
      id_tugas,
      soal,
      A,
      B,
      C,
      D,
      E,
      benar,
    };
    tugasModel
      .editPg(data, id)
      .then((result) => {
        const dataResponse = { id, ...data };
        helper.response(res, dataResponse, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },

  //   delete data

  deleteTugas: (req, res) => {
    const { id } = req.query;
    tugasModel
      .deleteTugas(id)
      .then((result) => {
        const dataResponse = { id: id };
        helper.response(res, dataResponse, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },
  deleteEsay: (req, res) => {
    const { id } = req.query;
    tugasModel
      .deleteEsay(id)
      .then((result) => {
        const dataResponse = { id };
        helper.response(res, dataResponse, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },
  deletePg: (req, res) => {
    const { id } = req.query;
    tugasModel
      .deletePg(id)
      .then((result) => {
        const dataResponse = { id };
        helper.response(res, dataResponse, 200);
      })
      .catch((err) => helper.response(res, {}, 201, err));
  },
};
