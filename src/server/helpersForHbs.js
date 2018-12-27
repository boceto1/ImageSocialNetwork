const helpersForHbs ={};

const moment = require('moment');

helpersForHbs.timeAgo = timeStamp =>{
    return moment(timeStamp).startOf('minute').fromNow();
}

module.exports = helpersForHbs;
