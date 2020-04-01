const cheerio = require("cheerio");
const request = require("request");
var save = require("./firtrundb");
const Date = require("../services/datenow");
const Datecsv = require("../services/dateforcsv");
fs = require("fs");
const { Parser } = require("json2csv");

// site a ser raspado
const notices = "https://www.worldometers.info/coronavirus/";

// o crawler começa aqui.
var localidades = [];

module.exports = () => {
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
      // fs.writeFileSync("./dadosCSV/covid.19" + Datecsv() + ".csv", csv, "utf8");

      // execução no docker implementar no arquivo .env as rotas
    //   const json2csvParser = new Parser();
    //   const csv = json2csvParser.parse(localidades);
    //   fs.writeFileSync("./dadosCSV/covid.19" + Datecsv() + ".csv", csv, "utf8");
    });
    // exibo o primeiro item da lista, assim nos log possso saber
    // quando rodou pela ultima vez com data e hora e se os dados estão corretos
    // console.log(
    //   JSON.stringify(localidades[0]) + " " + "Captura realizada com sucesso"
    // );

    save(localidades);
  });
};
