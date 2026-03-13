let products = [];


function addProduct(){

let name = document.getElementById("prodName").value;
let price = document.getElementById("prodPrice").value;
let qty = document.getElementById("prodQty").value;
let supplier = document.getElementById("prodSupplier").value;

let product = {
name:name,
price:price,
qty:qty,
supplier:supplier
};

products.push(product);

displayProducts();

document.getElementById("prodName").value="";
document.getElementById("prodPrice").value="";
document.getElementById("prodQty").value="";
}


function displayProducts(){

let table = document.getElementById("productList");
table.innerHTML="";

products.forEach((p,index)=>{

let row = `
<tr>

<td>${index+1}</td>

<td>${p.name}</td>

<td>${p.price}</td>

<td>${p.qty}</td>

<td>${p.supplier}</td>

<td>
<button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
</td>

</tr>
`;

table.innerHTML += row;

});

}


function deleteProduct(index){

products.splice(index,1);

displayProducts();

}


function saveProductsDB(){

localStorage.setItem("products",JSON.stringify(products));

alert("Products saved successfully");

}


/* Load saved products */

window.onload = function(){

let saved = localStorage.getItem("products");

if(saved){

products = JSON.parse(saved);

displayProducts();

}

}


/* SEARCH */

function searchProducts(){

let input = document.getElementById("searchProduct").value.toLowerCase();

let rows = document.querySelectorAll("#productList tr");

rows.forEach(row=>{

let name = row.cells[1].textContent.toLowerCase();

if(name.includes(input)){
row.style.display="";
}
else{
row.style.display="none";
}

});

}