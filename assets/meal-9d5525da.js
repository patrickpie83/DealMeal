import"./bootstrap.min-f122c4cb.js";import"./header-3fefa29a.js";const v=location.href.split("=")[1],g=document.querySelector(".mealDetail"),n="http://localhost:3000",h=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:e=>{e.onmouseenter=Swal.stopTimer,e.onmouseleave=Swal.resumeTimer}});function y(e){let a="",t=e[0],o="";t.storage>0?o=`
        <div class="d-flex align-items-center mb-4">
            <p class="mealQuatity me-3">數量</p>
             <input type="number" class="rounded-0 mx-2 border border-primary w-75" value="1" min="1" max="${t.storage}" data-js="addCartQuantity">
        </div>
        <button type="button" class="py-2 py-lg-3 mt-3 mt-lg-5 btn btn-primary text-light-brown w-100 rounded-0">加入購物車</button>
        `:o='<p class="mealQuatity">完售中</p>',a+=`
    <div class="row justify-content-between mb-7">
        <div class="col-lg-6">
            <div class="ratio ratio-1x1">
                <img src="${t.image}" alt="${t.name}">
            </div>
        </div>
        <div class="col-lg-6 d-flex flex-column justify-content-between mt-3 mt-lg-0">
            <div>
                <span class="mb-3 text-dark-brown">${t.series}</span>
                <h1 class="mealName mb-4 mb-lg-4">${t.name}</h1>
                <p class="mealStorage mb-lg-4">即時庫存：${t.storage}份</p>
                <p class="mealPrice fw-bold">售價：${t.price}元</p>
            </div>
            <div class="mt-4 mt-lg-0">
                ${o}
            </div>
        </div>
    </div>

    <h2 class="bg-light-brown fs-5 fw-normal py-2 text-lg-center">內容物</h2>
    <p class="py-5 text-lg-center fs-6">${t.ingredient}</p>
    <div class="row justify-content-between mb-7">
        <div class="col-lg-6 text-lg-center mb-5 mb-lg-0">
            <h2 class="bg-normal-brown fs-5 fw-normal py-2">營養標示</h2>
            <h3 class="fs-6 fw-bold pt-5 mb-1">每一份量</h3>
            <p>${t.nutrition.size}公克</p>
            <h3 class="fs-6 fw-bold pt-4 mb-1">熱量</h3>
            <p>${t.nutrition.calories}大卡</p>
            <h3 class="fs-6 fw-bold pt-4 mb-1">碳水化合物</h3>
            <p>${t.nutrition.carb}公克</p>
            <h3 class="fs-6 fw-bold pt-4 mb-1">蛋白質</h3>
            <p>${t.nutrition.protein}公克</p>
            <h3 class="fs-6 fw-bold pt-4 mb-1">脂肪</h3>
            <p>${t.nutrition.fat}公克</p>
        </div>
        <div class="col-lg-6 text-lg-center">
            <h2 class="bg-normal-brown fs-5 fw-normal py-2">加熱方式</h2>
            <h3 class="fs-6 fw-bold pt-5 mb-1">微波</h3>
            <p>${t.heat.microwave}</p>
            <h3 class="fs-6 fw-bold pt-4 mb-1">烤箱</h3>
            <p>${t.heat.oven}</p>
            <h3 class="fs-6 fw-bold pt-4 mb-1">電鍋</h3>
            <p>${t.heat.electricPot}</p>
            <h3 class="fs-6 fw-bold pt-4 mb-1">平底鍋</h3>
            <p>${t.heat.pan}</p>
        </div>
    </div>
    `,g.innerHTML=a}function I(){axios.get(`${n}/products?id=${v}`).then(function(e){y(e.data)}).catch(function(e){console.log(e)})}I();let x=1;g.addEventListener("change",function(e){e.target.getAttribute("data-js")=="addCartQuantity"&&(x=Number(e.target.value))});g.addEventListener("click",function(e){e.target.textContent=="加入購物車"&&S(v,x)});function S(e,a){let t=localStorage.getItem("userId");if(!t)h.fire({icon:"warning",title:"請先登入會員"}).then(o=>{window.location.href="login.html"});else{let o,d,p,u,i,b;axios.get(`${n}/products/${e}`).then(function(s){o=s.data.image,d=s.data.series,p=s.data.storage,u=s.data.name,i=s.data.price,axios.get(`${n}/users/${t}`).then(function(m){let w=crypto.randomUUID();m.data.cartExist?axios.get(`${n}/carts/${t}`).then(function(l){let c=l.data.cart,f=[];b=l.data.total;let $=!1;c.forEach(function(r){r.productId==e&&(r.quantity+=a,$=!0)}),$||c.push({productId:e,cartItemId:w,productImage:o,productSeries:d,productStorage:p,productName:u,productPrice:i,quantity:a}),f=c,axios.patch(`${n}/carts/${t}`,{cart:f,total:b+i*a}).then(function(r){h.fire({icon:"success",title:"已加入購物車"}).then(C=>{location.reload()})}).catch(function(r){console.log(r)})}).catch(function(l){console.log(l)}):axios.post(`${n}/carts`,{id:t,cart:[{productId:e,cartItemId:w,productImage:o,productSeries:d,productStorage:p,productName:u,productPrice:i,quantity:a}],total:i*a+80}).then(function(l){h.fire({icon:"success",title:"已加入購物車"}).then(c=>{location.reload()})}).catch(function(l){console.log(l)}),axios.patch(`${n}/users/${t}`,{cartExist:!0})}).catch(function(m){console.log(m)})}).catch(function(s){console.log(s)})}}
