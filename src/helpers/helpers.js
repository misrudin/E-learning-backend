module.exports = {
  response: (res, dataResult, status, err) => {
    let resultPrint = {};
    resultPrint.status = "Success";
    resultPrint.status_code = status;
    resultPrint.result = dataResult;
    resultPrint.err = err || null;
    return res.status(resultPrint.status_code).json(resultPrint);
  },
};
