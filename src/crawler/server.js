const cheerio = require("cheerio");
const request = require("request");
var save = require("./mongodb");
const Date = require("../services/datenow");
const Datecsv = require("../services/dateforcsv");
const firstrun = require("./firstrun");

// site a ser raspado
const notices = "https://www.worldometers.info/coronavirus/";

var localidades = [];

// faz uma primeira raspagem de dados e ja inicia o banco de dados
firstrun();

// está atualizando toda a aplicação a cada 1 hora
setInterval(function() {
  // o crawler começa aqui.
  var localidades = [];

  var crawler = () => {
    request(notices, function(error, response, body) {
      var $ = cheerio.load(body);
      $("tbody tr").each(function(element) {
        localidade = $(this)
          .find("td")
          .slice(0, 1)
          .text()
          .trim();
        caSe = $(this)
          .find("td")
          .slice(1, 2)
          .text()
          .trim();
        death = $(this)
          .find("td")
          .slice(3, 4)
          .text()
          .trim();
        date = Date();
        localidades.push({
          localidade: localidade,
          cases: caSe,
          death: death,
          date: date
        });
        // Cria um arquivo csv dos dados raspados para execução local
        // const json2csvParser = new Parser();
        // const csv = json2csvParser.parse(localidades);
        // fs.writeFileSync(
        //   "./dadosCSV/covid.19" + Datecsv() + ".csv", csv, "utf8");

        // execução no docker implementar no arquivo .env as rotas
      // const json2csvParser = new Parser();
      // const csv = json2csvParser.parse(localidades);
      // fs.writeFileSync("./dadosCSV/covid.19" + Datecsv() + ".csv", csv, "utf8");
      });
      // exibo o primeiro item da lista, assim nos log possso saber 
      // quando rodou pela ultima vez com data e hora e se os dados estão corretos
      // console.log(
      //   JSON.stringify(localidades[0]) + " " + "Captura realizada com sucesso"
      // );

      save(localidades);
    });
  };

  crawler();
}, 1800000 * 2);
