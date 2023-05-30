let cartIcon = document.querySelector("#cartIcon");
let signoutIcon = document.querySelector("#signoutIcon")
let productsContainer = document.querySelector("#products-container");

console.log("hello");

if(!sessionStorage.getItem("username")){
    signoutIcon.style.display = "none";
    cartIcon.style.display = 'none'
}

function signout(){
    signoutIcon.style.display = "none";
    cartIcon.style.display = 'none'
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("userCart")
}

function shopByCategory(category){
    sessionStorage.setItem("prodFilter",category);
    window.location.href = "./products.html";
}



let url = "http://localhost:8081/inventory/items";
let hotProducts = [];
fetch(url)
    .then(response=>response.json())
    .then(data=>{
        
        for(let i = 0; i<data.length;i++){
            if(data[i].discount>=25){
                hotProducts.push(data[i]);
            }
        }
        console.log(hotProducts);
        showProducts(hotProducts);
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
        <a onclick='addToCard(${prodList[i].id});' class="btn">add to cart</a>
    </div>`;
    }

    productsContainer.innerHTML = products;

}






function viewProduct(prodId){

        sessionStorage.setItem("prodViewId",prodId);
        window.location.href = "./product_details.html";
    
}

function addToCard(itemId){

    if(sessionStorage.getItem("userCart") && sessionStorage.getItem("userCart")){

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

            let rightItem = hotProducts.find(rightItem => rightItem.id === itemId);
            cart.push({item:rightItem,quantity:1});
            showSnackBar();
        }

        sessionStorage.setItem("userCart",JSON.stringify(cart));


    }


}


function showSnackBar() {
    let x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2000);
  }