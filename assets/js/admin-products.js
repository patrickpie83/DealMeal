const productListContent=document.querySelector(".productListContent");

// const _url="https://dealmealserver.onrender.com";
const _url="http://localhost:3000";


//初始
init();

function init(){
    axios.get(`${_url}/products`)
    .then(function(res){
        renderProductsList(res.data);
    })
    .catch(function(err){
        console.log(err);
    })
}


function renderProductsList(data){
    console.log(data)

    let str="";

    data.forEach(function(item){

        let productStateStr="";
        let productState = item.state;
        if(productState == "販售中"){
            productStateStr=`
            <td>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${item.name}" id="onSale-${item.name}" checked>
                    <label class="form-check-label" for="onSale-${item.name}">
                        販售中
                    </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input ms-auto" type="radio" name="productState-${item.name}" id="soldOut-${item.name}">
                <label class="form-check-label" for="soldOut-${item.name}">
                    完售中
                </label>
                </div>
            </td>
            `
        }else{
            productStateStr=`
            <td>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${item.name}" id="onSale-${item.name}" checked>
                    <label class="form-check-label" for="onSale-${item.name}">
                        販售中
                    </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input ms-auto" type="radio" name="productState-${item.name}" id="soldOut-${item.name}">
                <label class="form-check-label" for="soldOut-${item.name}">
                    完售中
                </label>
                </div>
            </td>
            `
        }

        let storageStatusStr="";
        if(item.storage <= 0){
            storageStatusStr=`<span class="text-danger">庫存量：無</span>`;
        }else if(item.storage <= 10){
            storageStatusStr=`<span class="text-info">庫存量：低</span>`;
        }else if(item.storage <= 20){
            storageStatusStr=`<span class="text-success">庫存量：中</span>`;
        }else{
            storageStatusStr=`<span class="text-primary">庫存量：高</span>`;
        }

        str+=`
        <tr class="align-middle border border-primary">
            <td class="p-3" style="width: 110px;">
                <div class="ratio ratio-1x1 ">
                    <img src="${item.image}" alt="${item.name}">
                </div>
            </td>
            <td>${item.series}</td>
            <td>${item.name}</td>
            <td>${item.price}元</td>
            ${productStateStr}
            <td>
                <span>${item.storage}份，</span>
                ${storageStatusStr}
            </td>
            <td>
                <input type="number" disabled>
            </td>
            <td>
                <a href="admin-detail.html?id=${item.id}">詳細內容</a>
            </td>
        </tr>
        `
    })

    productListContent.innerHTML = str;
}