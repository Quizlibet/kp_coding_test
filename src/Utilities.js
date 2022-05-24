function extractUsersJSON(json) {
  return json?.person;
}

function extractUsersXML(xmlString) {
  const xmlList = new X2JS().xml2js(xmlString);
  return xmlList?.persons?.person;
}

function sleeper(ms) {
    return function(x) {
      return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
  }

module.exports = {extractUsersJSON, extractUsersXML, sleeper};