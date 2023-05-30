if(!sessionStorage.getItem("username")){
    window.location.href = "./login.html";
}
else{
    let nameLabel = document.querySelector("#name-label");
    let emailLabel = document.querySelector("#email-label");
    let usernameLabel = document.querySelector("#username-label");
    let genderLabel = document.querySelector("#gender-label");
    console.log(nameLabel);
    console.log(emailLabel);
    console.log(genderLabel);
    let url = "http://localhost:8081/accounts/users/"+sessionStorage.getItem("username");

    fetch(url,{ method: "GET" })
            .then((response)=>{
                return response.json();
            })
            .then((userData)=>{
                nameLabel.innerHTML += userData.user.fullname;
                emailLabel.innerHTML += userData.user.email;
                usernameLabel.innerHTML += userData.user.username;
                genderLabel.innerHTML += userData.user.gender;

            });
             
                    
                
}

function signOut(icon){
    icon.style.display = "none";
    sessionStorage.removeItem("username")
}