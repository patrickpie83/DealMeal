import"./bootstrap.min-d005857b.js";import"./header-6e941449.js";const p=document.querySelector(".cartFirstStep"),h=document.querySelector(".clearCartBtn"),l=document.querySelector(".cartItemsContent"),m=document.querySelector(".cartTotal"),s=document.querySelector(".couponInput"),g=document.querySelector(".useCouponBtn"),u=document.querySelector(".couponDiscount"),v=document.querySelector(".cartNextBtn"),c="https://dealmealserver.onrender.com";let a=localStorage.getItem("userId");const $=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:800,timerProgressBar:!1,didOpen:e=>{e.onmouseenter=Swal.stopTimer,e.onmouseleave=Swal.resumeTimer}});x();function x(){axios.get(`${c}/users/${a}`).then(function(e){e.data.cartExist?axios.patch(`${c}/carts/${a}`,{coupon:"",couponDiscount:""}).then(function(t){s.value="",r(t.data)}).catch(function(t){console.log(t)}):p.innerHTML=`
            <div class="col-10">
                <p class="my-7 text-dark-brown" align="center">目前購物車內無商品</p>
                <a href="products.html" type="button" class="d-block mx-auto py-3 btn btn-primary text-light-brown w-50 rounded-0">前往挑選商品</a>
            </div>
            `}).catch(function(e){console.log(e)})}function d(e){let t="";e.cart.forEach(function(n){t+=`
        <div class="row py-4 justify-content-center border border-top-0 border-dark-brown">
            <div class="col-md-5 d-flex align-items-center">
            <div class="w-50">
                <div class="ratio ratio-1x1">
                <img src="${n.productImage}" alt="${n.productName}">
                </div>
            </div>
            <div class="w-50 text-center">
                <p class="text-normal-brown">${n.productSeries}</p>
                <p>${n.productName}</p>
            </div>
            </div>

            <div class="col-md-2 my-auto text-end text-md-center">
            <p>${n.productPrice}元</p>
            </div>

            <div class="col-7 col-md-2 my-auto">
                <input data-js="quantityInput" data-cartItemId="${n.cartItemId}" class="w-100 " type="number" value="${n.quantity}" min="1">
            </div>
            <div class="col-5 col-md-2 my-auto text-end text-md-center">
                <p class="subTotal">共 ${n.productPrice*n.quantity} 元</p>
            </div>
            <div class="col-md-1 mt-3  my-md-auto text-end text-md-center">
                <a href="" >
                    <img data-js="deleteItem"  data-cartItemId="${n.cartItemId}" width="16" src="../assets/images/icon_trash.png" alt="icon_trash">
                </a>
                
            </div>
        </div>
        `}),l.innerHTML=t,m.textContent=`${e.total}元`}l.addEventListener("change",function(e){e.target.getAttribute("data-js")=="quantityInput"&&I(e.target.getAttribute("data-cartItemId"),Number(e.target.value))});function I(e,t){axios.get(`${c}/carts/${a}`).then(function(n){let o=n.data.cart;o.forEach(function(i){i.cartItemId==e&&(i.quantity=t)}),axios.patch(`${c}/carts/${a}`,{cart:o}).then(function(i){r(i.data)}).catch(function(i){console.log(i)})}).catch(function(n){console.log(n)})}l.addEventListener("click",function(e){e.preventDefault(),e.target.getAttribute("data-js")=="deleteItem"&&y(e.target.getAttribute("data-cartItemId"))});function y(e){axios.get(`${c}/carts/${a}`).then(function(t){let n=t.data.cart;for(let o=0;o<n.length;o++)n[o].cartItemId==e&&n.splice(o,1);n.length==0?f():axios.patch(`${c}/carts/${a}`,{cart:n}).then(function(o){r(o.data)}).catch(function(o){console.log(o)})}).catch(function(t){console.log(t)})}h.addEventListener("click",function(e){e.preventDefault(),f()});function f(){axios.patch(`${c}/users/${a}`,{cartExist:!1}).then(function(e){axios.delete(`${c}/carts/${a}`).then(function(t){$.fire({icon:"info",title:"購物車已清空"}).then(n=>{location.reload()})}).catch(function(t){console.log(t)})}).catch(function(e){console.log(e)})}g.addEventListener("click",function(){axios.get(`${c}/coupons`).then(function(e){let t={};e.data.forEach(function(n){n.id==s.value&&n.state=="發佈中"&&(t=n)}),Object.keys(t).length==0?u.innerHTML=`
            <span class="text-danger">無效的優惠碼，請重新確認</span>`:(u.innerHTML=`
            套用優惠碼：
            <span class="text-danger">${t.discount}</span>
            `,axios.patch(`${c}/carts/${a}`,{coupon:s.value,couponDiscount:t.discount}).then(function(n){r(n.data)}).catch(function(n){console.log(n)}))}).catch(function(e){console.log(e)})});function r(e){let t=0,n=80;e.cart.forEach(function(o){t+=o.productPrice*o.quantity}),e.coupon?axios.get(`${c}/coupons/${e.coupon}`).then(function(o){o.data.discount=="整筆折500元"?(t-=500,t<0&&(t=0)):o.data.discount=="整筆折300元"?(t-=300,t<0&&(t=0)):o.data.discount=="整筆折100元"?(t-=100,t<0&&(t=0)):o.data.discount=="整筆訂單8折"?t=Math.floor(t*.8):o.data.discount=="整筆訂單85折"?t=Math.floor(t*.85):o.data.discount=="整筆訂單9折"?t=Math.floor(t*.9):o.data.discount=="整筆訂單95折"&&(t=Math.floor(t*.95)),axios.patch(`${c}/carts/${a}`,{total:t+n}).then(function(i){d(i.data)}).catch(function(i){console.log(i)})}).catch(function(o){console.log(o)}):axios.patch(`${c}/carts/${a}`,{total:t+n}).then(function(o){d(o.data)}).catch(function(o){console.log(o)})}v.addEventListener("click",function(e){e.preventDefault(),axios.patch(`${c}/carts/${a}`,{deliverInfo:{}}).then(function(t){window.location.href="deliver.html"}).catch(function(t){console.log(t)})});
