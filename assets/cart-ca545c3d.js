import"./bootstrap.min-275429c0.js";import"./header-d5d66ed4.js";const p=document.querySelector(".cartFirstStep"),u=document.querySelector(".cartItemsContent"),h=document.querySelector(".cartTotal"),r=document.querySelector(".couponInput"),g=document.querySelector(".useCouponBtn"),l=document.querySelector(".couponDiscount"),m=document.querySelector(".cartNextBtn"),e="https://dealmealserver.onrender.com";let i=localStorage.getItem("userId");f();function f(){axios.get(`${e}/users/${i}`).then(function(o){o.data.cartExist?axios.patch(`${e}/carts/${i}`,{coupon:"",couponDiscount:""}).then(function(t){r.value="",s(t.data)}).catch(function(t){console.log(t)}):p.innerHTML=`
            <div class="col-10">
                <p class="my-7 text-dark-brown" align="center">目前購物車內無商品</p>
                <a href="products.html" type="button" class="d-block mx-auto py-3 btn btn-primary text-light-brown w-50 rounded-0">前往挑選商品</a>
            </div>
            `}).catch(function(o){console.log(o)})}function d(o){let t="";o.cart.forEach(function(c){t+=`
        <div class="row py-4 justify-content-center border border-top-0 border-dark-brown">
            <div class="col-md-5 d-flex align-items-center">
            <div class="w-50">
                <div class="ratio ratio-1x1">
                <img src="${c.productImage}" alt="${c.productName}">
                </div>
            </div>
            <div class="w-50 text-center">
                <p class="text-normal-brown">${c.productSeries}</p>
                <p>${c.productName}</p>
            </div>
            </div>

            <div class="col-md-2 my-auto text-end text-md-center">
            <p>${c.productPrice}元</p>
            </div>

            <div class="col-7 col-md-2 my-auto">
                <input data-js="quantityInput" data-cartItemId="${c.cartItemId}" class="w-100 " type="number" value="${c.quantity}" min="1">
            </div>
            <div class="col-5 col-md-2 my-auto text-end text-md-center">
                <p class="subTotal">共 ${c.productPrice*c.quantity} 元</p>
            </div>
            <div class="col-md-1 mt-3  my-md-auto text-end text-md-center">
                <a href="" >
                    <img data-js="deleteItem"  data-cartItemId="${c.cartItemId}" width="16" src="../assets/images/icon_trash.png" alt="icon_trash">
                </a>
                
            </div>
        </div>
        `}),u.innerHTML=t,h.textContent=`${o.total}元`}u.addEventListener("change",function(o){o.target.getAttribute("data-js")=="quantityInput"&&$(o.target.getAttribute("data-cartItemId"),Number(o.target.value))});function $(o,t){axios.get(`${e}/carts/${i}`).then(function(c){let n=c.data.cart;n.forEach(function(a){a.cartItemId==o&&(a.quantity=t)}),axios.patch(`${e}/carts/${i}`,{cart:n}).then(function(a){s(a.data)}).catch(function(a){console.log(a)})}).catch(function(c){console.log(c)})}u.addEventListener("click",function(o){o.preventDefault(),o.target.getAttribute("data-js")=="deleteItem"&&v(o.target.getAttribute("data-cartItemId"))});function v(o){axios.get(`${e}/carts/${i}`).then(function(t){let c=t.data.cart;for(let n=0;n<c.length;n++)c[n].cartItemId==o&&c.splice(n,1);c.length==0?axios.patch(`${e}/users/${i}`,{cartExist:!1}).then(function(n){axios.delete(`${e}/carts/${i}`).then(function(a){f()}).catch(function(a){console.log(a)})}).catch(function(n){console.log(n)}):axios.patch(`${e}/carts/${i}`,{cart:c}).then(function(n){s(n.data)}).catch(function(n){console.log(n)})}).catch(function(t){console.log(t)})}g.addEventListener("click",function(){axios.get(`${e}/coupons`).then(function(o){let t={};o.data.forEach(function(c){c.id==r.value&&c.state=="發佈中"&&(t=c)}),Object.keys(t).length==0?l.innerHTML=`
            <span class="text-danger">無效的優惠碼，請重新確認</span>`:(l.innerHTML=`
            套用優惠碼：
            <span class="text-danger">${t.discount}</span>
            `,axios.patch(`${e}/carts/${i}`,{coupon:r.value,couponDiscount:t.discount}).then(function(c){s(c.data)}).catch(function(c){console.log(c)}))}).catch(function(o){console.log(o)})});function s(o){let t=0,c=80;o.cart.forEach(function(n){t+=n.productPrice*n.quantity}),o.coupon?axios.get(`${e}/coupons/${o.coupon}`).then(function(n){n.data.discount=="整筆折500元"?(t-=500,t<0&&(t=0)):n.data.discount=="整筆折300元"?(t-=300,t<0&&(t=0)):n.data.discount=="整筆折100元"?(t-=100,t<0&&(t=0)):n.data.discount=="整筆訂單8折"?t=Math.floor(t*.8):n.data.discount=="整筆訂單85折"?t=Math.floor(t*.85):n.data.discount=="整筆訂單9折"?t=Math.floor(t*.9):n.data.discount=="整筆訂單95折"&&(t=Math.floor(t*.95)),axios.patch(`${e}/carts/${i}`,{total:t+c}).then(function(a){d(a.data)}).catch(function(a){console.log(a)})}).catch(function(n){console.log(n)}):axios.patch(`${e}/carts/${i}`,{total:t+c}).then(function(n){d(n.data)}).catch(function(n){console.log(n)})}m.addEventListener("click",function(o){o.preventDefault(),axios.patch(`${e}/carts/${i}`,{deliverInfo:{}}).then(function(t){window.location.href="deliver.html"}).catch(function(t){console.log(t)})});
