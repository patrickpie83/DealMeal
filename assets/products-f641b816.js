import"./bootstrap.min-f122c4cb.js";import"./header-cf4ee72a.js";const B=document.querySelector(".productsList"),S=document.querySelector(".mobileSeriesFilter"),k=document.querySelector(".pcSeriesFilter"),I=document.querySelector(".pagination"),l="https://dealmealserver.onrender.com",y=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:o=>{o.onmouseenter=Swal.stopTimer,o.onmouseleave=Swal.resumeTimer}});let f=[],r,s="全部商品";function h(o){let n=["全部商品","塑身系列","增肌系列","早餐系列"],e="",a="";n.forEach(function(i){i==o?(e+=`
        <button type="button" class="fs-7 col-3 btn btn-primary rounded-0 text-light-brown active">${i}</button>
        `,a+=`
        <button type="button" class="btn btn-primary rounded-0 text-light-brown active">${i}</button>
        `):(e+=`
        <button type="button" class="fs-7 col-3 btn btn-primary rounded-0 text-light-brown">${i}</button>
        `,a+=`
        <button type="button" class="btn btn-primary rounded-0 text-light-brown">${i}</button>
        `)}),S.innerHTML=e,k.innerHTML=a}function m(o){let n="";o.forEach(function(t){let u="",d="",c="";t.storage<=0||t.state=="完售中"?(c="完售中",u="soldOutFilter",d="d-none"):c=`即時庫存：${t.storage}份`,n+=`
      <div class="col-6 mb-5 mb-lg-7 ${u} ">
        <div class="card rounded-0 border-0">
          <div class="position-relative">
            <div class="ratio ratio-1x1">
              <img src="${t.image}" alt="${t.name}">
            </div>
            <button class="${d} cardBtn py-4" data-js="addCartBtn" data-productId="${t.id}" >加入購物車</button>
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
        <button class="${d} cartIcon text-center d-lg-none py-1 w-100 border-0" data-js="addCartBtn" data-productId="${t.id}" >
          <img data-js="addCartBtn" src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_cart.png?raw=true" alt="icon_cart" style="height: 16px;" data-js="addCartBtn" data-productId="${t.id}">
        </button>
      </div>
      `}),B.innerHTML=n;let e="",a="",i=Math.ceil(f.length/4);if(i<=7){for(let t=1;t<=i;t++)r==t?a+=`
        <button class="btn btn-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
        `:a+=`
        <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
        `;i==1?e=a:r==1?e=`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous" disabled>
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_left.png?raw=true" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${a}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_right.png?raw=true" alt="" data-page="next" style="width: 16px;">
      </button>
      `:r==i?e=`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_left.png?raw=true" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${a}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next" disabled>
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_right.png?raw=true" alt="" data-page="next" style="width: 16px;">
      </button>
      `:e=`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_left.png?raw=true" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${a}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_right.png?raw=true" alt="" data-page="next" style="width: 16px;">
      </button>
      `}else{if(r<=4){for(let t=1;t<=6;t++)r==t?a+=`
          <button class="btn btn-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
          `:a+=`
          <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
          `;a+=`
      <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${i}">${i}</button>
      `}else if(r>=i-3){a+=`
      <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="1">1</button>
      `;for(let t=i-5;t<=i;t++)r==t?a+=`
          <button class="btn btn-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
          `:a+=`
          <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
          `}else if(r>4&&r<i-3){a+=`
      <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="1">1</button>
      `;for(let t=r-2;t<=r+2;t++)r==t?a+=`
          <button class="btn btn-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
          `:a+=`
          <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${t}">${t}</button>
          `;a+=`
      <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${i}">${i}</button>
      `}r==1?e=`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous" disabled>
        <img src=".https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_left.png?raw=true" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${a}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_right.png?raw=true" alt="" data-page="next" style="width: 16px;">
      </button>
      `:r==i?e=`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_left.png?raw=true" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${a}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next" disabled>
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_right.png?raw=true" alt="" data-page="next" style="width: 16px;">
      </button>
      `:e=`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_left.png?raw=true" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${a}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_right.png?raw=true" alt="" data-page="next" style="width: 16px;">
      </button>
      `}I.innerHTML=e}function w(){axios.get(`${l}/products`).then(function(o){f=o.data,axios.get(`${l}/products?_page=1&_limit=4`).then(function(n){r=1,m(n.data),h(s)}).catch(function(n){console.log(n)})}).catch(function(o){console.log(o)})}w();function M(o){let n=localStorage.getItem("userId");if(!n)y.fire({icon:"warning",title:"請先登入會員"}).then(e=>{window.location.href="login.html"});else{let e,a,i,t,u,d;axios.get(`${l}/products/${o}`).then(function(c){e=c.data.image,a=c.data.series,i=c.data.storage,t=c.data.name,u=c.data.price,axios.get(`${l}/users/${n}`).then(function(x){let v=crypto.randomUUID();x.data.cartExist?axios.get(`${l}/carts/${n}`).then(function(p){let b=p.data.cart,$=[];d=p.data.total;let _=!1;b.forEach(function(g){g.productId==o&&(g.quantity+=1,_=!0)}),_||b.push({productId:o,cartItemId:v,productImage:e,productSeries:a,productStorage:i,productName:t,productPrice:u,quantity:1}),$=b,axios.patch(`${l}/carts/${n}`,{cart:$,total:d+u}).then(function(g){y.fire({icon:"success",title:"已加入購物車"}).then(D=>{location.reload()})}).catch(function(g){console.log(g)})}).catch(function(p){console.log(p)}):axios.post(`${l}/carts`,{id:n,cart:[{productId:o,cartItemId:v,productImage:e,productSeries:a,productStorage:i,productName:t,productPrice:u,quantity:1}],total:u+80}).then(function(p){y.fire({icon:"success",title:"已加入購物車"}).then(b=>{location.reload()})}).catch(function(p){console.log(p)}),axios.patch(`${l}/users/${n}`,{cartExist:!0})}).catch(function(x){console.log(x)})}).catch(function(c){console.log(c)})}}B.addEventListener("click",function(o){if(o.target.getAttribute("data-js")==="addCartBtn"){let n=o.target.getAttribute("data-productId");M(n)}});I.addEventListener("click",function(o){o.preventDefault();let n=o.target.getAttribute("data-page");n=="previous"?r-=1:n=="next"?r+=1:n&&(r=Number(n)),s=="全部商品"?axios.get(`${l}/products?_page=${r}&_limit=4`).then(function(e){m(e.data)}).catch(function(e){console.log(e)}):axios.get(`${l}/products?series=${s}&_page=${r}&_limit=4`).then(function(e){m(e.data)}).catch(function(e){console.log(e)})});S.addEventListener("click",function(o){s=o.target.textContent,h(s),s=="全部商品"?w():axios.get(`${l}/products?series=${s}`).then(function(n){f=n.data,axios.get(`${l}/products?series=${s}&_page=1&_limit=4`).then(function(e){r=1,m(e.data),h(s)}).catch(function(e){console.log(e)})}).catch(function(n){console.log(n)})});k.addEventListener("click",function(o){s=o.target.textContent,h(s),s=="全部商品"?w():axios.get(`${l}/products?series=${s}`).then(function(n){f=n.data,axios.get(`${l}/products?series=${s}&_page=1&_limit=4`).then(function(e){r=1,m(e.data),h(s)}).catch(function(e){console.log(e)})}).catch(function(n){console.log(n)})});
