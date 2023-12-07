import"./bootstrap.min-9e46bc63.js";const n=document.querySelector(".productsList"),o="https://dealmealserver.onrender.com";function s(r){let d="";r.forEach(function(t){d+=`
        <div class="col-6 mb-5 mb-lg-7" data-page="${t.page}">
              <div class="card rounded-0 border-0">
                <div class="position-relative">
                  <div class="ratio ratio-1x1">
                    <img src="${t.image}" alt="${t.name}">
                  </div>
                  <button class="cardBtn py-4" data-productId="${t.id}">加入購物車</button>
                </div>
                <div class="mt-1 mt-lg-2 p-2 p-lg-3 border border-primary">
                  <div class="d-lg-flex justify-content-lg-between">
                    <a class="stretched-link text-decoration-none" href="meal.html?id=${t.id}"><h3 class="productName">${t.name}</h3></a>
                    <p class="text-end mt-2 mt-lg-0 fs-7 text-dark-brown">即時庫存：${t.storage}份</p>
                  </div>
                  <div class="mt-3 mt-lg-4 d-lg-flex justify-content-lg-between align-items-lg-end">
                    <div class="productNutrition">
                      <p>熱量：${t.nutrition.calories}大卡
                      <br>碳水化合物：${t.nutrition.carb}公克
                      <br>蛋白質：${t.nutrition.protein}公克
                      <br>脂肪：${t.nutrition.fat}公克 
                      </p>
                    </div>
                    <p class="productPrice fw-bold mt-3 mt-lg-0">售價：${t.price}元</p>
                    <div class="bg-light-brown text-center mt-3 d-lg-none">
                      <img src="../assets/images/icon_cart.png" alt="icon_cart" data-productId="${t.id}" style="height: 16px;">
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `}),n.innerHTML=d}function a(){axios.get(`${o}/products`).then(function(r){s(r.data)}).catch(function(r){console.log(r)})}a();
