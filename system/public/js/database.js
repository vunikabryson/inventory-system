let db={

products:JSON.parse(localStorage.getItem("products"))||[],
customers:JSON.parse(localStorage.getItem("customers"))||[],
suppliers:JSON.parse(localStorage.getItem("suppliers"))||[],
sales:JSON.parse(localStorage.getItem("sales"))||[],
invoices:JSON.parse(localStorage.getItem("invoices"))||[]

}

function saveDB(){

localStorage.setItem("products",JSON.stringify(db.products));
localStorage.setItem("customers",JSON.stringify(db.customers));
localStorage.setItem("suppliers",JSON.stringify(db.suppliers));
localStorage.setItem("sales",JSON.stringify(db.sales));
localStorage.setItem("invoices",JSON.stringify(db.invoices));

}