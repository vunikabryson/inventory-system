if(localStorage.getItem('loggedIn') !== 'true') {
  window.location.href = 'login.html';
}
let cart=[];

function addToCart(){

let id=document.getElementById("productSelect").value;
let qty=document.getElementById("qty").value;

let product=db.products.find(p=>p.id==id);

if(product.qty<qty){

alert("Not enough stock");
return;

}

cart.push({

id:product.id,
name:product.name,
price:product.price,
qty:Number(qty),
total:product.price*qty

});

renderCart();

}

function renderCart(){

let table=document.getElementById("cart");

table.innerHTML="";

let total=0;

cart.forEach(i=>{

total+=i.total;

table.innerHTML+=`
<tr>
<td>${i.name}</td>
<td>${i.qty}</td>
<td>${i.total}</td>
</tr>
`;

});

document.getElementById("total").innerText="Total: "+total;

}