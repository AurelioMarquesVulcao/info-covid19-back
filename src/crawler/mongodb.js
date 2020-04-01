const mongoose = require("mongoose");
const date = require("../services/datehours");

// local onde o banco está sendo salvo
const URL =
  "mongodb+srv://admin:1234@cluster0-9jhwf.mongodb.net/covid-19?retryWrites=true&w=majority";

// preferi inserir os dados como string para não ser necessario tratar "." e ","
const localidadesSchema = new mongoose.Schema({
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



module.exports = function(items) {
  var localidadeModel = mongoose.model(
    "places" + " " + date(),
    localidadesSchema
  );

  //var caSe = cases;
  var localidades = [];
  items.forEach(function(item, index) {
    var localidade = new localidadeModel();
    localidade.country = item["localidade"];
    localidade.cases = item["cases"];
    localidade.death = item["death"];
    localidade.date = item["date"];

    localidades.push(localidade);
  });


  mongoose.connect(
    URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    function(error) {
      if (!error) {
        
        localidadeModel
          .insertMany(localidades)
          .then(function(docs) {
            console.log("salvo com sucesso");
            
            mongoose.disconnect();
          })
          .catch(function(error) {
            console.log(error);
            process.exit(2); 
          });
      } else {
        console.log(error);
        process.exit(1); 
      }
    }
  );
};
