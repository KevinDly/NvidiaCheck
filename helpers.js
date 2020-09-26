//Recieved from https://tecadmin.net/
//Function to make digits zero prepended digits.
//DOESNT WORK
const zeroAppend = (digit) => {
    if(digit < 10)
        return "0" + digit.toString(10);
    return digit.toString(10);
}

//Function that simply grabs the current date and time.
const getDateTime = () => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate();
    var time = today.getHours() + ":" + zeroAppend(today.getMinutes()) + ":" + zeroAppend(today.getSeconds());
    return date + " " + time;
}


module.exports = {
    getDateTime
}