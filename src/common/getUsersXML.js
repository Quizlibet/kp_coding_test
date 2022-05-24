const sleeper = require("../utilities/sleeper");
const axios = require("axios");
const ENDPOINT = "https:api.fakeuserapi.com/api/users.xml";

function getUsersXML() {
    return axios.get(ENDPOINT)
        .then(sleeper(2000))
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.data;
        })
        .then(json => json);
}

module.exports = getUsersXML;