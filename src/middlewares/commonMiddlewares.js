
const moment = require('moment')

const midGlobal= function ( req, res, next) {
    let day = moment().format("YYYY-MM-DD h:mm:ss");
    let ip = req.ip;
    let path =req.url;
    console.log(day,",",ip,",",path)
    next()
  }

  module.exports.midGlobal= midGlobal