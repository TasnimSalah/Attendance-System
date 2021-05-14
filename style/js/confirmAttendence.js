logout = document.getElementById('logout');
confirmbtn = document.getElementById('confirmbtn');
inputCode = document.getElementById('inputCode');
time = document.getElementById('time');
state = document.getElementById('state');
userName = document.getElementById('userName');
const d = new Date();
const currentTime = new Date().toLocaleTimeString('en-US');
let late = false;

let attendence = [];
let employees = [];
let _url = "attendence.json";

$.ajax({
    url: _url,
    type: "get",
    success: function (data) {

        attendence = data;

    },
    error: function err() {
        console.log("Error Mesage!!");
    }

});


$.ajax({
    url: "employees.json",
    type: "get",
    success: function (data) {

        employees = data;

    },
    error: function err() {
        console.log("Error Mesage!!");
    }

});

confirmbtn.addEventListener('click', function (e) {
    e.preventDefault();
    const currentCode = inputCode.value;
    if (!currentCode) {
        e.preventDefault();
    }
    for (let i = 1; i < employees.length; i++) {

        if (employees[i].code === +currentCode) {
            console.log(employees[i]);
            userName.innerText = employees[i].userName;

            if (currentTime.split(':')[0] >= 9 && currentTime.split(':')[0] <= 10 && currentTime.split(':')[2].split(' ')[1] == "AM") {
                const newAttend = {
                    code: +currentCode,
                    userName: employees[i].userName,
                    time: currentTime,
                    date: d.toLocaleDateString('en-US'),
                    month: d.getMonth() + 1,
                    year: d.getFullYear(),
                    is_late: false
                }
                attendence.push(newAttend);
                state.innerText = `Attendance time is: `
                time.innerText = currentTime;
                const NewData = new Blob([JSON.stringify(attendence)], { type: "appliction/json" });
                var link = document.createElement("a");
                link.href = window.webkitURL.createObjectURL(NewData);
                link.setAttribute("download", "attendence.json");
                document.body.appendChild(link);
                link.click();
            }
            else if (currentTime.split(':')[0] >= 10 && currentTime.split(':')[0] <= 11 && currentTime.split(':')[2].split(' ')[1] == "AM") {

                const newAttend = {
                    code: +currentCode,
                    userName: employees[i].userName,
                    time: currentTime,
                    date: d.toLocaleDateString('en-US'),
                    month: d.getMonth() + 1,
                    year: d.getFullYear(),
                    is_late: true
                }
                attendence.push(newAttend);
                state.innerText = `you are late `
                time.innerText = currentTime;


                const NewData = new Blob([JSON.stringify(attendence)], { type: "appliction/json" });
                var link = document.createElement("a");
                link.href = window.webkitURL.createObjectURL(NewData);
                link.setAttribute("download", "attendence.json");
                document.body.appendChild(link);
                link.click();
            }
            else {
                state.innerText = `you are absent today`;
            }



        }
    }

})




/************** logout ************/
logout.addEventListener('click', function (e) {
    window.open("index.html", "_self");
});