function extractUsersXML(xmlString) {
    const xmlList = new X2JS().xml2js(xmlString);
    return xmlList?.persons?.person;
  }

  module.exports = extractUsersXML