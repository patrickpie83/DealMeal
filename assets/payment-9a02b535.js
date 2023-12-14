import"./bootstrap.min-d005857b.js";import"./header-6e941449.js";const C=document.querySelector(".paymentItemsContent"),f=document.querySelector(".couponContent"),S=document.querySelector(".deliverNameContent"),I=document.querySelector(".deliverEmailContent"),q=document.querySelector(".deliverTelContent"),b=document.querySelector(".deliverAddressContent"),P=document.querySelector(".totalPriceContent"),w=document.querySelector("#linePay"),A=document.querySelector("#jkoPay"),E=document.querySelector("#applePay"),m=document.querySelector(".confrimBtn"),O=document.querySelector(".sendOrderBtn"),r="https://dealmealserver.onrender.com";let i=localStorage.getItem("userId");const g=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:t=>{t.onmouseenter=Swal.stopTimer,t.onmouseleave=Swal.resumeTimer}});T();let c;function T(){axios.get(`${r}/carts/${i}`).then(function(t){c=t.data,k(t.data)}).catch(function(t){console.log(t)})}function k(t){let o="";t.cart.forEach(function(e){o+=`
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
        `}),C.innerHTML=o;let n="";t.coupon?axios.get(`${r}/coupons/${t.coupon}`).then(function(e){n=`
            <p>${t.coupon}</p>
            <span>套用優惠碼：${e.data.discount}</span>
            `,f.innerHTML=n}).catch(function(e){console.log(e)}):(n=`
        <p>無</p>
        `,f.innerHTML=n),S.textContent=`${t.deliverInfo.name}`,I.textContent=`${t.deliverInfo.email}`,q.textContent=`${t.deliverInfo.tel}`,b.textContent=`${t.deliverInfo.address}`,P.textContent=`${t.total}元`}let u;w.addEventListener("click",function(t){u=t.target.getAttribute("data-js-payment"),m.setAttribute("data-bs-target","#confirmOrderModal")});A.addEventListener("click",function(t){u=t.target.getAttribute("data-js-payment"),m.setAttribute("data-bs-target","#confirmOrderModal")});E.addEventListener("click",function(t){u=t.target.getAttribute("data-js-payment"),m.setAttribute("data-bs-target","#confirmOrderModal")});O.addEventListener("click",function(t){let o=crypto.randomUUID(),n=c.id,e=new Date,a=e.getFullYear(),l=e.getMonth()+1,y=e.getDate(),h=e.getHours(),$=e.getMinutes(),v=e.getSeconds(),x=`${a}/${l}/${y} ${h}:${$}:${v}`;c.id=o,c.memberId=n,c.payment=u,c.orderDate=x,c.status="尚未處理",axios.post(`${r}/orders`,c).then(function(s){c.coupon&&M(c.coupon),g.fire({icon:"success",title:"已送出訂單"}).then(d=>{L(),j(c.cart)})}).catch(function(s){console.log(s),g.fire({icon:"error",title:"訂單送出失敗"})}),axios.get(`${r}/users/${i}`).then(function(s){let d=s.data.historyOrder;d.push(c),axios.patch(`${r}/users/${i}`,{historyOrder:d}).then(function(p){console.log(p)}).catch(function(p){console.log(p)})}).catch(function(s){console.log(s)})});function M(t){axios.get(`${r}/coupons/${t}`).then(function(o){let n=o.data.useCount+1;axios.patch(`${r}/coupons/${t}`,{useCount:n})}).catch(function(o){console.log(o)})}function L(){axios.delete(`${r}/carts/${i}`).then(function(t){axios.patch(`${r}/users/${i}`,{cartExist:!1}).then(function(o){}).catch(function(o){console.log(o)})}).catch(function(t){console.log(t)})}function j(t){t.forEach(function(o){let n;axios.get(`${r}/products/${o.productId}`).then(function(e){n=e.data.storage,axios.patch(`${r}/products/${o.productId}`,{storage:n-o.quantity}).then(function(a){n-o.quantity<=0&&axios.patch(`${r}/products/${o.productId}`,{state:"完售中"}).then(function(l){}).catch(function(l){console.log(l)}),window.location.href="index.html"}).catch(function(a){console.log(a)})}).catch(function(e){console.log(e)})})}
