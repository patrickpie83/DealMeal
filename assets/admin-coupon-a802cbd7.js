import"./bootstrap.min-f122c4cb.js";import"./admin-header-e186e282.js";const c=document.querySelector(".releaseCouponForm"),b=document.querySelector("#releaseCouponDate"),i=document.querySelector("#releaseCouponId"),d=document.querySelector("#releaseCouponName"),u=document.querySelector("#releaseCouponUsage"),p=document.querySelector("#releaseCouponDiscount"),v=document.querySelector(".checkIdBtn"),r=document.querySelector(".checkIdText"),f=document.querySelector(".couponList"),C=document.querySelector(".cancelCouponBtn"),$=document.querySelector(".checkCouponBtn"),s="http://localhost:3000",a=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:t=>{t.onmouseenter=Swal.stopTimer,t.onmouseleave=Swal.resumeTimer}});y();function y(){axios.get(`${s}/coupons`).then(function(t){w(t.data)}).catch(function(t){console.log(t)})}function w(t){let n="",o="";t.forEach(function(e){e.state=="發佈中"?o=`
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
        `}),f.innerHTML=n}v.addEventListener("click",function(t){axios.get(`${s}/coupons`).then(function(n){let o=!0;n.data.forEach(function(e){i.value==e.id&&(o=o&&!1)}),o?r.innerHTML=' <p class="fs-7 text-success">此序號可以使用</p>':r.innerHTML=' <p class="fs-7 text-danger">此序號已重複</p>'}).catch(function(n){console.log(n)})});C.addEventListener("click",function(){c.reset()});$.addEventListener("click",function(t){t.preventDefault();const n={發佈日期:{presence:{allowEmpty:!1,message:"是必填欄位"}}},o={優惠碼序號:{presence:{allowEmpty:!1,message:"是必填欄位"}}},e=validate(c,n),l=validate(c,o),h=d.value=="請選擇",m=u.value=="請選擇",g=p.value=="請選擇";e?a.fire({icon:"warning",title:`${e.發佈日期}`}):l?a.fire({icon:"warning",title:`${l.優惠碼序號}`}):h||m||g?a.fire({icon:"warning",title:"尚有欄位未選擇"}):k()});function k(){axios.post(`${s}/coupons`,{id:i.value,date:b.value,name:d.value,usage:u.value,discount:p.value,state:"發佈中",useCount:0}).then(function(t){a.fire({icon:"warning",title:"發佈成功"}).then(n=>{window.location.href="admin-coupon.html"})}).catch(function(t){console.log(t),a.fire({icon:"error",title:"發佈失敗"})})}f.addEventListener("click",function(t){if(t.preventDefault(),t.target.innerHTML=="確認"){let n=t.target.getAttribute("data-js-state"),o=t.target.getAttribute("data-js-switchState");n=="發佈中"?axios.patch(`${s}/coupons/${o}`,{state:"停用中"}).then(function(e){window.location.href="admin-coupon.html"}).catch(function(e){console.log(e)}):axios.patch(`${s}/coupons/${o}`,{state:"發佈中"}).then(function(e){window.location.href="admin-coupon.html"}).catch(function(e){console.log(e)})}});
