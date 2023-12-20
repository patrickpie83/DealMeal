import"./bootstrap.min-d005857b.js";import"./header-d8c8e62b.js";const p=document.querySelector(".cartFirstStep"),h=document.querySelector(".clearCartBtn"),l=document.querySelector(".cartItemsContent"),m=document.querySelector(".cartTotal"),s=document.querySelector(".couponInput"),g=document.querySelector(".useCouponBtn"),u=document.querySelector(".couponDiscount"),$=document.querySelector(".cartNextBtn");let a=localStorage.getItem("userId");const c="http://localhost:3000",v=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:800,timerProgressBar:!1,didOpen:o=>{o.onmouseenter=Swal.stopTimer,o.onmouseleave=Swal.resumeTimer}});x();function x(){axios.get(`${c}/users/${a}`).then(function(o){o.data.cartExist?axios.patch(`${c}/carts/${a}`,{coupon:"",couponDiscount:""}).then(function(t){s.value="",r(t.data)}).catch(function(t){console.log(t)}):p.innerHTML=`
            <div class="col-10">
                <p class="my-7 text-dark-brown" align="center">目前購物車內無商品</p>
                <a href="products.html" type="button" class="d-block mx-auto py-3 btn btn-primary text-light-brown w-50 rounded-0">前往挑選商品</a>
            </div>
            `}).catch(function(o){console.log(o)})}function d(o){let t="";o.cart.forEach(function(e){t+=`
        <div class="row py-4 justify-content-center border border-top-0 border-dark-brown">
            <div class="col-md-5 d-flex align-items-center">
            <div class="w-50">
                <div class="ratio ratio-1x1">
                <img src="${e.productImage}" alt="${e.productName}">
                </div>
            </div>
            <div class="w-50 text-center">
                <p class="text-normal-brown">${e.productSeries}</p>
                <p>${e.productName}</p>
            </div>
            </div>

            <div class="col-md-2 my-auto text-end text-md-center">
            <p>${e.productPrice}元</p>
            </div>

            <div class="col-7 col-md-2 my-auto">
                <input data-js="quantityInput" data-cartItemId="${e.cartItemId}" class="w-100 " type="number" value="${e.quantity}" min="1">
            </div>
            <div class="col-5 col-md-2 my-auto text-end text-md-center">
                <p class="subTotal">共 ${e.productPrice*e.quantity} 元</p>
            </div>
            <div class="col-md-1 mt-3  my-md-auto text-end text-md-center">
                <a href="" >
                    <img data-js="deleteItem"  data-cartItemId="${e.cartItemId}" width="16" src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_trash.png?raw=true" alt="icon_trash">
                </a>
                
            </div>
        </div>
        `}),l.innerHTML=t,m.textContent=`${o.total}元`}l.addEventListener("change",function(o){o.target.getAttribute("data-js")=="quantityInput"&&I(o.target.getAttribute("data-cartItemId"),Number(o.target.value))});function I(o,t){axios.get(`${c}/carts/${a}`).then(function(e){let n=e.data.cart;n.forEach(function(i){i.cartItemId==o&&(i.quantity=t)}),axios.patch(`${c}/carts/${a}`,{cart:n}).then(function(i){r(i.data)}).catch(function(i){console.log(i)})}).catch(function(e){console.log(e)})}l.addEventListener("click",function(o){o.preventDefault(),o.target.getAttribute("data-js")=="deleteItem"&&y(o.target.getAttribute("data-cartItemId"))});function y(o){axios.get(`${c}/carts/${a}`).then(function(t){let e=t.data.cart;for(let n=0;n<e.length;n++)e[n].cartItemId==o&&e.splice(n,1);e.length==0?f():axios.patch(`${c}/carts/${a}`,{cart:e}).then(function(n){r(n.data)}).catch(function(n){console.log(n)})}).catch(function(t){console.log(t)})}h.addEventListener("click",function(o){o.preventDefault(),f()});function f(){axios.patch(`${c}/users/${a}`,{cartExist:!1}).then(function(o){axios.delete(`${c}/carts/${a}`).then(function(t){v.fire({icon:"info",title:"購物車已清空"}).then(e=>{location.reload()})}).catch(function(t){console.log(t)})}).catch(function(o){console.log(o)})}g.addEventListener("click",function(){axios.get(`${c}/coupons`).then(function(o){let t={};o.data.forEach(function(e){e.id==s.value&&e.state=="發佈中"&&(t=e)}),Object.keys(t).length==0?(u.innerHTML=`
            <span class="text-danger">無效的優惠碼，請重新確認</span>`,axios.patch(`${c}/carts/${a}`,{coupon:"",couponDiscount:""}).then(function(e){r(e.data)}).catch(function(e){console.log(e)})):(u.innerHTML=`
            套用優惠碼：
            <span class="text-danger">${t.discount}</span>
            `,axios.patch(`${c}/carts/${a}`,{coupon:s.value,couponDiscount:t.discount}).then(function(e){r(e.data)}).catch(function(e){console.log(e)}))}).catch(function(o){console.log(o)})});function r(o){let t=0,e=80;o.cart.forEach(function(n){t+=n.productPrice*n.quantity}),o.coupon?axios.get(`${c}/coupons/${o.coupon}`).then(function(n){n.data.discount=="整筆折500元"?(t-=500,t<0&&(t=0)):n.data.discount=="整筆折300元"?(t-=300,t<0&&(t=0)):n.data.discount=="整筆折100元"?(t-=100,t<0&&(t=0)):n.data.discount=="整筆訂單8折"?t=Math.floor(t*.8):n.data.discount=="整筆訂單85折"?t=Math.floor(t*.85):n.data.discount=="整筆訂單9折"?t=Math.floor(t*.9):n.data.discount=="整筆訂單95折"&&(t=Math.floor(t*.95)),axios.patch(`${c}/carts/${a}`,{total:t+e}).then(function(i){d(i.data)}).catch(function(i){console.log(i)})}).catch(function(n){console.log(n)}):axios.patch(`${c}/carts/${a}`,{total:t+e}).then(function(n){d(n.data)}).catch(function(n){console.log(n)})}$.addEventListener("click",function(o){o.preventDefault(),axios.patch(`${c}/carts/${a}`,{deliverInfo:{}}).then(function(t){window.location.href="deliver.html"}).catch(function(t){console.log(t)})});
