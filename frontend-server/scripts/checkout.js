if(!sessionStorage.getItem("username")){
    window.location.href = "./index.html";
}
if(!sessionStorage.getItem("checkoutTotal") || sessionStorage.getItem("checkoutTotal") <=20){
    window.location.href = "./cart.html";
}
let checkoutTotal = sessionStorage.getItem("checkoutTotal");
let totalText = document.getElementById("total");
let nameText = document.getElementById("name");
let emailText = document.getElementById("email");
let addressText = document.getElementById("address");
let creditCardText = document.getElementById("credit-card");
let exDateText = document.getElementById("expiry-date");
let cvvText = document.getElementById("cvv");

let url ='http://localhost:8081/accounts/users/'+sessionStorage.getItem("username");

fetch(url,{ method: "GET" })
            .then((response)=>{
                return response.json();
            })
            .then((userData)=>{
                
                nameText.value = userData.user.fullname;
                emailText.value = userData.user.email;

            });

totalText.innerHTML = checkoutTotal+"EGP";





function validateData(){

    if(addressText.value == "" || creditCardText.value == "" || exDateText.value == "" || cvvText.value == ""){
        alert("Please fill all empty fields!");
    }
    else{
        let userCart = [];
        sessionStorage.setItem("userCart",JSON.stringify(userCart));
        sessionStorage.setItem("checkoutTotal",20);
        showSuccess();
    }

}

function showSuccess(){
    document.getElementById("successMessage").style.display = 'block';
    document.getElementById("checkout-form").style.display = 'none';

}