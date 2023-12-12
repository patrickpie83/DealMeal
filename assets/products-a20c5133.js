import"./bootstrap.min-275429c0.js";import"./header-d5d66ed4.js";const h=document.querySelector(".productsList"),c="https://dealmealserver.onrender.com";function $(a){let e="";a.forEach(function(t){e+=`
        <div class="col-6 mb-5 mb-lg-7">
              <div class="card rounded-0 border-0">
                <div class="position-relative">
                  <div class="ratio ratio-1x1">
                    <img src="${t.image}" alt="${t.name}">
                  </div>
                  <button class="cardBtn py-4" data-js="addCartBtn" data-productId="${t.id}" >加入購物車</button>
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
                    
                  </div>
                </div>
              </div>
              <button class="cartIcon text-center d-lg-none py-1 w-100 border-0" data-js="addCartBtn" data-productId="${t.id}" >
                <img data-js="addCartBtn" src="../assets/images/icon_cart.png" alt="icon_cart" style="height: 16px;">
              </button>
            </div>
        `}),h.innerHTML=e}function b(){axios.get(`${c}/products`).then(function(a){$(a.data)}).catch(function(a){console.log(a)})}b();function v(a){let e=localStorage.getItem("userId");if(!e)alert("請先登入會員"),window.location.href="login.html";else{let t,s,l,n,g;axios.get(`${c}/products/${a}`).then(function(o){t=o.data.image,s=o.data.series,l=o.data.name,n=o.data.price,axios.get(`${c}/users/${e}`).then(function(u){let f=crypto.randomUUID();u.data.cartExist?axios.get(`${c}/carts/${e}`).then(function(r){let i=r.data.cart,p=[];g=r.data.total;let m=!1;i.forEach(function(d){d.productId==a&&(d.quantity+=1,m=!0)}),m||i.push({productId:a,cartItemId:f,productImage:t,productSeries:s,productName:l,productPrice:n,quantity:1}),p=i,axios.patch(`${c}/carts/${e}`,{cart:p,total:g+n}).then(function(d){alert("已加入購物車")}).catch(function(d){console.log(d)})}).catch(function(r){console.log(r)}):axios.post(`${c}/carts`,{id:e,cart:[{productId:a,cartItemId:f,productImage:t,productSeries:s,productName:l,productPrice:n,quantity:1}],total:n+80}).then(function(r){alert("已加入購物車")}).catch(function(r){console.log(r)}),axios.patch(`${c}/users/${e}`,{cartExist:!0})}).catch(function(u){console.log(u)})}).catch(function(o){console.log(o)})}}h.addEventListener("click",function(a){if(a.target.getAttribute("data-js")==="addCartBtn"){let e=a.target.getAttribute("data-productId");v(e)}});
