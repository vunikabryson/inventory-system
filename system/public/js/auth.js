let admin = {
username:"admin",
password:"1234"
}

function login(){

let u=document.getElementById("user").value;
let p=document.getElementById("pass").value;

if(u===admin.username && p===admin.password){

localStorage.setItem("logged","true");

window.location="dashboard.html";

}else{

alert("Invalid login");

}

}