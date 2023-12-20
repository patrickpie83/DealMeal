import"./bootstrap.min-d005857b.js";import"./header-d8c8e62b.js";const $=document.querySelector(".productsList"),v=document.querySelector(".pagination"),i="http://localhost:3000",g=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:e=>{e.onmouseenter=Swal.stopTimer,e.onmouseleave=Swal.resumeTimer}});function x(e){let a="";e.forEach(function(t){let o="",r="",n="";t.storage<=0||t.state=="完售中"?(n="完售中",o="soldOutFilter",r="d-none"):n=`即時庫存：${t.storage}份`,a+=`
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
              <p class="text-end mt-2 mt-lg-0 fs-7 text-dark-brown">${n}</p>
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
      `}),$.innerHTML=a}let b=[];function I(){axios.get(`${i}/products`).then(function(e){let a=e.data.length;for(let t=0;t<a;t++){let o=e.data[t],r=Math.floor(t/4)+1;o.page=r,b.push(o)}x(e.data)}).catch(function(e){console.log(e)})}I();function w(e){let a=localStorage.getItem("userId");if(!a)g.fire({icon:"warning",title:"請先登入會員"}).then(t=>{window.location.href="login.html"});else{let t,o,r,n,f;axios.get(`${i}/products/${e}`).then(function(s){t=s.data.image,o=s.data.series,r=s.data.name,n=s.data.price,axios.get(`${i}/users/${a}`).then(function(u){let h=crypto.randomUUID();u.data.cartExist?axios.get(`${i}/carts/${a}`).then(function(c){let d=c.data.cart,p=[];f=c.data.total;let m=!1;d.forEach(function(l){l.productId==e&&(l.quantity+=1,m=!0)}),m||d.push({productId:e,cartItemId:h,productImage:t,productSeries:o,productName:r,productPrice:n,quantity:1}),p=d,axios.patch(`${i}/carts/${a}`,{cart:p,total:f+n}).then(function(l){g.fire({icon:"success",title:"已加入購物車"}).then(y=>{location.reload()})}).catch(function(l){console.log(l)})}).catch(function(c){console.log(c)}):axios.post(`${i}/carts`,{id:a,cart:[{productId:e,cartItemId:h,productImage:t,productSeries:o,productName:r,productPrice:n,quantity:1}],total:n+80}).then(function(c){g.fire({icon:"success",title:"已加入購物車"}).then(d=>{location.reload()})}).catch(function(c){console.log(c)}),axios.patch(`${i}/users/${a}`,{cartExist:!0})}).catch(function(u){console.log(u)})}).catch(function(s){console.log(s)})}}$.addEventListener("click",function(e){if(e.target.getAttribute("data-js")==="addCartBtn"){let a=e.target.getAttribute("data-productId");w(a)}});v.addEventListener("click",function(e){e.preventDefault();let a=e.target.getAttribute("data-page");b.forEach(function(t){t.page==a&&console.log(t)})});
