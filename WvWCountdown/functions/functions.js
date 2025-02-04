const request = require('postman-request');
const auth = require('../auth.json');

function getMatchEndTime(callback) {	    
    const url = `https://api.guildwars2.com/v2/wvw/matches/${auth.region}-1`;
    
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            return callback('Unable to connect to the API.', null);
        }
        if (response.statusCode !== 200) {
            return callback(`Error: ${response.statusCode}`, null);
        }
        if (!body || !body.end_time) {
            return callback('Field "na" not found in response.', null);
        }
        
        callback(null, body.end_time);
    });
};

function getTeamAssignmentTimer(callback) {    
    const url = 'https://api.guildwars2.com/v2/wvw/timers/teamAssignment';
    
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            return callback('Unable to connect to the API.', null);
        }
        if (response.statusCode !== 200) {
            return callback(`Error: ${response.statusCode}`, null);
        }
        if(auth.region = 1) {
            if (!body || !body.na) {
                return callback('Field "na" not found in response.', null);
            }
        } else {
            if (!body || !body.eu) {
                return callback('Field "eu" not found in response.', null);
            }
        }
        
        if(auth.region = 1) {
            callback(null, body.na);
        } else {
            callback(null, body.eu);
        }
    });
}

function getLockoutTimer(callback) {    
    const url = 'https://api.guildwars2.com/v2/wvw/timers/lockout';
    
    request({ url, json: true }, (error, response, body) => {
        if (error) {
            return callback('Unable to connect to the API.', null);
        }
        if (response.statusCode !== 200) {
            return callback(`Error: ${response.statusCode}`, null);
        }
        if(auth.region = 1) {
            if (!body || !body.na) {
                return callback('Field "na" not found in response.', null);
            }
        } else {
            if (!body || !body.eu) {
                return callback('Field "eu" not found in response.', null);
            }
        }
        
        if(auth.region = 1) {
            callback(null, body.na);
        } else {
            callback(null, body.eu);
        }
    });
}

module.exports = {
    getLockoutTimer,
    getMatchEndTime,
    getTeamAssignmentTimer
};