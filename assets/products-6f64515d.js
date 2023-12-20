import"./bootstrap.min-d005857b.js";import"./header-1a60f231.js";const h=document.querySelector(".productsList"),m=document.querySelector(".pagination");function b(a){let e="";a.forEach(function(t){let o="",r="",c="";t.storage<=0||t.state=="完售中"?(c="完售中",o="soldOutFilter",r="d-none"):c=`即時庫存：${t.storage}份`,e+=`
      <div class="col-6 mb-5 mb-lg-7 ${o} ">
        <div class="card rounded-0 border-0">
          <div class="position-relative">
            <div class="ratio ratio-1x1">
              <img src="${t.image}" alt="${t.name}">
            </div>
            <button class="${r} cardBtn py-4" data-js="addCartBtn" data-productId="${t.id}" >加入購物車</button>
          </div>
          <div class="mt-1 mt-lg-2 p-2 p-lg-3 border border-primary">
            <div class="d-lg-flex justify-content-lg-between">
              <a class="stretched-link text-decoration-none" href="meal.html?id=${t.id}"><h3 class="productName">${t.name}</h3></a>
              <p class="text-end mt-2 mt-lg-0 fs-7 text-dark-brown">${c}</p>
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
        <button class="${r} cartIcon text-center d-lg-none py-1 w-100 border-0" data-js="addCartBtn" data-productId="${t.id}" >
          <img data-js="addCartBtn" src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_cart.png?raw=true" alt="icon_cart" style="height: 16px;" data-js="addCartBtn" data-productId="${t.id}">
        </button>
      </div>
      `}),h.innerHTML=e}let $=[];function v(){axios.get(`${_url}/products`).then(function(a){let e=a.data.length;for(let t=0;t<e;t++){let o=a.data[t],r=Math.floor(t/4)+1;o.page=r,$.push(o)}b(a.data)}).catch(function(a){console.log(a)})}v();function x(a){let e=localStorage.getItem("userId");if(!e)Toast.fire({icon:"warning",title:"請先登入會員"}).then(t=>{window.location.href="login.html"});else{let t,o,r,c,p;axios.get(`${_url}/products/${a}`).then(function(i){t=i.data.image,o=i.data.series,r=i.data.name,c=i.data.price,axios.get(`${_url}/users/${e}`).then(function(s){let g=crypto.randomUUID();s.data.cartExist?axios.get(`${_url}/carts/${e}`).then(function(n){let d=n.data.cart,u=[];p=n.data.total;let f=!1;d.forEach(function(l){l.productId==a&&(l.quantity+=1,f=!0)}),f||d.push({productId:a,cartItemId:g,productImage:t,productSeries:o,productName:r,productPrice:c,quantity:1}),u=d,axios.patch(`${_url}/carts/${e}`,{cart:u,total:p+c}).then(function(l){Toast.fire({icon:"success",title:"已加入購物車"}).then(I=>{location.reload()})}).catch(function(l){console.log(l)})}).catch(function(n){console.log(n)}):axios.post(`${_url}/carts`,{id:e,cart:[{productId:a,cartItemId:g,productImage:t,productSeries:o,productName:r,productPrice:c,quantity:1}],total:c+80}).then(function(n){Toast.fire({icon:"success",title:"已加入購物車"}).then(d=>{location.reload()})}).catch(function(n){console.log(n)}),axios.patch(`${_url}/users/${e}`,{cartExist:!0})}).catch(function(s){console.log(s)})}).catch(function(i){console.log(i)})}}h.addEventListener("click",function(a){if(a.target.getAttribute("data-js")==="addCartBtn"){let e=a.target.getAttribute("data-productId");x(e)}});m.addEventListener("click",function(a){a.preventDefault();let e=a.target.getAttribute("data-page");$.forEach(function(t){t.page==e&&console.log(t)})});
