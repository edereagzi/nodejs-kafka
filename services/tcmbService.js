const axios = require("axios");
const { parseXMLToJSON } = require("../helpers/parser");

const getCurrencyAndValues = async () => {
  try {
    const { data } = await axios("https://www.tcmb.gov.tr/kurlar/today.xml");
    const jsonData = await parseXMLToJSON(data);
    let currencies = jsonData?.Tarih_Date?.Currency;
    return currencies.map((currency) => {
      return {
        Name: `${currency.$.Kod}/TRY`,
        value: currency.ForexBuying,
      };
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCurrencyAndValues };
