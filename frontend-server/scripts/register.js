let username_inp = document.querySelector('#username-inp');
let fullname_inp = document.querySelector('#fullname-inp');
let email_inp = document.querySelector('#email-inp');
let password_inp = document.querySelector('#password-inp');
let registerBtn = document.querySelector('#register-btn');
let alertForm = document.querySelector('.alert-form');
let alertText = document.querySelector('#alert-text');





if(sessionStorage.getItem("username")){
    window.location.href = "./index.html";
}

let url ='http://localhost:8081/accounts/users';
httpm = "POST";
let data = {};
console.log(username_inp);

registerBtn.onclick = function(){

    if(username_inp.value && fullname_inp.value && email_inp.value && password_inp.value){

        
        let mailformat = /^[a-zA-Z][a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}$/ ;
        if(email_inp.value.match(mailformat)){
            data.username= username_inp.value;
            data.fullname= fullname_inp.value;
            data.email = email_inp.value;
            data.password = password_inp.value;
            data.gender = document.querySelector('input[name="gender"]:checked').value;
            
            fetch(url,
                { 
                    method: httpm, body: JSON.stringify(data), 
                    headers: { "Content-type": "application/json" } 
                })
            .then((response)=>{
                return response.json();
            })    
            .then((msg)=>{
                if(msg.message == "User created"){
                    alertText.innerHTML = "Account Created Successfully";
                    document.getElementById("alertColor").style.backgroundColor = "green";
                    alertForm.classList.remove("hide-alert");

                }else{

                    alertText.innerHTML = msg.message;
                    document.getElementById("alertColor").style.backgroundColor = "red";
                    alertForm.classList.remove("hide-alert");

                }
            })
            
            
        }
        else{
            alertText.innerHTML = "Please, enter a valid email"
            alertForm.classList.remove("hide-alert");

        }
    
    }
    else{
        alertText.innerHTML = "Please fill all empty fields"
        alertForm.classList.remove("hide-alert");
    }

    



}