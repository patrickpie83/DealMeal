import"./bootstrap.min-d005857b.js";import"./header-4ab9cc05.js";const p=document.querySelector(".cartFirstStep"),h=document.querySelector(".clearCartBtn"),l=document.querySelector(".cartItemsContent"),m=document.querySelector(".cartTotal"),s=document.querySelector(".couponInput"),g=document.querySelector(".useCouponBtn"),u=document.querySelector(".couponDiscount"),$=document.querySelector(".cartNextBtn"),c="https://dealmealserver.onrender.com";let a=localStorage.getItem("userId");const v=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:800,timerProgressBar:!1,didOpen:e=>{e.onmouseenter=Swal.stopTimer,e.onmouseleave=Swal.resumeTimer}});x();function x(){axios.get(`${c}/users/${a}`).then(function(e){e.data.cartExist?axios.patch(`${c}/carts/${a}`,{coupon:"",couponDiscount:""}).then(function(t){s.value="",r(t.data)}).catch(function(t){console.log(t)}):p.innerHTML=`
            <div class="col-10">
                <p class="my-7 text-dark-brown" align="center">目前購物車內無商品</p>
                <a href="products.html" type="button" class="d-block mx-auto py-3 btn btn-primary text-light-brown w-50 rounded-0">前往挑選商品</a>
            </div>
            `}).catch(function(e){console.log(e)})}function d(e){let t="";e.cart.forEach(function(o){t+=`
        <div class="row py-4 justify-content-center border border-top-0 border-dark-brown">
            <div class="col-md-5 d-flex align-items-center">
            <div class="w-50">
                <div class="ratio ratio-1x1">
                <img src="${o.productImage}" alt="${o.productName}">
                </div>
            </div>
            <div class="w-50 text-center">
                <p class="text-normal-brown">${o.productSeries}</p>
                <p>${o.productName}</p>
            </div>
            </div>

            <div class="col-md-2 my-auto text-end text-md-center">
            <p>${o.productPrice}元</p>
            </div>

            <div class="col-7 col-md-2 my-auto">
                <input data-js="quantityInput" data-cartItemId="${o.cartItemId}" class="w-100 " type="number" value="${o.quantity}" min="1">
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
        `}),l.innerHTML=t,m.textContent=`${e.total}元`}l.addEventListener("change",function(e){e.target.getAttribute("data-js")=="quantityInput"&&I(e.target.getAttribute("data-cartItemId"),Number(e.target.value))});function I(e,t){axios.get(`${c}/carts/${a}`).then(function(o){let n=o.data.cart;n.forEach(function(i){i.cartItemId==e&&(i.quantity=t)}),axios.patch(`${c}/carts/${a}`,{cart:n}).then(function(i){r(i.data)}).catch(function(i){console.log(i)})}).catch(function(o){console.log(o)})}l.addEventListener("click",function(e){e.preventDefault(),e.target.getAttribute("data-js")=="deleteItem"&&y(e.target.getAttribute("data-cartItemId"))});function y(e){axios.get(`${c}/carts/${a}`).then(function(t){let o=t.data.cart;for(let n=0;n<o.length;n++)o[n].cartItemId==e&&o.splice(n,1);o.length==0?f():axios.patch(`${c}/carts/${a}`,{cart:o}).then(function(n){r(n.data)}).catch(function(n){console.log(n)})}).catch(function(t){console.log(t)})}h.addEventListener("click",function(e){e.preventDefault(),f()});function f(){axios.patch(`${c}/users/${a}`,{cartExist:!1}).then(function(e){axios.delete(`${c}/carts/${a}`).then(function(t){v.fire({icon:"info",title:"購物車已清空"}).then(o=>{location.reload()})}).catch(function(t){console.log(t)})}).catch(function(e){console.log(e)})}g.addEventListener("click",function(){axios.get(`${c}/coupons`).then(function(e){let t={};e.data.forEach(function(o){o.id==s.value&&o.state=="發佈中"&&(t=o)}),Object.keys(t).length==0?(u.innerHTML=`
            <span class="text-danger">無效的優惠碼，請重新確認</span>`,axios.patch(`${c}/carts/${a}`,{coupon:"",couponDiscount:""}).then(function(o){r(o.data)}).catch(function(o){console.log(o)})):(u.innerHTML=`
            套用優惠碼：
            <span class="text-danger">${t.discount}</span>
            `,axios.patch(`${c}/carts/${a}`,{coupon:s.value,couponDiscount:t.discount}).then(function(o){r(o.data)}).catch(function(o){console.log(o)}))}).catch(function(e){console.log(e)})});function r(e){let t=0,o=80;e.cart.forEach(function(n){t+=n.productPrice*n.quantity}),e.coupon?axios.get(`${c}/coupons/${e.coupon}`).then(function(n){n.data.discount=="整筆折500元"?(t-=500,t<0&&(t=0)):n.data.discount=="整筆折300元"?(t-=300,t<0&&(t=0)):n.data.discount=="整筆折100元"?(t-=100,t<0&&(t=0)):n.data.discount=="整筆訂單8折"?t=Math.floor(t*.8):n.data.discount=="整筆訂單85折"?t=Math.floor(t*.85):n.data.discount=="整筆訂單9折"?t=Math.floor(t*.9):n.data.discount=="整筆訂單95折"&&(t=Math.floor(t*.95)),axios.patch(`${c}/carts/${a}`,{total:t+o}).then(function(i){d(i.data)}).catch(function(i){console.log(i)})}).catch(function(n){console.log(n)}):axios.patch(`${c}/carts/${a}`,{total:t+o}).then(function(n){d(n.data)}).catch(function(n){console.log(n)})}$.addEventListener("click",function(e){e.preventDefault(),axios.patch(`${c}/carts/${a}`,{deliverInfo:{}}).then(function(t){window.location.href="deliver.html"}).catch(function(t){console.log(t)})});
