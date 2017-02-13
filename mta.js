
function getLatestTrainTimes(schedule) {
    var formattedTimes = [];
    for (var i = 0; i < schedule.length; i++){
        formattedTimes.push(timeParser(schedule[i]));
    };

    var sortedResult = formattedTimes.sort().unique();

    var cTime = new Date();
    var cHour = cTime.getHours();
    var cMinute = cTime.getMinutes();
    var timeNow = '';
    cHour.toString().length == 2 ? timeNow += cHour : timeNow += '0' + cHour;
    cMinute.toString().length == 2 ? timeNow += cMinute : timeNow += '0' + cMinute;
    console.log(sortedResult)
    var arrivalTimes = findNextArrivalTimes(sortedResult, timeNow)
    var result = 'The next M R trains will arrive at 46th street Astoria in ' + arrivalTimes[0].toString() + ' ' + arrivalTimes[1].toString() + ' and ' + arrivalTimes[2].toString() + ' minutes'
    return result
}



function timeParser(time) {
    return time.slice(0, 2) + time.slice(3, 5)
}

function inMinutes(time) {
    return Number(time.slice(0, 2)) * 60 + Number(time.slice(2, 4))
}

function findNextArrivalTimes(array, number) {
    var num = 0;
    for (var i = array.length - 1; i >= 0; i--) {
        if (Math.abs(number - array[i]) < Math.abs(number - array[num])) {
            num = i;
        }
    }
    number = inMinutes(number)
    return [inMinutes(array[num + 1]) - number, inMinutes(array[num + 2]) - number, inMinutes(array[num + 3]) - number]
}


Array.prototype.unique = function () {
    var unique = [];
    for (var i = 0; i < this.length; i++) {
        if (unique.indexOf(this[i]) == -1) {
            unique.push(this[i]);
        }
    }
    return unique;
};

module.exports = getLatestTrainTimes;