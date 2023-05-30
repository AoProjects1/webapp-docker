if(sessionStorage.getItem("username")){
    window.location.href = "./index.html";
}
else{

let username_inp = document.querySelector('#username-inp');
let password_inp = document.querySelector('#password-inp');
let loginBtn = document.querySelector('#login-btn');
let alertForm = document.querySelector('.alert-form');
let alertText = document.querySelector('#alert-text');



let url ='http://localhost:8081/accounts/users';
httpm = "GET";
let data = {};
console.log(username_inp);

loginBtn.onclick = function(){

    if(username_inp.value && password_inp.value){        
            

        data.username= username_inp.value;
        data.password = password_inp.value;
        url+= "/"+username_inp.value
            fetch(url,{ method: httpm })
            .then((response)=>{
                return response.json();
            })
            .then((userData)=>{
                if(userData.message){
                    
                    alertText.innerHTML = userData.message;
                    alertForm.classList.remove("hide-alert");
  
                    
                }
                else{
                    if(password_inp.value != userData.user.password){
                        alertText.innerHTML = "Invalid Password";
                        alertForm.classList.remove("hide-alert");
                    }
                    else{
                        sessionStorage.setItem("username", userData.user.username);
                        let cart = [];
                        sessionStorage.setItem("userCart",JSON.stringify(cart));
                        window.location.href = "./index.html";
                    }
                    
                }
                url = "http://localhost:8081/accounts/users"
            })

    
    }
    else{
        alertText.innerHTML = "Please fill all empty fields"
        alertForm.classList.remove("hide-alert");
    }

}

}