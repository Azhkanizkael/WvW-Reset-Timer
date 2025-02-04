function getApi(){	
    https.get(url, (res) => {
        if (err) throw err;
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            const responseData = JSON.parse(data);
            // console.log(responseData.end_time);
            global.vEndTime = responseData.end_time
        });
      });
};

function getLockoutApi(){	
    https.get(lockouturl, (res) => {
        if (err) throw err;
        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            const responseLockoutData = JSON.parse(data);
            // console.log(responseData.end_time);
            global.vEndTime = responseLockoutData.na
        });
      });
};