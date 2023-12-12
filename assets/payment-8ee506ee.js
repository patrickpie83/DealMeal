import"./bootstrap.min-275429c0.js";import"./header-d5d66ed4.js";const C=document.querySelector(".paymentItemsContent"),m=document.querySelector(".couponContent"),x=document.querySelector(".deliverNameContent"),S=document.querySelector(".deliverEmailContent"),b=document.querySelector(".deliverTelContent"),q=document.querySelector(".deliverAddressContent"),I=document.querySelector(".totalPriceContent"),P=document.querySelector("#linePay"),A=document.querySelector("#jkoPay"),w=document.querySelector("#applePay"),d=document.querySelector(".confrimBtn"),E=document.querySelector(".sendOrderBtn"),c="https://dealmealserver.onrender.com";let s=localStorage.getItem("userId");M();let o;function M(){axios.get(`${c}/carts/${s}`).then(function(t){o=t.data,O(t.data)}).catch(function(t){console.log(t)})}function O(t){let n="";t.cart.forEach(function(e){n+=`
        <div class="row py-4 justify-content-center border border-top-0 border-dark-brown">
            <div class="col-md-5 d-flex align-items-center">
            <div class="w-50">
                <div class=" ratio ratio-1x1">
                <img src="${e.productImage}" alt="${e.productName}">
                </div>
            </div>
            <div class="w-50 text-center">
                <p>${e.productName}</p>
            </div>
            </div>

            <div class="col-md-2 my-auto text-end text-md-center">
            <p>${e.productPrice}元</p>
            </div>

            <div class="col-7 col-md-2 my-auto">
            <p class="text-center">${e.quantity}份</p>
            </div>
            <div class="col-5 col-md-3 my-auto text-end text-md-center">
            <p>共 ${e.productPrice*e.quantity}元</p>
            </div>
        </div>
        `}),C.innerHTML=n;let r="";t.coupon?axios.get(`${c}/coupons/${t.coupon}`).then(function(e){r=`
            <p>${t.coupon}</p>
            <span>套用優惠碼：${e.data.discount}</span>
            `,m.innerHTML=r}).catch(function(e){console.log(e)}):(r=`
        <p>無</p>
        `,m.innerHTML=r),x.textContent=`${t.deliverInfo.name}`,S.textContent=`${t.deliverInfo.email}`,b.textContent=`${t.deliverInfo.tel}`,q.textContent=`${t.deliverInfo.address}`,I.textContent=`${t.total}元`}let i;P.addEventListener("click",function(t){i=t.target.getAttribute("data-js-payment"),d.setAttribute("data-bs-target","#confirmOrderModal")});A.addEventListener("click",function(t){i=t.target.getAttribute("data-js-payment"),d.setAttribute("data-bs-target","#confirmOrderModal")});w.addEventListener("click",function(t){i=t.target.getAttribute("data-js-payment"),d.setAttribute("data-bs-target","#confirmOrderModal")});E.addEventListener("click",function(t){let n=crypto.randomUUID(),r=o.id,e=new Date,p=e.getFullYear(),f=e.getMonth()+1,y=e.getDate(),$=e.getHours(),g=e.getMinutes(),v=e.getSeconds(),h=`${p}/${f}/${y} ${$}:${g}:${v}`;o.id=n,o.memberId=r,o.payment=i,o.orderDate=h,o.status="尚未處理",axios.post(`${c}/orders`,o).then(function(a){o.coupon&&k(o.coupon),L(),alert("已送出訂單"),window.location.href="index.html"}).catch(function(a){console.log(a),alert("訂單送出失敗")}),axios.get(`${c}/users/${s}`).then(function(a){let u=a.data.historyOrder;u.push(o),axios.patch(`${c}/users/${s}`,{historyOrder:u}).then(function(l){console.log(l)}).catch(function(l){console.log(l)})}).catch(function(a){console.log(a)})});function k(t){axios.get(`${c}/coupons/${t}`).then(function(n){let r=n.data.useCount+1;axios.patch(`${c}/coupons/${t}`,{useCount:r})}).catch(function(n){console.log(n)})}function L(){axios.delete(`${c}/carts/${s}`).then(function(t){axios.patch(`${c}/users/${s}`,{cartExist:!1}).then(function(n){}).catch(function(n){console.log(n)})}).catch(function(t){console.log(t)})}
