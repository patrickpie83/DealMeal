import"./bootstrap.min-d005857b.js";import"./header-1a60f231.js";import"./config-b9ecf40d.js";const f=document.querySelector(".cartFirstStep"),p=document.querySelector(".clearCartBtn"),l=document.querySelector(".cartItemsContent"),h=document.querySelector(".cartTotal"),i=document.querySelector(".couponInput"),m=document.querySelector(".useCouponBtn"),s=document.querySelector(".couponDiscount"),g=document.querySelector(".cartNextBtn");let c=localStorage.getItem("userId");const $=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:800,timerProgressBar:!1,didOpen:o=>{o.onmouseenter=Swal.stopTimer,o.onmouseleave=Swal.resumeTimer}});v();function v(){axios.get(`${_url}/users/${c}`).then(function(o){o.data.cartExist?axios.patch(`${_url}/carts/${c}`,{coupon:"",couponDiscount:""}).then(function(t){i.value="",r(t.data)}).catch(function(t){console.log(t)}):f.innerHTML=`
            <div class="col-10">
                <p class="my-7 text-dark-brown" align="center">目前購物車內無商品</p>
                <a href="products.html" type="button" class="d-block mx-auto py-3 btn btn-primary text-light-brown w-50 rounded-0">前往挑選商品</a>
            </div>
            `}).catch(function(o){console.log(o)})}function u(o){let t="";o.cart.forEach(function(e){t+=`
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
        `}),l.innerHTML=t,h.textContent=`${o.total}元`}l.addEventListener("change",function(o){o.target.getAttribute("data-js")=="quantityInput"&&x(o.target.getAttribute("data-cartItemId"),Number(o.target.value))});function x(o,t){axios.get(`${_url}/carts/${c}`).then(function(e){let n=e.data.cart;n.forEach(function(a){a.cartItemId==o&&(a.quantity=t)}),axios.patch(`${_url}/carts/${c}`,{cart:n}).then(function(a){r(a.data)}).catch(function(a){console.log(a)})}).catch(function(e){console.log(e)})}l.addEventListener("click",function(o){o.preventDefault(),o.target.getAttribute("data-js")=="deleteItem"&&I(o.target.getAttribute("data-cartItemId"))});function I(o){axios.get(`${_url}/carts/${c}`).then(function(t){let e=t.data.cart;for(let n=0;n<e.length;n++)e[n].cartItemId==o&&e.splice(n,1);e.length==0?d():axios.patch(`${_url}/carts/${c}`,{cart:e}).then(function(n){r(n.data)}).catch(function(n){console.log(n)})}).catch(function(t){console.log(t)})}p.addEventListener("click",function(o){o.preventDefault(),d()});function d(){axios.patch(`${_url}/users/${c}`,{cartExist:!1}).then(function(o){axios.delete(`${_url}/carts/${c}`).then(function(t){$.fire({icon:"info",title:"購物車已清空"}).then(e=>{location.reload()})}).catch(function(t){console.log(t)})}).catch(function(o){console.log(o)})}m.addEventListener("click",function(){axios.get(`${_url}/coupons`).then(function(o){let t={};o.data.forEach(function(e){e.id==i.value&&e.state=="發佈中"&&(t=e)}),Object.keys(t).length==0?(s.innerHTML=`
            <span class="text-danger">無效的優惠碼，請重新確認</span>`,axios.patch(`${_url}/carts/${c}`,{coupon:"",couponDiscount:""}).then(function(e){r(e.data)}).catch(function(e){console.log(e)})):(s.innerHTML=`
            套用優惠碼：
            <span class="text-danger">${t.discount}</span>
            `,axios.patch(`${_url}/carts/${c}`,{coupon:i.value,couponDiscount:t.discount}).then(function(e){r(e.data)}).catch(function(e){console.log(e)}))}).catch(function(o){console.log(o)})});function r(o){let t=0,e=80;o.cart.forEach(function(n){t+=n.productPrice*n.quantity}),o.coupon?axios.get(`${_url}/coupons/${o.coupon}`).then(function(n){n.data.discount=="整筆折500元"?(t-=500,t<0&&(t=0)):n.data.discount=="整筆折300元"?(t-=300,t<0&&(t=0)):n.data.discount=="整筆折100元"?(t-=100,t<0&&(t=0)):n.data.discount=="整筆訂單8折"?t=Math.floor(t*.8):n.data.discount=="整筆訂單85折"?t=Math.floor(t*.85):n.data.discount=="整筆訂單9折"?t=Math.floor(t*.9):n.data.discount=="整筆訂單95折"&&(t=Math.floor(t*.95)),axios.patch(`${_url}/carts/${c}`,{total:t+e}).then(function(a){u(a.data)}).catch(function(a){console.log(a)})}).catch(function(n){console.log(n)}):axios.patch(`${_url}/carts/${c}`,{total:t+e}).then(function(n){u(n.data)}).catch(function(n){console.log(n)})}g.addEventListener("click",function(o){o.preventDefault(),axios.patch(`${_url}/carts/${c}`,{deliverInfo:{}}).then(function(t){window.location.href="deliver.html"}).catch(function(t){console.log(t)})});
