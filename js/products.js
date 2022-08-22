const AUTOS_URL = "https://japceibal.github.io/emercado-api/cats_products/101.json";

let productsArray = [];

function showProductsList(array){
    let htmlContentToAppend = "";

    for(let i = 0; i < productsArray.length; i++){ 
        let product = productsArray[i];
        htmlContentToAppend += `
        <div  class="list-group-item list-group-item-action cursor-active">
        <div class="row">
            <div class="col-3">
                <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${product.name} - ${product.currency} - ${product.cost}</h4>
                    <small class="text-muted">${product.soldCount} artículos</small>
                </div>
                <p class="mb-1">${product.description}</p>
            </div>
        </div>
    </div>
    `
    document.getElementById("autos101").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(AUTOS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data.products;
            showProductsList(productsArray);
        } else {
            alert("Ocurrió un error: " + resultObj.data);
        }
    });
});


