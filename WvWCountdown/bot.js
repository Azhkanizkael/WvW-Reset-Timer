const Discord = require('discord.js');
var auth = require('./auth.json');
const client = new Discord.Client();
var d = new Date();
d.setUTCHours(d.getUTCHours()-2)
d.setUTCFullYear(2018)
d.setUTCMonth(6) // 0 = january, 1 = february
switch(d.getUTCDay()) {
    case 1:
        d.setUTCDate(2) //Monday
        break;
    case 2:
        d.setUTCDate(3) //Tuesday
        break;
    case 3:
        d.setUTCDate(4) //Wednesday
        break;
    case 4:
        d.setUTCDate(5) //Thursday
        break;
    case 5:
        d.setUTCDate(6) //Friday
        break;
    case 6:
        d.setUTCDate(7) //Saturday
        break;
    case 7:
        d.setUTCDate(1) //Sunday
        break;
};



// Initialize Discord Bot
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setStatus('available')
    client.user.setPresence({
        game: {
            name: moment("2018-07-01").countdown("2018-07-08").toString()
        }
    });
    console.log();
    setInterval(() => {
        var d = new Date();
        var datetime = moment("2018-07-01").countdown("208-07-08").toString();
        console.log(datetime);
        if (datetime = '0:0:0') {
            console.log('RESET!');
            switch(d.getUTCDay()) {
                case 1:
                    d.setUTCDate(2) //Monday
                    break;
                case 2:
                    d.setUTCDate(3) //Tuesday
                    break;
                case 3:
                    d.setUTCDate(4) //Wednesday
                    break;
                case 4:
                    d.setUTCDate(5) //Thursday
                    break;
                case 5:
                    d.setUTCDate(6) //Friday
                    break;
                case 6:
                    d.setUTCDate(7) //Saturday
                    break;
                case 7:
                    d.setUTCDate(1) //Sunday
                    break;
            };
        };
        client.user.setActivity(datetime)
    }, 60000)
});
client.login(auth.token);