console.log(sessionStorage.getItem("prodFilter"));

let cartIcon = document.querySelector("#cartIcon");
let signoutIcon = document.querySelector("#signoutIcon");


if(!sessionStorage.getItem("prodFilter")){
sessionStorage.setItem("prodFilter","all")
}

if(!sessionStorage.getItem("username")){
    signoutIcon.style.display = "none";
    cartIcon.style.display = 'none'
}

let searchBox = document.querySelector("#search-box-product");
let productsContainer = document.querySelector("#products-container");

function searchProduct(searchValue){
    let searchResult = [];
    for(let i = 0; i<productList.length;i++){
        if(productList[i].name.toLowerCase().includes(searchValue.toLowerCase())){
            searchResult.push(productList[i])
        }
    }
    if(searchValue == ""){
        showProducts(productList);
    }
    else{
        showProducts(searchResult)
    }
    
}

let productList = []
let url = "http://localhost:8081/inventory/items";

fetch(url)
    .then(response=>response.json())
    .then(data=>{
        productList = data;
        console.log(productList);
        if(sessionStorage.getItem("prodFilter") == "all"){

            showProducts(productList);
            
        }
        else{
            fList = filterProduct(sessionStorage.getItem("prodFilter"));
            showProducts(fList);
            sessionStorage.setItem("prodFilter","all");

        }
        
    })








function showProducts(prodList){
    let products = "";
    for(let i = 0;i<prodList.length;i++){
        products+= `<div class="box">
        <span class="discount">-${prodList[i].discount}%</span>
        <div class="icons">
            <a class="fas fa-heart"></a>
            <a class="fas fa-share"></a>
            <a class="fas fa-eye" onclick="viewProduct(${prodList[i].id});"></a>
        </div>
        <img src="images/${prodList[i].img}" alt="" />
        <h3>${prodList[i].name}</h3>
        <div class="stars">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
        </div>
        <div class="price">${prodList[i].price-prodList[i].price*(prodList[i].discount/100)}EGP<span>${prodList[i].price}EGP </span></div>
        <div class="quantity">
            <span>quantity : </span>
            <input type="number" min="1" max="1000" value="1" class="quantity-add" id="${prodList[i].id}"/>
            <span> /kg </span>
        </div>
        <a onclick='addToCard(${prodList[i].id});' class="btn">add to cart</a>
    </div>`;
    }

    productsContainer.innerHTML = products;

}



function addToCard(itemId){

    if(sessionStorage.getItem("userCart")){

        let cart = JSON.parse( sessionStorage.getItem("userCart") );
        let canAdd = true;
        for(let i = 0; i<cart.length;i++){

            if( itemId == cart[i].item.id){
                cart[i].quantity+= Number(document.getElementById(itemId+"").value);
                showSnackBar();
                canAdd = false;
            }
            
        }
        if(canAdd){

            let rightItem = productList.find(rightItem => rightItem.id === itemId);
            let rightQuantity = document.getElementById(itemId+"").value;
            cart.push({item:rightItem,quantity:Number(rightQuantity)});
            showSnackBar();
        }

        console.log(cart);
        sessionStorage.setItem("userCart",JSON.stringify(cart));


    }


}




function viewProduct(prodId){

    sessionStorage.setItem("prodViewId",prodId);
    window.location.href = "./product_details.html";

}

function signout(){
    cartIcon.style.display = "none";
    signoutIcon.style.display = "none";
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userCart");
}

function showSnackBar() {
    let x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
  }

  function filterProduct(filter){
    let filterList = [];
            for(let i = 0;i<productList.length;i++){
                if(productList[i].type == filter){
                    filterList.push(productList[i]);
                }
            }
    
    return filterList;
  }


