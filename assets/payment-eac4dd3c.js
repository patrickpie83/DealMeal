import"./bootstrap.min-f122c4cb.js";import"./header-cf4ee72a.js";const q=document.querySelector(".paymentItemsContent"),y=document.querySelector(".couponContent"),P=document.querySelector(".deliverNameContent"),b=document.querySelector(".deliverEmailContent"),w=document.querySelector(".deliverTelContent"),A=document.querySelector(".deliverAddressContent"),E=document.querySelector(".totalPriceContent"),M=document.querySelector("#linePay"),O=document.querySelector("#jkoPay"),T=document.querySelector("#applePay"),p=document.querySelector(".confrimBtn"),k=document.querySelector(".sendOrderBtn");let u=localStorage.getItem("userId");const r="https://dealmealserver.onrender.com",g=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:t=>{t.onmouseenter=Swal.stopTimer,t.onmouseleave=Swal.resumeTimer}});L();let c;function L(){axios.get(`${r}/carts/${u}`).then(function(t){c=t.data,j(t.data)}).catch(function(t){console.log(t)})}function j(t){let n="";t.cart.forEach(function(e){n+=`
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
        `}),q.innerHTML=n;let s="";t.coupon?axios.get(`${r}/coupons/${t.coupon}`).then(function(e){s=`
            <p>${t.coupon}</p>
            <span>套用優惠碼：${e.data.discount}</span>
            `,y.innerHTML=s}).catch(function(e){console.log(e)}):(s=`
        <p>無</p>
        `,y.innerHTML=s),P.textContent=`${t.deliverInfo.name}`,b.textContent=`${t.deliverInfo.email}`,w.textContent=`${t.deliverInfo.tel}`,A.textContent=`${t.deliverInfo.address}`,E.textContent=`${t.total}元`}let d;M.addEventListener("click",function(t){d=t.target.getAttribute("data-js-payment"),p.setAttribute("data-bs-target","#confirmOrderModal")});O.addEventListener("click",function(t){d=t.target.getAttribute("data-js-payment"),p.setAttribute("data-bs-target","#confirmOrderModal")});T.addEventListener("click",function(t){d=t.target.getAttribute("data-js-payment"),p.setAttribute("data-bs-target","#confirmOrderModal")});k.addEventListener("click",function(t){let n=crypto.randomUUID(),s=c.id,e=new Date,a=e.getFullYear(),i=e.getMonth()+1,$=e.getDate(),v=e.getHours(),C=e.getMinutes(),x=e.getSeconds(),S=`${a}-${i}-${$} ${v}:${C}:${x}`;c.id=n,c.memberId=s,c.payment=d,c.orderDate=S,c.status="尚未處理",axios.post(`${r}/orders`,c).then(function(o){c.coupon&&B(c.coupon),g.fire({icon:"success",title:"已送出訂單"}).then(l=>{D(),N(c.cart)})}).catch(function(o){console.log(o),g.fire({icon:"error",title:"訂單送出失敗"})}),axios.get(`${r}/users/${u}`).then(function(o){let l=o.data.historyOrder,m=o.data.usedCoupon;l.push(c),m.push(c.coupon),axios.patch(`${r}/users/${u}`,{historyOrder:l,usedCoupon:m}).then(function(h){}).catch(function(h){console.log(h)})}).catch(function(o){console.log(o)});let I=`${a}-${i}`,f=[];c.cart.forEach(function(o){f.push({productId:o.productId,image:o.productImage,series:o.productSeries,name:o.productName,price:o.productPrice,saleQuantity:o.quantity,saleFigures:o.productPrice*o.quantity})}),axios.post(`${r}/sales`,{monthId:I,products:f}).then(function(o){}).catch(function(o){console.log(o)})});function B(t){axios.get(`${r}/coupons/${t}`).then(function(n){let s=n.data.useCount+1;axios.patch(`${r}/coupons/${t}`,{useCount:s})}).catch(function(n){console.log(n)})}function D(){axios.delete(`${r}/carts/${u}`).then(function(t){axios.patch(`${r}/users/${u}`,{cartExist:!1}).then(function(n){}).catch(function(n){console.log(n)})}).catch(function(t){console.log(t)})}function N(t){t.forEach(function(n){let s;axios.get(`${r}/products/${n.productId}`).then(function(e){s=e.data.storage,axios.patch(`${r}/products/${n.productId}`,{storage:s-n.quantity}).then(function(a){s-n.quantity<=0&&axios.patch(`${r}/products/${n.productId}`,{state:"完售中"}).then(function(i){}).catch(function(i){console.log(i)}),window.location.href="index.html"}).catch(function(a){console.log(a)})}).catch(function(e){console.log(e)})})}
