const logout =document.getElementById('logout');
const userName = document.getElementById('name');
const dailyReport =  document.getElementById('dailyReport');
const monthlyReport = document.getElementById('monthlyReport');
const yearlyReport = document.getElementById('yearlyReport');


const currentUser = localStorage.getItem("currentUser");
const date = new Date();
const currentTime =  new Date().toLocaleTimeString('en-US');



let attendence = [];
console.log(currentUser);

$.ajax({
    url: "attendence.json",
    type: "get",
    success: function (data) {

        attendence = data;
        for(let i =0 ; i<attendence.length ; i++){
            if(attendence[i].code == currentUser){
                userName.innerText = attendence[i].userName;
            }
        }
        dailyreport();
        monthlyreport();
        yearlyreport();

    },
    error: function err() {
        console.log("Error Mesage!!");
    }

});

const dailyreport = function(){
    let today = false;
    let late = false;
    
    for(let i = 0 ; i<attendence.length ; i++){
        if(currentUser == attendence[i].code){
            if(date.toLocaleDateString('en-US') === attendence[i].date){
                today = true;
                if(attendence[i].is_late){
                    late = true;
                }
            }
        }
    }

    let createdDailyP = document.createElement('p');
    if(!today){
        createdDailyP.innerText = "you are absent today";
    }
    if(today && late){
        createdDailyP.innerText = "you are late today";
    }else if(today && !late){
        createdDailyP.innerText = "you attend on time today";
    }

    dailyReport.appendChild(createdDailyP);

    
}

/************** monthly report  ************ */
const monthlyreport = function(){
    let attend = 0;
    let late = 0;

    for(let i = 0 ; i<attendence.length ; i++){
        if(currentUser == attendence[i].code){
            if(date.getMonth()+1 === attendence[i].month){
                attend++;
                if(attendence[i].is_late){
                    late++;
                }
            }
            
        }
    }

    let createdMonthlyP = document.createElement('p');
    createdMonthlyP.innerText = `attendence: ${attend}  , late: ${late}`;

    monthlyReport.appendChild(createdMonthlyP);

    
}



/************** yearly report  ************ */
const yearlyreport = function(){
    let attend = 0;
    let late = 0;
    
    for(let i = 0 ; i<attendence.length ; i++){
        if(currentUser == attendence[i].code){
            if(attendence[i].year == +date.getFullYear()){
                attend++;
                if(attendence[i].is_late){
                    late++;
                }
            }
            
        }
    }

    let createdYearlyP = document.createElement('p');
    createdYearlyP.innerText = `attendence: ${attend}  , late: ${late} , absent: ${365-attend}`;

    yearlyReport.appendChild(createdYearlyP);

    
}

/************** logout ************/
logout.addEventListener('click', function (e) {
    window.open("index.html", "_self");
});