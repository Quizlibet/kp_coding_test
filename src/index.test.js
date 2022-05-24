const axios = require('axios');
const ENDPOINT = "https:api.fakeuserapi.com/api/"
const getUsersJSON = require("./common/getUsersJSON");
const getUsersXML = require("./common/getUsersXML");
const getAllUsers = require("./index");
const XMLString = `<persons>
<person>
    <id>3</id>
    <firstName>Jen</firstName>
    <lastName>Doe</lastName>
</person>
<person>
    <id>6</id>
    <firstName>Stephanie</firstName>
    <lastName>Joe</lastName>
</person>
<person>
    <id>1</id>
    <firstName>Victoria</firstName>
    <lastName>Doe</lastName>
</person>
</persons>`

jest.mock('axios');
axios.get.mockImplementation((url) => {
    switch(url) {
        case `${ENDPOINT}users.json`:
            return Promise.resolve({
                ok: true,
                data: {
                    person: [
                        {
                            "id": 10,
                            "firstName": "John",
                            "lastName": "Doe"
                        },
                        {
                            "id": 5,
                            "firstName": "Jack",
                            "lastName": "Doe"
                        },
                        {
                            "id": 7,
                            "firstName": "James",
                            "lastName": "Doe"
                        }
                    ]
                }
            });
        case `${ENDPOINT}users.xml`:
            return Promise.resolve({
                ok: true,
                data: XMLString
            });
        default:
            return Promise.reject(new Error('not found'));
    }
})

test('Should fetch data from JSON API', async () => {
    return getUsersJSON().then(users => expect(users).toEqual(
        { 
            "person" : [
            {
                "id": 10,
                "firstName": "John",
                "lastName": "Doe"
            },
            {
                "id": 5,
                "firstName": "Jack",
                "lastName": "Doe"
            },
            {
                "id": 7,
                "firstName": "James",
                "lastName": "Doe"
            }
        ]
    }
    ))
})

test('Should fetch data from XML API', async () => {
    return getUsersXML().then(users => expect(users).toMatch(XMLString))
})

test('Should fetch all users and be sorted', async () => {
    return getAllUsers().then(users => expect(users).toEqual(
        [
                {"firstName": "Victoria", "id": "1", "lastName": "Doe"},
                {"firstName": "Jen", "id": "3", "lastName": "Doe"},
                {"firstName": "Jack", "id": 5, "lastName": "Doe"},
                {"firstName": "Stephanie", "id": "6", "lastName": "Joe"},
                {"firstName": "James", "id": 7, "lastName": "Doe"},
                {"firstName": "John", "id": 10, "lastName": "Doe"}
        ]
    ))
})