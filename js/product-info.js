const PRODUCT_INFO = ("https://japceibal.github.io/emercado-api/products/"+localStorage.getItem("productID")+".json");
const COMMENTS_INFO = ("https://japceibal.github.io/emercado-api/products_comments/"+localStorage.getItem("productID")+".json");

function showInfoProds(product) {
    let prodImages = "";

    for (let imagen of product.images) {
        prodImages += `<img src="${imagen}" class="img-thumbnail i col-sm-3"></img>`
    } let htmlContentToAppend = `
                <div>
                    <div class="justify-content-start">
                        <h3>${product.name}</h3>
                        <hr>
                        <label><strong>Precio</strong></label>
                        <p>${product.currency} ${product.cost}</p>
                        <label><strong>Descripción</strong></label>
                        <p>${product.description}</p>
                        <label><strong>Categoría</strong></label>
                        <p>${product.category}<p>
                        <label><strong>Cantidad de vendidos</strong></label>
                        <p>${product.soldCount} artículos</p>
                        <label><strong>Imagenes ilustrativas</strong></label>
                        <div class="prodImages">${prodImages}</div>
                    </div>
                </div>
    `
    document.getElementById("products-info-container").innerHTML = htmlContentToAppend;
}

function showProductComments(comment) {
    let htmlContentToAppend = "";
    let stars = "";
    htmlContentToAppend += ""

    for (let i = 0; i < comment.length; i++) {
        let comments  = comment[i];
        stars ="";           
            for(let i= 0; i < (comments.score); i++) {
               stars +=  `<span class="fa fa-star checked"> </span>` 
            }
            for(let i=0; i<(5 - (comments.score)); i++){
                stars += `<span class="fa fa-star "> </span>` 
            }
   
        htmlContentToAppend += ` 
        <div class="caja-comments">
        <p> <strong> `+ comments.user  + `</strong> ` + " - " + comments.dateTime +  stars + `</p> 
        <p> `+ comments.description +`</p>     
        </div>
        ` 
        }
    document.getElementById("comentarios").innerHTML = htmlContentToAppend;
}



document.addEventListener("DOMContentLoaded", function () {
    getJSONData(COMMENTS_INFO).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ;
            showProductComments(resultObj.data);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    getJSONData(PRODUCT_INFO).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ;
            showInfoProds(resultObj.data);
        }
    });
});