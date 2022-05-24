const getUsersJSON = require("./common/getUsersJSON");
const getUsersXML = require("./common/getUsersXML");
const extractUsersJSON = require("./utilities/extractUsersJSON");
const extractUsersXML = require("./utilities/extractUsersXML");

async function getAllUsers() {
    const jsonResponse = await getUsersJSON();
    const xmlResponse = await getUsersXML();
    const jsonList = extractUsersJSON(jsonResponse);
    const xmlList = extractUsersXML(xmlResponse);

    const response = jsonList.concat(xmlList).sort((a, b) => a.id - b.id);

    return response;
}

module.exports = getAllUsers;