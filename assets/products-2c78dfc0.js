import"./bootstrap.min-f122c4cb.js";import"./header-3fefa29a.js";const B=document.querySelector(".productsList"),S=document.querySelector(".mobileSeriesFilter"),I=document.querySelector(".pcSeriesFilter"),C=document.querySelector(".pagination"),l="http://localhost:3000",y=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:o=>{o.onmouseenter=Swal.stopTimer,o.onmouseleave=Swal.resumeTimer}});let m=[],s,r="全部商品";function h(o){let n=["全部商品","塑身系列","增肌系列","早餐系列"],e="",a="";n.forEach(function(i){i==o?(e+=`
        <button type="button" class="fs-7 col-3 btn btn-primary rounded-0 text-light-brown active">${i}</button>
        `,a+=`
        <button type="button" class="btn btn-primary rounded-0 text-light-brown active">${i}</button>
        `):(e+=`
        <button type="button" class="fs-7 col-3 btn btn-primary rounded-0 text-light-brown">${i}</button>
        `,a+=`
        <button type="button" class="btn btn-primary rounded-0 text-light-brown">${i}</button>
        `)}),S.innerHTML=e,I.innerHTML=a}function f(o){let n="";o.forEach(function(t){let u="",p="",c="";t.storage<=0||t.state=="完售中"?(c="完售中",u="soldOutFilter",p="d-none"):c=`即時庫存：${t.storage}份`,n+=`
      <div class="col-6 mb-5 mb-lg-7 ${u} ">
        <div class="card rounded-0 border-0">
          <div class="position-relative">
            <div class="ratio ratio-1x1">
              <img src="${t.image}" alt="${t.name}">
            </div>
            <button class="${p} cardBtn py-4" data-js="addCartBtn" data-productId="${t.id}" >加入購物車</button>
          </div>
          <div class="mt-1 mt-lg-2 p-2 p-lg-3 border border-primary">
            <p class="fs-7 text-dark-brown">${t.series}</p>
            <div class="d-lg-flex justify-content-lg-between">
              <a class="stretched-link text-decoration-none" href="meal.html?id=${t.id}">
                <h3 class="productName">${t.name}</h3>
              </a>
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
        <button class="${p} cartIcon text-center d-lg-none py-1 w-100 border-0" data-js="addCartBtn" data-productId="${t.id}" >
          <img data-js="addCartBtn" src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_cart.png?raw=true" alt="icon_cart" style="height: 16px;" data-js="addCartBtn" data-productId="${t.id}">
        </button>
      </div>
      `}),B.innerHTML=n;let e="",a="",i=Math.ceil(m.length/4);if(i<=7){for(let t=1;t<=i;t++)s==t?a+=`
        <button class="btn btn-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
        `:a+=`
        <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
        `;i==1?e=a:s==1?e=`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous" disabled>
        <img src="../assets/images/icon_chevron_left.png" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${a}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next">
        <img src="../assets/images/icon_chevron_right.png" alt="" data-page="next" style="width: 16px;">
      </button>
      `:s==i?e=`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous">
        <img src="../assets/images/icon_chevron_left.png" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${a}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next" disabled>
        <img src="../assets/images/icon_chevron_right.png" alt="" data-page="next" style="width: 16px;">
      </button>
      `:e=`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous">
        <img src="../assets/images/icon_chevron_left.png" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${a}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next">
        <img src="../assets/images/icon_chevron_right.png" alt="" data-page="next" style="width: 16px;">
      </button>
      `}else{if(s<=4){for(let t=1;t<=6;t++)s==t?a+=`
          <button class="btn btn-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
          `:a+=`
          <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
          `;a+=`
      <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${i}">${i}</button>
      `}else if(s>=i-3){a+=`
      <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="1">1</button>
      `;for(let t=i-5;t<=i;t++)s==t?a+=`
          <button class="btn btn-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
          `:a+=`
          <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
          `}else if(s>4&&s<i-3){a+=`
      <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="1">1</button>
      `;for(let t=s-2;t<=s+2;t++)s==t?a+=`
          <button class="btn btn-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
          `:a+=`
          <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
          `;a+=`
      <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${i}">${i}</button>
      `}s==1?e=`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous" disabled>
        <img src="../assets/images/icon_chevron_left.png" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${a}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next">
        <img src="../assets/images/icon_chevron_right.png" alt="" data-page="next" style="width: 16px;">
      </button>
      `:s==i?e=`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous">
        <img src="../assets/images/icon_chevron_left.png" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${a}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next" disabled>
        <img src="../assets/images/icon_chevron_right.png" alt="" data-page="next" style="width: 16px;">
      </button>
      `:e=`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous">
        <img src="../assets/images/icon_chevron_left.png" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${a}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next">
        <img src="../assets/images/icon_chevron_right.png" alt="" data-page="next" style="width: 16px;">
      </button>
      `}C.innerHTML=e}function v(){axios.get(`${l}/products`).then(function(o){m=o.data,axios.get(`${l}/products?_page=1&_limit=4`).then(function(n){s=1,f(n.data),h(r)}).catch(function(n){console.log(n)})}).catch(function(o){console.log(o)})}v();function E(o){let n=localStorage.getItem("userId");if(!n)y.fire({icon:"warning",title:"請先登入會員"}).then(e=>{window.location.href="login.html"});else{let e,a,i,t,u,p;axios.get(`${l}/products/${o}`).then(function(c){e=c.data.image,a=c.data.series,i=c.data.storage,t=c.data.name,u=c.data.price,axios.get(`${l}/users/${n}`).then(function(x){let w=crypto.randomUUID();x.data.cartExist?axios.get(`${l}/carts/${n}`).then(function(d){let g=d.data.cart,$=[];p=d.data.total;let _=!1;g.forEach(function(b){b.productId==o&&(b.quantity+=1,_=!0)}),_||g.push({productId:o,cartItemId:w,productImage:e,productSeries:a,productStorage:i,productName:t,productPrice:u,quantity:1}),$=g,axios.patch(`${l}/carts/${n}`,{cart:$,total:p+u}).then(function(b){y.fire({icon:"success",title:"已加入購物車"}).then(L=>{location.reload()})}).catch(function(b){console.log(b)})}).catch(function(d){console.log(d)}):axios.post(`${l}/carts`,{id:n,cart:[{productId:o,cartItemId:w,productImage:e,productSeries:a,productStorage:i,productName:t,productPrice:u,quantity:1}],total:u+80}).then(function(d){y.fire({icon:"success",title:"已加入購物車"}).then(g=>{location.reload()})}).catch(function(d){console.log(d)}),axios.patch(`${l}/users/${n}`,{cartExist:!0})}).catch(function(x){console.log(x)})}).catch(function(c){console.log(c)})}}B.addEventListener("click",function(o){if(o.target.getAttribute("data-js")==="addCartBtn"){let n=o.target.getAttribute("data-productId");E(n)}});C.addEventListener("click",function(o){o.preventDefault();let n=o.target.getAttribute("data-page");n=="previous"?s-=1:n=="next"?s+=1:n&&(s=Number(n)),r=="全部商品"?axios.get(`${l}/products?_page=${s}&_limit=4`).then(function(e){f(e.data)}).catch(function(e){console.log(e)}):axios.get(`${l}/products?series=${r}&_page=${s}&_limit=4`).then(function(e){f(e.data)}).catch(function(e){console.log(e)})});S.addEventListener("click",function(o){r=o.target.textContent,h(r),r=="全部商品"?v():axios.get(`${l}/products?series=${r}`).then(function(n){m=n.data,axios.get(`${l}/products?series=${r}&_page=1&_limit=4`).then(function(e){s=1,f(e.data),h(r)}).catch(function(e){console.log(e)})}).catch(function(n){console.log(n)})});I.addEventListener("click",function(o){r=o.target.textContent,h(r),r=="全部商品"?v():axios.get(`${l}/products?series=${r}`).then(function(n){m=n.data,axios.get(`${l}/products?series=${r}&_page=1&_limit=4`).then(function(e){s=1,f(e.data),h(r)}).catch(function(e){console.log(e)})}).catch(function(n){console.log(n)})});
