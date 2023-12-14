import"./bootstrap.min-d005857b.js";import"./header-6e941449.js";const n=location.href.split("=")[1],a=document.querySelector(".mealDetail"),i="https://dealmealserver.onrender.com";function o(e){let l="",t=e[0],s="";t.storage>0?s=`
        <div class="d-flex align-items-center mb-4">
            <p class="mealQuatity me-3">數量</p>
                        
            <div class="d-flex justify-content-between w-75">
                <button type="button" class="btn btn-white border border-primary rounded-0 p-1" style="height: 30px;">
                    <img class="d-block" src="../assets/icon_minus.png" alt="icon_minus" style="width: 20px;height: 2px;">
                </button>
                <input type="number" class="rounded-0 mx-2 border border-primary w-100" value="1" min="1" max="${t.storage}">
                <button type="button" class="btn btn-white border border-primary rounded-0 p-1" style="height: 30px;">
                    <img class="d-block" src="../assets/icon_add.png" alt="icon_minus" style="width: 20px;height: 20px;">
                </button>
            </div>
        </div>
        <button type="button" class="py-2 py-lg-3 mt-3 mt-lg-5 btn btn-primary text-light-brown w-100 rounded-0">加入購物車</button>
        `:s='<p class="mealQuatity">完售中</p>',l+=`
    <div class="row justify-content-between mb-7">
        <div class="col-lg-6">
            <div class="ratio ratio-1x1">
                <img src="${t.image}" alt="${t.name}">
            </div>
        </div>
        <div class="col-lg-6 d-flex flex-column justify-content-between mt-3 mt-lg-0">
            <div>
                <span class="mb-3">${t.series}</span>
                <h1 class="mealName mb-4 mb-lg-4">${t.name}</h1>
                <p class="mealStorage mb-lg-4">即時庫存：${t.storage}份</p>
                <p class="mealPrice fw-bold">售價：${t.price}元</p>
            </div>
            <div class="mt-4 mt-lg-0">
                ${s}
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
    `,a.innerHTML=l}function c(){axios.get(`${i}/products?id=${n}`).then(function(e){o(e.data)}).catch(function(e){console.log(e)})}c();
