const request = require('postman-request');
const auth = require('../auth.json');

function getMatchEndTime() {
    return new Promise((resolve, reject) => {
        const url = `https://api.guildwars2.com/v2/wvw/matches/${auth.region}-1`;
        
        request({ url, json: true }, (error, response, body) => {
            if (error) {
                return reject('Unable to connect to the API.');
            }
            if (response.statusCode !== 200) {
                return reject(`Error: ${response.statusCode}`);
            }
            if (!body || !body.end_time) {
                return reject('Field "end_time" not found in response.');
            }
            
            resolve(body.end_time);
        });
    });
}

function getTeamAssignmentTimer() {
    return new Promise((resolve, reject) => {
        const url = 'https://api.guildwars2.com/v2/wvw/timers/teamAssignment';
        
        request({ url, json: true }, (error, response, body) => {
            if (error) {
                return reject('Unable to connect to the API.');
            }
            if (response.statusCode !== 200) {
                return reject(`Error: ${response.statusCode}`);
            }
            if (auth.region == 1) {
                if (!body || !body.na) {
                    return reject('Field "na" not found in response.');
                }
                resolve(body.na);
            } else {
                if (!body || !body.eu) {
                    return reject('Field "eu" not found in response.');
                }
                resolve(body.eu);
            }
        });
    });
}

function getLockoutTimer() {
    return new Promise((resolve, reject) => {
        const url = 'https://api.guildwars2.com/v2/wvw/timers/lockout';
        
        request({ url, json: true }, (error, response, body) => {
            if (error) {
                return reject('Unable to connect to the API.');
            }
            if (response.statusCode !== 200) {
                return reject(`Error: ${response.statusCode}`);
            }
            if (auth.region == 1) {
                if (!body || !body.na) {
                    return reject('Field "na" not found in response.');
                }
                resolve(body.na);
            } else {
                if (!body || !body.eu) {
                    return reject('Field "eu" not found in response.');
                }
                resolve(body.eu);
            }
        });
    });
}

module.exports = {
    getLockoutTimer,
    getMatchEndTime,
    getTeamAssignmentTimer
};