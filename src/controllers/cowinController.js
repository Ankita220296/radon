let axios = require("axios");
 
//............................Get vaccination data by using of District id and date................................//

let getDistrictsById = async function (req, res) {
  try {
    let id = req.query.district_id;
    let date = req.query.date;
    let options = {
      method: "get",
      url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date}`,
    };
    let result = await axios(options);
    console.log(result);
    let data = result.data;
    res.status(200).send({ msg: data, status: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
};


module.exports.getDistrictsById = getDistrictsById;

