import"./bootstrap.min-d005857b.js";import"./header-1a60f231.js";import"./config-b9ecf40d.js";const v=document.querySelector(".paymentItemsContent"),f=document.querySelector(".couponContent"),x=document.querySelector(".deliverNameContent"),C=document.querySelector(".deliverEmailContent"),S=document.querySelector(".deliverTelContent"),I=document.querySelector(".deliverAddressContent"),q=document.querySelector(".totalPriceContent"),b=document.querySelector("#linePay"),P=document.querySelector("#jkoPay"),_=document.querySelector("#applePay"),p=document.querySelector(".confrimBtn"),A=document.querySelector(".sendOrderBtn");let a=localStorage.getItem("userId");E();let c;function E(){axios.get(`${_url}/carts/${a}`).then(function(t){c=t.data,k(t.data)}).catch(function(t){console.log(t)})}function k(t){let o="";t.cart.forEach(function(e){o+=`
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
        `}),v.innerHTML=o;let n="";t.coupon?axios.get(`${_url}/coupons/${t.coupon}`).then(function(e){n=`
            <p>${t.coupon}</p>
            <span>套用優惠碼：${e.data.discount}</span>
            `,f.innerHTML=n}).catch(function(e){console.log(e)}):(n=`
        <p>無</p>
        `,f.innerHTML=n),x.textContent=`${t.deliverInfo.name}`,C.textContent=`${t.deliverInfo.email}`,S.textContent=`${t.deliverInfo.tel}`,I.textContent=`${t.deliverInfo.address}`,q.textContent=`${t.total}元`}let l;b.addEventListener("click",function(t){l=t.target.getAttribute("data-js-payment"),p.setAttribute("data-bs-target","#confirmOrderModal")});P.addEventListener("click",function(t){l=t.target.getAttribute("data-js-payment"),p.setAttribute("data-bs-target","#confirmOrderModal")});_.addEventListener("click",function(t){l=t.target.getAttribute("data-js-payment"),p.setAttribute("data-bs-target","#confirmOrderModal")});A.addEventListener("click",function(t){let o=crypto.randomUUID(),n=c.id,e=new Date,i=e.getFullYear(),s=e.getMonth()+1,m=e.getDate(),y=e.getHours(),g=e.getMinutes(),$=e.getSeconds(),h=`${i}/${s}/${m} ${y}:${g}:${$}`;c.id=o,c.memberId=n,c.payment=l,c.orderDate=h,c.status="尚未處理",axios.post(`${_url}/orders`,c).then(function(r){c.coupon&&w(c.coupon),Toast.fire({icon:"success",title:"已送出訂單"}).then(u=>{M(),O(c.cart)})}).catch(function(r){console.log(r),Toast.fire({icon:"error",title:"訂單送出失敗"})}),axios.get(`${_url}/users/${a}`).then(function(r){let u=r.data.historyOrder;u.push(c),axios.patch(`${_url}/users/${a}`,{historyOrder:u}).then(function(d){console.log(d)}).catch(function(d){console.log(d)})}).catch(function(r){console.log(r)})});function w(t){axios.get(`${_url}/coupons/${t}`).then(function(o){let n=o.data.useCount+1;axios.patch(`${_url}/coupons/${t}`,{useCount:n})}).catch(function(o){console.log(o)})}function M(){axios.delete(`${_url}/carts/${a}`).then(function(t){axios.patch(`${_url}/users/${a}`,{cartExist:!1}).then(function(o){}).catch(function(o){console.log(o)})}).catch(function(t){console.log(t)})}function O(t){t.forEach(function(o){let n;axios.get(`${_url}/products/${o.productId}`).then(function(e){n=e.data.storage,axios.patch(`${_url}/products/${o.productId}`,{storage:n-o.quantity}).then(function(i){n-o.quantity<=0&&axios.patch(`${_url}/products/${o.productId}`,{state:"完售中"}).then(function(s){}).catch(function(s){console.log(s)}),window.location.href="index.html"}).catch(function(i){console.log(i)})}).catch(function(e){console.log(e)})})}
