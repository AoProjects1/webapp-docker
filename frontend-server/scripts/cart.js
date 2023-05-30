if(!sessionStorage.getItem("username")){
    window.location.href = "./login.html";
}

let cartIcon = document.querySelector("#cartIcon");
let signoutIcon = document.querySelector("#signoutIcon");
let shopCart = document.querySelector(".shop");
let subtotalAmount = document.querySelector("#subtotal-money");
let taxAmount = document.querySelector("#tax-money");
let totalAmount = document.querySelector("#total-money");


let totalCheckout = 0;

let cartItems = JSON.parse( sessionStorage.getItem("userCart") );
console.log(cartItems);
showCartItems(cartItems);
updateTotal();

function showCartItems(){
    let itemsContainer = "";
    for(let i = 0;i<cartItems.length;i++){
        itemsContainer+= `<div class="box">
        <img src="images/${cartItems[i].item.img}" />
        <div class="content">
            <h3>${cartItems[i].item.name}</h3>
            <h4>Price: ${cartItems[i].item.price-cartItems[i].item.price*(cartItems[i].item.discount/100)}EGP</h4>
            <p class="unit">Quantity: <input id="${cartItems[i].item.id}" name="" value="${cartItems[i].quantity}" onkeyup="updateQuantity(${cartItems[i].item.id})" /></p>
            <button class="btn-area btn2" value="0" onclick="deleteItem('${cartItems[i].item.id}')">
                <i aria-hidden="true" class="fa fa-trash"></i> Remove
            </button>
        </div>
        </div>`;
    }

    shopCart.innerHTML = itemsContainer;

}



function updateQuantity(itemId){

    
    newQuantity = Number(document.getElementById(itemId+"").value)
    console.log(typeof(newQuantity));
    for(let i = 0;i<cartItems.length;i++){
        if(itemId == cartItems[i].item.id){
            cartItems[i].quantity = newQuantity;
            sessionStorage.setItem("userCart",JSON.stringify(cartItems));
            updateTotal()
        }
    }



}
function deleteItem(itemId){

    for(let i = 0;i<cartItems.length;i++){
        if(itemId == cartItems[i].item.id){
            cartItems.splice(i,1);
            sessionStorage.setItem("userCart",JSON.stringify(cartItems));
            showCartItems()
            updateTotal()
        }
    }

}





function signout(){
    signoutIcon.style.display = "none";
    cartIcon.style.display = 'none'
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("userCart")
}

function updateTotal(){
    let subtotal = 0;
    for(let i = 0;i<cartItems.length;i++){
        discountAmount = cartItems[i].item.price*(cartItems[i].item.discount/100);
        subtotal+= (cartItems[i].item.price-discountAmount) * cartItems[i].quantity;
    }
    tax = Math.round(subtotal*(5/100));
    delivery = 20;
    subtotalAmount.innerHTML = subtotal+"EGP";
    taxAmount.innerHTML = tax+"EGP";
    total = subtotal + tax + delivery;
    totalCheckout = total;
    totalAmount.innerHTML = total+"EGP";

}

function checkout(){
    if(totalCheckout > 20){
        sessionStorage.setItem("checkoutTotal",totalCheckout);
        window.location.href = "./checkout.html";
    }
    else{
        alert("Empty Cart");
    }



}