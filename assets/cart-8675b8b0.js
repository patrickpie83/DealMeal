import"./bootstrap.min-f122c4cb.js";import"./header-cf4ee72a.js";const g=document.querySelector(".cartFirstStep"),m=document.querySelector(".clearCartBtn"),l=document.querySelector(".cartItemsContent"),$=document.querySelector(".cartTotal"),u=document.querySelector(".couponInput"),x=document.querySelector(".useCouponBtn"),r=document.querySelector(".couponDiscount"),v=document.querySelector(".cartNextBtn");let a=localStorage.getItem("userId");const c="https://dealmealserver.onrender.com",p=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1200,timerProgressBar:!1,didOpen:o=>{o.onmouseenter=Swal.stopTimer,o.onmouseleave=Swal.resumeTimer}});y();function y(){axios.get(`${c}/users/${a}`).then(function(o){o.data.cartExist?axios.patch(`${c}/carts/${a}`,{coupon:"",couponDiscount:""}).then(function(t){u.value="",s(t.data)}).catch(function(t){console.log(t)}):g.innerHTML=`
            <div class="col-10">
                <p class="my-7 text-dark-brown" align="center">目前購物車內無商品</p>
                <a href="products.html" type="button" class="d-block mx-auto py-3 btn btn-primary text-light-brown w-50 rounded-0">前往挑選商品</a>
            </div>
            `}).catch(function(o){console.log(o)})}function d(o){let t="";o.cart.forEach(function(n){t+=`
        <div class="row py-4 justify-content-center border border-top-0 border-dark-brown">
            <div class="col-md-5 d-flex align-items-center">
            <div class="w-50">
                <div class="ratio ratio-1x1">
                <img src="${n.productImage}" alt="${n.productName}">
                </div>
            </div>
            <div class="w-50 text-center">
                <p class="fs-7 text-dark-brown">${n.productSeries}</p>
                <p class="my-2">${n.productName}</p>
                <p class="fs-7 text-dark-brown">即時庫存： ${n.productStorage} 份</p>
            </div>
            </div>

            <div class="col-md-2 my-auto text-end text-md-center">
            <p>${n.productPrice}元</p>
            </div>

            <div class="col-7 col-md-2 my-auto">
                <input data-js="quantityInput" data-cartItemId="${n.cartItemId}" class="w-75 " type="number" value="${n.quantity}" min=1 max=${n.productStorage} >
                <span> 份</span>
            </div>
            <div class="col-5 col-md-2 my-auto text-end text-md-center">
                <p class="subTotal">共 ${n.productPrice*n.quantity} 元</p>
            </div>
            <div class="col-md-1 mt-3  my-md-auto text-end text-md-center">
                <a href="" >
                    <img data-js="deleteItem"  data-cartItemId="${n.cartItemId}" width="16" src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_trash.png?raw=true" alt="icon_trash">
                </a>
                
            </div>
        </div>
        `}),l.innerHTML=t,$.textContent=`${o.total}元`}l.addEventListener("change",function(o){o.target.getAttribute("data-js")=="quantityInput"&&I(o.target.getAttribute("data-cartItemId"),Number(o.target.value))});function I(o,t){axios.get(`${c}/carts/${a}`).then(function(n){let e=n.data.cart;e.forEach(function(i){i.cartItemId==o&&(i.quantity=t)}),axios.patch(`${c}/carts/${a}`,{cart:e}).then(function(i){s(i.data)}).catch(function(i){console.log(i)})}).catch(function(n){console.log(n)})}l.addEventListener("click",function(o){o.preventDefault(),o.target.getAttribute("data-js")=="deleteItem"&&b(o.target.getAttribute("data-cartItemId"))});function b(o){axios.get(`${c}/carts/${a}`).then(function(t){let n=t.data.cart;for(let e=0;e<n.length;e++)n[e].cartItemId==o&&n.splice(e,1);n.length==0?h():axios.patch(`${c}/carts/${a}`,{cart:n}).then(function(e){s(e.data)}).catch(function(e){console.log(e)})}).catch(function(t){console.log(t)})}m.addEventListener("click",function(o){o.preventDefault(),h()});function h(){axios.patch(`${c}/users/${a}`,{cartExist:!1}).then(function(o){axios.delete(`${c}/carts/${a}`).then(function(t){p.fire({icon:"info",title:"購物車已清空"}).then(n=>{location.reload()})}).catch(function(t){console.log(t)})}).catch(function(o){console.log(o)})}function f(){axios.patch(`${c}/carts/${a}`,{coupon:"",couponDiscount:""}).then(function(o){s(o.data)}).catch(function(o){console.log(o)})}x.addEventListener("click",function(){axios.get(`${c}/coupons`).then(function(o){let t={};o.data.forEach(function(n){n.id==u.value&&n.state=="發佈中"&&(t=n)}),Object.keys(t).length==0?(r.innerHTML=`
            <span class="text-danger">無效的優惠碼，請重新確認</span>`,f()):t.usage=="僅一筆"?axios.get(`${c}/users/${a}`).then(function(n){n.data.usedCoupon.indexOf(`${t.id}`)>=0?(r.innerHTML=`
                    <span class="text-danger">此優惠碼已使用過不得再使用</span>`,f()):(r.innerHTML=`
                    套用優惠碼：
                    <span class="text-danger">${t.discount}</span>
                    `,axios.patch(`${c}/carts/${a}`,{coupon:u.value,couponDiscount:t.discount}).then(function(i){s(i.data)}).catch(function(i){console.log(i)}))}).catch(function(n){console.log(n)}):(r.innerHTML=`
            套用優惠碼：
            <span class="text-danger">${t.discount}</span>
            `,axios.patch(`${c}/carts/${a}`,{coupon:u.value,couponDiscount:t.discount}).then(function(n){s(n.data)}).catch(function(n){console.log(n)}))}).catch(function(o){console.log(o)})});function s(o){let t=0,n=80;o.cart.forEach(function(e){t+=e.productPrice*e.quantity}),o.coupon?axios.get(`${c}/coupons/${o.coupon}`).then(function(e){e.data.discount=="整筆折500元"?(t-=500,t<0&&(t=0)):e.data.discount=="整筆折300元"?(t-=300,t<0&&(t=0)):e.data.discount=="整筆折100元"?(t-=100,t<0&&(t=0)):e.data.discount=="整筆訂單8折"?t=Math.floor(t*.8):e.data.discount=="整筆訂單85折"?t=Math.floor(t*.85):e.data.discount=="整筆訂單9折"?t=Math.floor(t*.9):e.data.discount=="整筆訂單95折"&&(t=Math.floor(t*.95)),axios.patch(`${c}/carts/${a}`,{total:t+n}).then(function(i){d(i.data)}).catch(function(i){console.log(i)})}).catch(function(e){console.log(e)}):axios.patch(`${c}/carts/${a}`,{total:t+n}).then(function(e){d(e.data)}).catch(function(e){console.log(e)})}v.addEventListener("click",function(o){o.preventDefault(),axios.get(`${c}/carts/${a}`).then(function(t){let n=!1;t.data.cart.forEach(function(e){e.quantity>e.productStorage&&(n=n||!0)}),n?p.fire({icon:"error",title:"購買數量 不可大於 即時庫存"}):axios.patch(`${c}/carts/${a}`,{deliverInfo:{}}).then(function(e){window.location.href="deliver.html"}).catch(function(e){console.log(e)})}).catch(function(t){console.log(t)})});
