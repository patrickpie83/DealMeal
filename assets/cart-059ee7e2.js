import"./bootstrap.min-f122c4cb.js";import"./header-3fefa29a.js";const g=document.querySelector(".cartFirstStep"),m=document.querySelector(".clearCartBtn"),l=document.querySelector(".cartItemsContent"),$=document.querySelector(".cartTotal"),u=document.querySelector(".couponInput"),x=document.querySelector(".useCouponBtn"),r=document.querySelector(".couponDiscount"),v=document.querySelector(".cartNextBtn");let a=localStorage.getItem("userId");const c="http://localhost:3000",p=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1200,timerProgressBar:!1,didOpen:n=>{n.onmouseenter=Swal.stopTimer,n.onmouseleave=Swal.resumeTimer}});y();function y(){axios.get(`${c}/users/${a}`).then(function(n){n.data.cartExist?axios.patch(`${c}/carts/${a}`,{coupon:"",couponDiscount:""}).then(function(t){u.value="",s(t.data)}).catch(function(t){console.log(t)}):g.innerHTML=`
            <div class="col-10">
                <p class="my-7 text-dark-brown" align="center">目前購物車內無商品</p>
                <a href="products.html" type="button" class="d-block mx-auto py-3 btn btn-primary text-light-brown w-50 rounded-0">前往挑選商品</a>
            </div>
            `}).catch(function(n){console.log(n)})}function d(n){let t="";n.cart.forEach(function(o){t+=`
        <div class="row py-4 justify-content-center border border-top-0 border-dark-brown">
            <div class="col-md-5 d-flex align-items-center">
            <div class="w-50">
                <div class="ratio ratio-1x1">
                <img src="${o.productImage}" alt="${o.productName}">
                </div>
            </div>
            <div class="w-50 text-center">
                <p class="fs-7 text-dark-brown">${o.productSeries}</p>
                <p class="my-2">${o.productName}</p>
                <p class="fs-7 text-dark-brown">即時庫存： ${o.productStorage} 份</p>
            </div>
            </div>

            <div class="col-md-2 my-auto text-end text-md-center">
            <p>${o.productPrice}元</p>
            </div>

            <div class="col-7 col-md-2 my-auto">
                <input data-js="quantityInput" data-cartItemId="${o.cartItemId}" class="w-75 " type="number" value="${o.quantity}" min=1 max=${o.productStorage} >
                <span> 份</span>
            </div>
            <div class="col-5 col-md-2 my-auto text-end text-md-center">
                <p class="subTotal">共 ${o.productPrice*o.quantity} 元</p>
            </div>
            <div class="col-md-1 mt-3  my-md-auto text-end text-md-center">
                <a href="" >
                    <img data-js="deleteItem"  data-cartItemId="${o.cartItemId}" width="16" src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_trash.png?raw=true" alt="icon_trash">
                </a>
                
            </div>
        </div>
        `}),l.innerHTML=t,$.textContent=`${n.total}元`}l.addEventListener("change",function(n){n.target.getAttribute("data-js")=="quantityInput"&&I(n.target.getAttribute("data-cartItemId"),Number(n.target.value))});function I(n,t){axios.get(`${c}/carts/${a}`).then(function(o){let e=o.data.cart;e.forEach(function(i){i.cartItemId==n&&(i.quantity=t)}),axios.patch(`${c}/carts/${a}`,{cart:e}).then(function(i){s(i.data)}).catch(function(i){console.log(i)})}).catch(function(o){console.log(o)})}l.addEventListener("click",function(n){n.preventDefault(),n.target.getAttribute("data-js")=="deleteItem"&&b(n.target.getAttribute("data-cartItemId"))});function b(n){axios.get(`${c}/carts/${a}`).then(function(t){let o=t.data.cart;for(let e=0;e<o.length;e++)o[e].cartItemId==n&&o.splice(e,1);o.length==0?h():axios.patch(`${c}/carts/${a}`,{cart:o}).then(function(e){s(e.data)}).catch(function(e){console.log(e)})}).catch(function(t){console.log(t)})}m.addEventListener("click",function(n){n.preventDefault(),h()});function h(){axios.patch(`${c}/users/${a}`,{cartExist:!1}).then(function(n){axios.delete(`${c}/carts/${a}`).then(function(t){p.fire({icon:"info",title:"購物車已清空"}).then(o=>{location.reload()})}).catch(function(t){console.log(t)})}).catch(function(n){console.log(n)})}function f(){axios.patch(`${c}/carts/${a}`,{coupon:"",couponDiscount:""}).then(function(n){s(n.data)}).catch(function(n){console.log(n)})}x.addEventListener("click",function(){axios.get(`${c}/coupons`).then(function(n){let t={};n.data.forEach(function(o){o.id==u.value&&o.state=="發佈中"&&(t=o)}),Object.keys(t).length==0?(r.innerHTML=`
            <span class="text-danger">無效的優惠碼，請重新確認</span>`,f()):t.usage=="僅一筆"?axios.get(`${c}/users/${a}`).then(function(o){o.data.usedCoupon.indexOf(`${t.id}`)>=0?(r.innerHTML=`
                    <span class="text-danger">此優惠碼已使用過不得再使用</span>`,f()):(r.innerHTML=`
                    套用優惠碼：
                    <span class="text-danger">${t.discount}</span>
                    `,axios.patch(`${c}/carts/${a}`,{coupon:u.value,couponDiscount:t.discount}).then(function(i){s(i.data)}).catch(function(i){console.log(i)}))}).catch(function(o){console.log(o)}):(r.innerHTML=`
            套用優惠碼：
            <span class="text-danger">${t.discount}</span>
            `,axios.patch(`${c}/carts/${a}`,{coupon:u.value,couponDiscount:t.discount}).then(function(o){s(o.data)}).catch(function(o){console.log(o)}))}).catch(function(n){console.log(n)})});function s(n){let t=0,o=80;n.cart.forEach(function(e){t+=e.productPrice*e.quantity}),n.coupon?axios.get(`${c}/coupons/${n.coupon}`).then(function(e){e.data.discount=="整筆折500元"?(t-=500,t<0&&(t=0)):e.data.discount=="整筆折300元"?(t-=300,t<0&&(t=0)):e.data.discount=="整筆折100元"?(t-=100,t<0&&(t=0)):e.data.discount=="整筆訂單8折"?t=Math.floor(t*.8):e.data.discount=="整筆訂單85折"?t=Math.floor(t*.85):e.data.discount=="整筆訂單9折"?t=Math.floor(t*.9):e.data.discount=="整筆訂單95折"&&(t=Math.floor(t*.95)),axios.patch(`${c}/carts/${a}`,{total:t+o}).then(function(i){d(i.data)}).catch(function(i){console.log(i)})}).catch(function(e){console.log(e)}):axios.patch(`${c}/carts/${a}`,{total:t+o}).then(function(e){d(e.data)}).catch(function(e){console.log(e)})}v.addEventListener("click",function(n){n.preventDefault(),axios.get(`${c}/carts/${a}`).then(function(t){let o=!1;t.data.cart.forEach(function(e){e.quantity>e.productStorage&&(o=o||!0)}),o?p.fire({icon:"error",title:"購買數量 不可大於 即時庫存"}):axios.patch(`${c}/carts/${a}`,{deliverInfo:{}}).then(function(e){window.location.href="deliver.html"}).catch(function(e){console.log(e)})}).catch(function(t){console.log(t)})});
