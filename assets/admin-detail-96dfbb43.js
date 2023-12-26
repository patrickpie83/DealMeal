import"./bootstrap.min-f122c4cb.js";import"./admin-header-e186e282.js";const u=document.querySelector(".detailContent"),B=document.querySelector(".deleteBtn"),L=document.querySelector(".sendBtn");let a,f,P,v,r,o,m,b,x,g,y,w,h,S,$,k,q;const d=location.href.split("=")[1],n="http://localhost:3000",i=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:e=>{e.onmouseenter=Swal.stopTimer,e.onmouseleave=Swal.resumeTimer}});T();function T(){axios.get(`${n}/products/${d}`).then(function(e){I(e.data)}).catch(function(e){console.log(e)})}function I(e){let t="",l="";e.series=="塑身系列"?l=`
        <option value="塑身系列" selected>塑身系列</option>
        <option value="增肌系列">增肌系列</option>
        <option value="早餐系列">早餐系列</option>
        `:e.series=="增肌系列"?l=`
        <option value="塑身系列">塑身系列</option>
        <option value="增肌系列" selected>增肌系列</option>
        <option value="早餐系列">早餐系列</option>
        `:e.series=="早餐系列"&&(l=`
        <option value="塑身系列">塑身系列</option>
        <option value="增肌系列">增肌系列</option>
        <option value="早餐系列" selected>早餐系列</option>
        `),t=`
    <div class="col-6">
        <div class="d-flex flex-column px-7 py-5 border border-primary rounded-40 h-100">
            <span class="fs-4 mb-4">圖片</span>
            <span>預覽圖片</span>
            <div class="ratio ratio-1x1 w-100 mb-4 imgArea">
                <img src="${e.image}" alt="${e.name}">
            </div>
            <span>圖片網址</span>
            <div class="d-flex">
                <input class="imgInput" type="text" style="width: 65%;" value="${e.image}">
                <button type="button" class="btn btn-normal-brown ms-3" data-js="預覽圖片">預覽</button>
                <button type="button" class="btn btn-danger ms-3" data-js="移除圖片">移除</button>
            </div>
        </div>
    </div>


    <div class="col-6">
        <div class="px-7 py-5 mb-2 border border-primary rounded-40">
            <label class="fs-4 d-block mb-4" for="productSeries">商品系列</label>
            <select class="w-50" name="series" id="productSeries">
                ${l}
            </select>
        </div>
        <div class="px-7 py-5 mb-2 border border-primary rounded-40">
            <label class="fs-4 d-block mb-4" for="productName">商品名稱</label>
            <span class="fs-7">＊名稱字數限制為10字以內</span>
            <div class="d-flex">
                <input class="w-50" type="text" id="productName" value="${e.name}" maxlength="10">
                <button class="w-25 ms-4 btn btn-normal-brown rounded-pill text-primary" type="button" data-js="檢查名稱">檢查</button>
            </div>
            <span class="fs-7" id="existNameText"></span>
        </div>
        <div class="px-7 py-5 mb-2 border border-primary rounded-40">
            <label class="fs-4 d-block mb-4" for="productPrice">單價</label>
            <div class="d-flex align-items-end">
                <input class="w-50" type="number" id="productPrice" value="${e.price}">
                <span>元</span>
            </div>
        </div>
        <div class="px-7 py-5 border border-primary rounded-40">
            <label class="fs-4 d-block mb-4" for="productStock">商品庫存</label>
            <input class="w-50 d-block" type="number" id="productStock" value="${e.storage}" disabled>
            <span class="text-danger fs-7">＊庫存僅能於初始登錄時或總覽頁進行增加</span>
        </div>
    </div>

    <div class="col-12">
        <div class="px-7 py-5 border border-primary rounded-40">
            <label class="fs-4 d-block mb-4" for="productIngredient">內容物</label>
            <textarea class="w-100" name="productIngredient" id="productIngredient" >${e.ingredient}</textarea>
        </div>
    </div>

    <div class="col-6">
        <div class="d-flex flex-column px-7 py-5 border border-primary rounded-40 h-100">
            <span class="fs-4 mb-4">營養標示</span>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="productSize">每一份量</label>
                <div class="d-flex align-items-end">
                    <input class="w-50" type="number" id="productSize" value="${e.nutrition.size}">
                    <span>公克</span>
                </div>
            </div>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="productCalories">熱量</label>
                <div class="d-flex align-items-end">
                    <input class="w-50" type="number" id="productCalories" value="${e.nutrition.calories}">
                    <span>大卡</span>
                </div>
            </div>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="productCarb">碳水化合物</label>
                <div class="d-flex align-items-end">
                    <input class="w-50" type="number" id="productCarb" value="${e.nutrition.carb}">
                    <span>公克</span>
                </div>
            </div>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="productProtein">蛋白質</label>
                <div class="d-flex align-items-end">
                    <input class="w-50" type="number" id="productProtein" value="${e.nutrition.protein}">
                    <span>公克</span>
                </div>
            </div>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="productFat">脂肪</label>
                <div class="d-flex align-items-end">
                    <input class="w-50" type="number" id="productFat" value="${e.nutrition.fat}">
                    <span>公克</span>
                </div>
            </div>
        </div>
    </div>

    <div class="col-6">
        <div class="d-flex flex-column px-7 py-5 border border-primary rounded-40 h-100">
            <span class="fs-4 mb-4">加熱方式</span>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="microwave">微波</label>
                <input class="w-100" type="text" id="microwave" value="${e.heat.microwave}">
            </div>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="oven">烤箱</label>
                <input class="w-100" type="text" id="oven" value="${e.heat.oven}">
            </div>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="electricPot">電鍋</label>
                <input class="w-100" type="text" id="electricPot" value="${e.heat.electricPot}">
            </div>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="pan">平底鍋</label>
                <input class="w-100" type="text" id="pan" value="${e.heat.pan}">
            </div>
        </div>
    </div>
    `,u.innerHTML=t,f=document.querySelector(".imgArea"),a=document.querySelector(".imgInput"),r=document.querySelector("#productName"),v=e.name,o=document.querySelector("#existNameText"),P=document.querySelector("#productSeries"),m=document.querySelector("#productPrice"),b=document.querySelector("#productIngredient"),x=document.querySelector("#productSize"),g=document.querySelector("#productCalories"),y=document.querySelector("#productCarb"),w=document.querySelector("#productProtein"),h=document.querySelector("#productFat"),S=document.querySelector("#microwave"),$=document.querySelector("#oven"),k=document.querySelector("#electricPot"),q=document.querySelector("#pan")}B.addEventListener("click",e=>{e.preventDefault(),Swal.fire({title:`確定要刪除登錄：<br>${v}？`,showDenyButton:!0,showCancelButton:!1,confirmButtonText:"確認",denyButtonText:"取消"}).then(t=>{t.isConfirmed&&D()})});function D(){axios.get(`${n}/carts`).then(function(e){e.data.forEach(t=>{let l=t.cart;for(let s=0;s<l.length;s++)l[s].productId==d&&l.splice(s,1);let p=t.id;axios.patch(`${n}/carts/${p}`,{cart:l}).then(function(s){}).catch(function(s){console.log(s)})})}).catch(function(e){console.log(e)}),axios.delete(`${n}/products/${d}`).then(function(e){i.fire({icon:"success",title:"刪除成功"}).then(t=>{window.location.href="admin-products.html"})}).catch(function(e){console.log(e)})}let c=!1,C=!1;u.addEventListener("click",function(e){e.preventDefault(),e.target.getAttribute("data-js")=="預覽圖片"&&(f.innerHTML=`
        <img class="" src="${a.value}" alt="">
        `,C=!0)});u.addEventListener("click",function(e){e.preventDefault(),e.target.getAttribute("data-js")=="移除圖片"&&(f.innerHTML=`
        <p class="text-danger">目前是空的</p>
        `,a.value="",C=!1)});u.addEventListener("click",function(e){e.preventDefault(),e.target.getAttribute("data-js")=="檢查名稱"&&(r.value||i.fire({icon:"warning",title:"商品名稱不可為空"}),N(r.value))});function N(e){axios.get(`${n}/products`).then(function(t){if(!e)o.classList.remove("text-success"),o.classList.add("text-danger"),o.textContent="名稱不可為空",c=!1;else{let l=!1;t.data.forEach(function(p){if(e==p.name&&e!=v){l=l||!0;return}else l=l||!1}),l?(o.classList.remove("text-success"),o.classList.add("text-danger"),o.textContent="此名稱已存在",c=!1):(o.classList.remove("text-danger"),o.classList.add("text-success"),o.textContent="此名稱可以使用",c=!0)}}).catch(function(t){console.log(t)})}function E(){axios.patch(`${n}/products/${d}`,{image:a.value,series:P.value,name:r.value,price:Number(m.value),ingredient:b.value,nutrition:{size:Number(x.value),calories:Number(g.value),carb:Number(y.value),protein:Number(w.value),fat:Number(h.value)},heat:{microwave:S.value,oven:$.value,electricPot:k.value,pan:q.value}}).then(function(e){i.fire({icon:"success",title:"成功送出"}).then(t=>{window.location.href="admin-products.html"})}).catch(function(e){console.log(e)})}L.addEventListener("click",function(e){e.preventDefault(),N(r.value),a.value?C?r.value?c?m.value?b.value?x.value&&g.value&&y.value&&w.value&&h.value?S.value&&$.value&&k.value&&q.value?Swal.fire({title:"確認送出？",showDenyButton:!0,showCancelButton:!1,confirmButtonText:"確認",denyButtonText:"取消"}).then(t=>{t.isConfirmed&&E()}):i.fire({icon:"warning",title:"加熱方式不可為空"}):i.fire({icon:"warning",title:"營養標示不可為空"}):i.fire({icon:"warning",title:"內容物不可為空"}):i.fire({icon:"warning",title:"單價不可為空"}):i.fire({icon:"warning",title:"請檢查商品名稱"}):i.fire({icon:"warning",title:"商品名稱不可為空"}):i.fire({icon:"warning",title:"請先預覽過圖片"}):i.fire({icon:"warning",title:"圖片網址不可為空"})});
