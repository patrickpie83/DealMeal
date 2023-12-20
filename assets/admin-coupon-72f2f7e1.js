import"./bootstrap.min-d005857b.js";import"./admin-header-663d3a3c.js";import"./config-b9ecf40d.js";const a=document.querySelector(".releaseCouponForm"),m=document.querySelector("#releaseCouponDate"),l=document.querySelector("#releaseCouponId"),r=document.querySelector("#releaseCouponName"),d=document.querySelector("#releaseCouponUsage"),u=document.querySelector("#releaseCouponDiscount"),g=document.querySelector(".checkIdBtn"),c=document.querySelector(".checkIdText"),i=document.querySelector(".couponList"),b=document.querySelector(".cancelCouponBtn"),v=document.querySelector(".checkCouponBtn");C();function C(){axios.get(`${_url}/coupons`).then(function(t){$(t.data)}).catch(function(t){console.log(t)})}function $(t){let n="",o="";t.forEach(function(e){e.state=="發佈中"?o=`
            <input class="form-check-input" type="checkbox" role="switch" id="${e.id}" checked data-bs-toggle="modal" data-bs-target="#couponAlert-${e.id}">
            `:o=`
            <input class="form-check-input" type="checkbox" role="switch" id="${e.id}" data-bs-toggle="modal" data-bs-target="#couponAlert-${e.id}">
            `,n+=`
        <tr class="align-middle border border-primary">
            <td>${e.date}</td>
            <td>${e.id}</td>
            <td>${e.name}</td>
            <td>${e.usage}</td>
            <td>${e.discount}</td>
            <td>
                <div class="form-check form-switch d-flex justify-content-around">
                    ${o}
                    <label class="form-check-label" for="${e.id}" data-bs-toggle="modal" data-bs-target="#couponAlert-${e.id}">${e.state}</label>
                </div>

                <div class="modal fade" id="couponAlert-${e.id}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h6 class="modal-title">確認視窗</h6>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="關閉"></button>
                            </div>
                            <div class="modal-body">
                                按下確認後將切換 ${e.id} 優惠碼使用狀態
                            </div>
                            
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                <button type="button" class="btn btn-primary" data-js-state="${e.state}" data-js-switchState="${e.id}">確認</button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td>${e.useCount}</td>
        </tr>
        `}),i.innerHTML=n}g.addEventListener("click",function(t){axios.get(`${_url}/coupons`).then(function(n){let o=!0;n.data.forEach(function(e){l.value==e.id&&(o=o&&!1)}),o?c.innerHTML=' <p class="fs-7 text-success">此序號可以使用</p>':c.innerHTML=' <p class="fs-7 text-danger">此序號已重複</p>'}).catch(function(n){console.log(n)})});b.addEventListener("click",function(){a.reset()});v.addEventListener("click",function(t){t.preventDefault();const n={發佈日期:{presence:{allowEmpty:!1,message:"是必填欄位"}}},o={優惠碼序號:{presence:{allowEmpty:!1,message:"是必填欄位"}}},e=validate(a,n),s=validate(a,o),p=r.value=="請選擇",f=d.value=="請選擇",h=u.value=="請選擇";e?Toast.fire({icon:"warning",title:`${e.發佈日期}`}):s?Toast.fire({icon:"warning",title:`${s.優惠碼序號}`}):p||f||h?Toast.fire({icon:"warning",title:"尚有欄位未選擇"}):y()});function y(){axios.post(`${_url}/coupons`,{id:l.value,date:m.value,name:r.value,usage:d.value,discount:u.value,state:"發佈中",useCount:0}).then(function(t){Toast.fire({icon:"warning",title:"發佈成功"}).then(n=>{window.location.href="admin-coupon.html"})}).catch(function(t){console.log(t),Toast.fire({icon:"error",title:"發佈失敗"})})}i.addEventListener("click",function(t){if(t.preventDefault(),t.target.innerHTML=="確認"){let n=t.target.getAttribute("data-js-state"),o=t.target.getAttribute("data-js-switchState");n=="發佈中"?axios.patch(`${_url}/coupons/${o}`,{state:"停用中"}).then(function(e){window.location.href="admin-coupon.html"}).catch(function(e){console.log(e)}):axios.patch(`${_url}/coupons/${o}`,{state:"發佈中"}).then(function(e){window.location.href="admin-coupon.html"}).catch(function(e){console.log(e)})}});
