
logout = document.getElementById('logout');
confirmTable = document.getElementById('confirmTable');
tableBody = document.getElementById('tableBody');
confirmbtn = document.getElementById('confirmbtn');
allEmployees = document.getElementById('allEmployees');
fullReport = document.getElementById('fullReport');
lateReport = document.getElementById('lateReport');
allEmploreesReportTable = document.getElementById('allEmploreesReportTable');

let employees = [];
let attendence = [];
let _url = "employees.json";

$.ajax({
    url: "employees.json",
    type: "get",
    success: function (data) {

        employees = data;
        show();

    },
    error: function err() {
        console.log("Error Mesage!!");
    }

});

$.ajax({
    url: "attendence.json",
    type: "get",
    success: function (data) {

        attendence = data;
        reports();

    },
    error: function err() {
        console.log("Error Mesage!!");
    }

});



/*************************confirm new employee *******************/
const show = function () {
    for (let i = 1; i < employees.length; i++) {
        if (employees[i].is_new) {

            createdTR = document.createElement('tr');
            createdfNameTD = document.createElement('td');
            createdfNameTD.innerText = employees[i].firstName;
            createdlNameTD = document.createElement('td');
            createdlNameTD.innerText = employees[i].lastName;
            createdUserNameTD = document.createElement('td');
            createdUserNameTD.innerText = employees[i].userName;
            createdEmailTD = document.createElement('td');
            createdEmailTD.innerText = employees[i].email;
            createdPasswordTD = document.createElement('td');
            createdPasswordTD.innerText = employees[i].password;
            createdAddressTD = document.createElement('td');
            createdAddressTD.innerText = employees[i].address;
            createdAgeTD = document.createElement('td');
            createdAgeTD.innerText = employees[i].age;

            createdActionTD = document.createElement('td');
            createdconfirmBtn = document.createElement('button');
            createdconfirmBtn.innerText = "Confirm";
            createdconfirmBtn.setAttribute('class', 'btn');
            createdconfirmBtn.setAttribute('id', 'confirmbtn');


            createdActionTD.appendChild(createdconfirmBtn);
            createdTR.appendChild(createdfNameTD);
            createdTR.appendChild(createdlNameTD);
            createdTR.appendChild(createdUserNameTD);
            createdTR.appendChild(createdEmailTD);
            createdTR.appendChild(createdPasswordTD);
            createdTR.appendChild(createdAddressTD);
            createdTR.appendChild(createdAgeTD);
            createdTR.appendChild(createdActionTD);
            tableBody.appendChild(createdTR);
        }
    }
};

$(confirmTable).on('click', '#confirmbtn', function (e) {
    console.log('hello');
    currentUserName = $($(this).parent().siblings()[2]).text();
    console.log(currentUserName);
    currentpassword = $($(this).parent().siblings()[4]).text();
    console.log(currentpassword);
    for (let i = 1; i < employees.length; i++) {
        if (employees[i].password === currentpassword && employees[i].userName === currentUserName) {
            employees[i].is_new = false;
            employees[i].code = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
            console.log(employees[i]);
        }
    }
    const NewData = new Blob([JSON.stringify(employees)], { type: "appliction/json" });
    var link = document.createElement("a");
    link.href = window.webkitURL.createObjectURL(NewData);
    link.setAttribute("download", "employees.json");
    document.body.appendChild(link);
    link.click();
});


/*************************end confirm new employee *******************/





/************************* reports *******************/

const reports = function () {
    
    for (let i = 1; i < employees.length; i++) {
        if(employees[i].is_new){
            continue;
        }
        let attend = 0;
        let late = 0;
        for (let j = 0; j < attendence.length; j++) {
            //check attendence
            if (employees[i].code === attendence[j].code) {
                attend++;

                //check late
                if( attendence[j].is_late ){
                    late++;
                }
            }
        }


        //show report in table
        createdTR = document.createElement('tr');
        createdUserNameTD = document.createElement('td');
        createdUserNameTD.innerText = employees[i].userName;
        createdUserAttendTD = document.createElement('td');
        createdUserAttendTD.innerText = attend;
        createdUserLateTD = document.createElement('td');
        createdUserLateTD.innerText = late;
    
    
        createdTR.appendChild(createdUserNameTD);
        createdTR.appendChild(createdUserAttendTD);
        createdTR.appendChild(createdUserLateTD);
        allEmploreesReportTable.appendChild(createdTR);

    }

}






/************** logout ************/
logout.addEventListener('click', function (e) {
    window.open("index.html", "_self");
});

