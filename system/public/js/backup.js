function backup(){

let data=JSON.stringify(db);

let blob=new Blob([data],{type:"application/json"});

let a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="inventory_backup.json";

a.click();

}

function restore(file){

let reader=new FileReader();

reader.onload=function(){

let data=JSON.parse(reader.result);

localStorage.setItem("products",JSON.stringify(data.products));
localStorage.setItem("customers",JSON.stringify(data.customers));
localStorage.setItem("suppliers",JSON.stringify(data.suppliers));
localStorage.setItem("sales",JSON.stringify(data.sales));
localStorage.setItem("invoices",JSON.stringify(data.invoices));

location.reload();

}

reader.readAsText(file);

}