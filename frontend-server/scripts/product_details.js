if(!sessionStorage.getItem("prodViewId")){
    window.location.href = "./products.html";
}


let prodImg = document.querySelector("#prodImg");
let prodName = document.querySelector("#prodName");
let prodPrice = document.querySelector("#prodPrice");
let discountedPrice = document.querySelector("#discountedPrice");
let prodDesc = document.querySelector("#prodDesc");
let cartIcon = document.querySelector("#cartIcon");

if(!sessionStorage.getItem("username")){
    cartIcon.style.display = 'none'
}

let prodId =  sessionStorage.getItem("prodViewId");                                                   //sessionStorage.setItem("prodViewId");
let url = "http://localhost:8081/inventory/items/"+prodId;
let prodData = {};
fetch(url,{ method: "GET" })
            .then((response)=>{
                return response.json();
            })
            .then((prodInfo)=>{
                prodData = prodInfo.item;
                prodImg.src = "images/"+prodData.img;
                prodName.innerHTML = prodData.name;
                prodPrice.innerHTML = prodData.price+"EGP";
                let discount = prodData.price * (prodData.discount/100)
                discountedPrice.innerHTML = (prodData.price - discount)+"EGP";
                prodDesc.innerHTML = prodData.desc;
            })



function addToCart(itemId = prodId){
    if(sessionStorage.getItem("userCart")){
        let cart = JSON.parse( sessionStorage.getItem("userCart") );
        let canAdd = true;
        for(let i = 0; i<cart.length;i++){

            if( itemId == cart[i].item.id){
                cart[i].quantity+= 1;
                showSnackBar();
                canAdd = false;
            }
            
        }
        if(canAdd){
            cart.push({item:prodData,quantity:1});
            showSnackBar();
        }

        sessionStorage.setItem("userCart",JSON.stringify(cart));

    }
}
sessionStorage.removeItem("prodViewId");

function showSnackBar() {
    let x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
  }