openbar = () => {
    document.querySelector(".icon").classList.toggle("ham");
    document.querySelector('.navbar').classList.toggle("change");
}
let a;
let date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
setInterval(() => {
    a = new Date;
    let time = a.getHours() + ":" + a.getMinutes() + ":" + a.getSeconds();
    date = a.toLocaleDateString('en-GB');
    document.getElementById('time').innerHTML = time + " on " + date;
}, 1000);
function calcTime(offset) {
    var b = new Date;
    var utc = b.getTime() + (b.getTimezoneOffset() * 60000);
    var nd = new Date(utc + (3600000 * offset));
    var n = nd.getHours() + ":" + nd.getMinutes() + ":" + nd.getSeconds() + " ," + nd.getDate() + "/" + nd.getMonth() + "/" + nd.getFullYear();
    return n;
}
function final(identity, difference) {
    let al = document.getElementById(identity);
    al.innerHTML = calcTime(difference);
}
final('atime', '-9');
final('btime', '+2');
final('ctime', '-4');
final('dtime', '+2');
final('ltime', '+1');
final('ftime', '-4');
final('gtime', '+3');
final('htime', '+8');
final('itime', '+2');
final('jtime', '+7');
final('stime', '+2');
final('mtime', '+10');

// stopwatch


let seconds = 0;
let minutes = 0;
let hours = 0;
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;
stopwatch = () => {
    seconds++;
    if (seconds / 60 == 1) {
        seconds = 0;
        minutes++;

        if (minutes / 60 == 1) {
            minutes = 0;
            hours++;
        }
    }
    if (seconds < 10) {
        displaySeconds = "0" + seconds;
    }
    else {
        displaySeconds = seconds;
    }
    if (minutes < 10) {
        displayMinutes = "0" + minutes;
    }
    else {
        displayMinutes = minutes;
    }
    if (hours < 10) {
        displayHours = "0" + hours;
    }
    else {
        displayHours = hours;
    }
    document.getElementById('display').innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;

}
start = () => {
    interval = setInterval(stopwatch, 1000);
}
pause = () => {
    clearInterval(interval);
}
stop = () => {
    clearInterval(interval);
    displaySeconds = 0;
    displayHours = 0;
    displayMinutes = 0;
    document.getElementById('display').innerHTML = "00:00:00"
}
function getUpdate(){
    tit = document.getElementById('input').value;
    desc = document.getElementById('desc').value;
    console.log("hello")
    if (localStorage.getItem('itemJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        itemJsonArray.push([tit, desc]);
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
    }
    update();
}
function update() {
    
    if (localStorage.getItem('itemJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
    }
    else {
        itemJsonArrayStr = localStorage.getItem('itemJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
        localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
    }
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `<tr>
        <td scope="row">${index}</td>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <th><button id="del" onclick="deleted(${index})">Delete</button></th>
    </tr>`
    });
    document.getElementById('tbody').innerHTML = str;
}
deleted = (index) => {
    itemJsonArrayStr = localStorage.getItem('itemJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.splice(index, 1);
    localStorage.setItem('itemJson', JSON.stringify(itemJsonArray));
    update();
}
add = document.getElementById("add");
add.addEventListener("click", getUpdate);
