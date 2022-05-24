const sleeper = require("../utilities/sleeper");
const axios = require("axios");
const ENDPOINT = "https:api.fakeuserapi.com/api/users.json";

function getUsersJSON() {
    return axios.get(ENDPOINT)
        .then(sleeper(1000))
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.data;
        })
        .then(json => json);
}

module.exports = getUsersJSON;