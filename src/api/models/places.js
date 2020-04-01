const mongoose = require("mongoose");
const date = require("../../services/dateHours-1")


const placesSchema = mongoose.Schema({
  country: {
    type: String
  },
  cases: {
    type: String
  },
  death: {
    type: String
  },
  date: {
    type: String
  }
});

// onde aponto o cluster
// colocar função para ler a hora

// module.exports = mongoose.model("places" + " " + date() , placesSchema);
module.exports = mongoose.model("places 2020/4/1 18" , placesSchema);

