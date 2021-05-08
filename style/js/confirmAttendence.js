logout = document.getElementById('logout');
confirmbtn = document.getElementById('confirmbtn');
inputCode = document.getElementById('inputCode');
const d = new Date();
const currentTime =  new Date().toLocaleTimeString('en-US');
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

            if (currentTime.split(':')[0] >= 9 && currentTime.split(':')[0] <= 10 && currentTime.split(':')[2].split(' ')[1] == "AM" ) {
                late = true;
                const newAttend = {
                    code: +currentCode,
                    userName : employees[i].userName,
                    time:currentTime,
                    date :d.toLocaleDateString('en-US'),
                    month : d.getMonth()+1,
                    year : d.getFullYear(),
                    is_late:late
                }
                attendence.push(newAttend);
                
            }
            
            
            const NewData = new Blob([JSON.stringify(attendence)], { type: "appliction/json" });
            var link = document.createElement("a");
            link.href = window.webkitURL.createObjectURL(NewData);
            link.setAttribute("download", "attendence.json");
            document.body.appendChild(link);
            link.click();

        }
    }

})




/************** logout ************/
logout.addEventListener('click', function (e) {
    window.open("index.html", "_self");
});