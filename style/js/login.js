form = document.getElementById('login-form');
inputName = document.getElementById('inputName');
inputPassword = document.getElementById('inputPassword');
let emp = "";

let employees = [];
let _url = "employees.json";


$.ajax({
    url: _url,
    type: "get",
    success: function (data) {

        employees = data;

    },
    error: function err() {
        console.log("Error Mesage!!");
    }

});


form.addEventListener('submit', function (e) {
    e.preventDefault();

    userName = inputName.value;
    password = inputPassword.value;
    console.log(userName, password);
    for (let i = 0; i < employees.length; i++) {
        if (userName === employees[i].userName && password === employees[i].password) {
            if (i == 0) {
                window.open("admin.html", "_self");
            }
            else if (employees[i].position === "sub_admin") {
                localStorage.setItem("currentUser", employees[i].code);
                window.open("confirmAttendence.html", "_self");
            }
            else {
                localStorage.setItem("currentUser", employees[i].code);
                window.open("employee.html", "_self");
            }
        }

    }


});




