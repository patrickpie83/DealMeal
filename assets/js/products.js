//產品列表頁面
const productsList=document.querySelector(".productsList");
const _url="https://dealmealserver.onrender.com";

//渲染內容
function renderProducts(data){
    let str="";

    data.forEach(function(item){

        //要判斷狀態，若完售中，文字要改變。若販售中，要顯示庫存
        str+=`
        <div class="col-6 mb-5 mb-lg-7" data-page="${item.page}">
              <div class="card rounded-0 border-0">
                <div class="position-relative">
                  <div class="ratio ratio-1x1">
                    <img src="${item.image}" alt="${item.name}">
                  </div>
                  <button class="cardBtn py-4" data-productId="${item.id}">加入購物車</button>
                </div>
                <div class="mt-1 mt-lg-2 p-2 p-lg-3 border border-primary">
                  <div class="d-lg-flex justify-content-lg-between">
                    <a class="stretched-link text-decoration-none" href="meal.html?id=${item.id}"><h3 class="productName">${item.name}</h3></a>
                    <p class="text-end mt-2 mt-lg-0 fs-7 text-dark-brown">即時庫存：${item.storage}份</p>
                  </div>
                  <div class="mt-3 mt-lg-4 d-lg-flex justify-content-lg-between align-items-lg-end">
                    <div class="productNutrition">
                      <p>熱量：${item.nutrition.calories}大卡
                      <br>碳水化合物：${item.nutrition.carb}公克
                      <br>蛋白質：${item.nutrition.protein}公克
                      <br>脂肪：${item.nutrition.fat}公克 
                      </p>
                    </div>
                    <p class="productPrice fw-bold mt-3 mt-lg-0">售價：${item.price}元</p>
                    <div class="bg-light-brown text-center mt-3 d-lg-none">
                      <img src="../assets/images/icon_cart.png" alt="icon_cart" data-productId="${item.id}" style="height: 16px;">
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `
    })

    productsList.innerHTML=str;
}

function apiGetProducts(){
    axios.get(`${_url}/products`)
    .then(function(res){
        renderProducts(res.data);
    })
    .catch(function(err){
        console.log(err);
    })
}

apiGetProducts();