let inputFirstName = document.getElementById('inputFirstName');
let inputLastName = document.getElementById('inputLastName');
let inputAddress = document.getElementById('inputAddress');
let inputEmail = document.getElementById('inputEmail');
let inputAge = document.getElementById('inputAge');
let inputUserName = document.getElementById('inputUserName');
let inputPassword = document.getElementById('inputPassword');
let form = document.getElementById('register-form');


let employees=[];
let _url="employees.json";

  $.ajax({
    url:_url,
    type:"get",
    success: function (data) {
    
    employees=data;
    
    },
    error: function err() {
        console.log("Error Mesage!!");
    }      

  });


  form.addEventListener('submit', function (e) {
    e.preventDefault();

    getData();
    const NewData = new Blob([JSON.stringify(employees)], { type: "appliction/json" });
    var link = document.createElement("a");
    link.href = window.webkitURL.createObjectURL(NewData);
    link.setAttribute("download", "employees.json");
    document.body.appendChild(link);
    link.click();
}); 





  function getData(){
    
    const newEmp ={
      firstName : inputFirstName.value,
    lastName : inputLastName.value,
    address : inputAddress.value,
    age : inputAge.value,
    email : inputEmail.value,
    userName : inputUserName.value,
    password : inputPassword.value,
    is_new:true

    };
    employees.push(newEmp);
   
    

  };

  