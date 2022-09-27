const AUTOS_URL = ("https://japceibal.github.io/emercado-api/cats_products/"+localStorage.getItem("catID")+".json");
const ORDER_ASC_BY_COST = "Menor a mayor";
const ORDER_DESC_BY_COST = "Mayor a menor";
const ORDER_BY_PROD_SOLDCOUNT = "Rel.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function setProdID(id) {
    localStorage.setItem("productID", id);
    window.location = "product-info.html"
}

function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){

                htmlContentToAppend += `
                <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
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
        }
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}

document.addEventListener("DOMContentLoaded", function(){
    getJSONData(AUTOS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentProductsArray = resultObj.data;
            currentProductsArray = currentProductsArray.products;
            showProductsList()
        } else {
            alert("Ocurrió un error: " + resultObj.data);
        }
    });
    
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });
    
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });
    
    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });
    
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";
    
        minCount = undefined;
        maxCount = undefined;
    
        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }
        showProductsList();
    });
});

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("product-info").innerHTML="";
getJSONData(product_url).then(function(resultObj){
    if (resultObj.status === "ok"){
        productArray = resultObj.data;
        showProduct(productArray);
        }
}    
)
})