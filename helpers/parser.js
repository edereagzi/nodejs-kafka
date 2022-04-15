const xml2js = require("xml2js");

const parseXMLToJSON = async (body) =>
  new Promise((resolve, reject) => {
    const parser = new xml2js.Parser({ explicitArray: false, trim: true });
    parser.parseString(body, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });

module.exports = { parseXMLToJSON };
