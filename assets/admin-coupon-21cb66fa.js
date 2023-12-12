import"./bootstrap.min-275429c0.js";import"./admin-header-184d0ca2.js";const c=document.querySelector(".releaseCouponForm"),h=document.querySelector("#releaseCouponDate"),m=document.querySelector("#releaseCouponId"),l=document.querySelector("#releaseCouponName"),r=document.querySelector("#releaseCouponUsage"),d=document.querySelector("#releaseCouponDiscount"),u=document.querySelector(".couponList"),b=document.querySelector(".checkCouponBtn"),n="https://dealmealserver.onrender.com";g();function g(){axios.get(`${n}/coupons`).then(function(t){v(t.data)}).catch(function(t){console.log(t)})}function v(t){let a="",o="";t.forEach(function(e){e.state=="發佈中"?o=`
            <input class="form-check-input" type="checkbox" role="switch" id="${e.id}" checked data-bs-toggle="modal" data-bs-target="#couponAlert-${e.id}">
            `:o=`
            <input class="form-check-input" type="checkbox" role="switch" id="${e.id}" data-bs-toggle="modal" data-bs-target="#couponAlert-${e.id}">
            `,a+=`
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
                                按下確認後將切換此優惠碼可使用狀態
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
        `}),u.innerHTML=a}b.addEventListener("click",function(t){t.preventDefault();const a={發佈日期:{presence:{allowEmpty:!1,message:"是必填欄位"}}},o={優惠碼序號:{presence:{allowEmpty:!1,message:"是必填欄位"}}},e=validate(c,a),s=validate(c,o),i=l.value=="請選擇",p=r.value=="請選擇",f=d.value=="請選擇";e?alert(`${e.發佈日期}`):s?alert(`${s.優惠碼序號}`):i||p||f?alert("尚有欄位未選擇"):C()});function C(){axios.post(`${n}/coupons`,{id:m.value,date:h.value,name:l.value,usage:r.value,discount:d.value,state:"發佈中",useCount:0}).then(function(t){alert("發佈成功"),window.location.href="admin-coupon.html"}).catch(function(t){console.log(t),alert("發佈失敗")})}u.addEventListener("click",function(t){if(t.preventDefault(),t.target.innerHTML=="確認"){let a=t.target.getAttribute("data-js-state"),o=t.target.getAttribute("data-js-switchState");a=="發佈中"?axios.patch(`${n}/coupons/${o}`,{state:"停用中"}).then(function(e){window.location.href="admin-coupon.html"}).catch(function(e){console.log(e)}):axios.patch(`${n}/coupons/${o}`,{state:"發佈中"}).then(function(e){window.location.href="admin-coupon.html"}).catch(function(e){console.log(e)})}});
