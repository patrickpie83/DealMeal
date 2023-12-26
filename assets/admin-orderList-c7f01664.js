import"./bootstrap.min-f122c4cb.js";import"./admin-header-e186e282.js";const n=document.querySelector(".orderStatusTitle"),u=document.querySelector(".orderListContent");document.querySelector(".moveOrderContent");document.querySelector(".moveOrderConfirmBtn");let c=location.href.split("=")[1];const f="http://localhost:3000",p=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:r=>{r.onmouseenter=Swal.stopTimer,r.onmouseleave=Swal.resumeTimer}});c=="notProcessedOrder"?(c="尚未處理",n.textContent="尚未處理的訂單"):c=="processingOrder"?(c="揀貨中",n.textContent="揀貨中的訂單"):c=="deliveringOrder"?(c="出貨中",n.textContent="出貨中的訂單"):c=="canceledOrder"?(c="訂單取消",n.textContent="已取消的訂單"):c=="completedOrder"&&(c="訂單完成",n.textContent="已完成的訂單");h();function h(){axios.get(`${f}/orders`).then(function(r){k(r.data)}).catch(function(r){console.log(r)})}function k(r){let o="";r.forEach(function(e){if(e.status==c){let d="";e.status=="尚未處理"?d=`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="尚未處理" name="orderStatus-${e.id}" id="notProcessed-${e.id}" checked>
                    <label class="form-check-label" for="notProcessed-${e.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="揀貨中" name="orderStatus-${e.id}" id="processing-${e.id}">
                    <label class="form-check-label" for="processing-${e.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="出貨中" name="orderStatus-${e.id}" id="delivering-${e.id}">
                    <label class="form-check-label" for="delivering-${e.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="訂單取消" name="orderStatus-${e.id}" id="orderCanceled-${e.id}">
                    <label class="form-check-label" for="orderCanceled-${e.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="訂單完成" name="orderStatus-${e.id}" id="orderCompleted-${e.id}">
                    <label class="form-check-label" for="orderCompleted-${e.id}">訂單完成</label>
                </div>
                `:e.status=="揀貨中"?d=`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="尚未處理" name="orderStatus-${e.id}" id="notProcessed-${e.id}">
                    <label class="form-check-label" for="notProcessed-${e.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="揀貨中" name="orderStatus-${e.id}" id="processing-${e.id}" checked>
                    <label class="form-check-label" for="processing-${e.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="出貨中" name="orderStatus-${e.id}" id="delivering-${e.id}">
                    <label class="form-check-label" for="delivering-${e.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="訂單取消" name="orderStatus-${e.id}" id="orderCanceled-${e.id}">
                    <label class="form-check-label" for="orderCanceled-${e.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="訂單完成" name="orderStatus-${e.id}" id="orderCompleted-${e.id}">
                    <label class="form-check-label" for="orderCompleted-${e.id}">訂單完成</label>
                </div>
                `:e.status=="出貨中"?d=`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="尚未處理" name="orderStatus-${e.id}" id="notProcessed-${e.id}">
                    <label class="form-check-label" for="notProcessed-${e.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="揀貨中" name="orderStatus-${e.id}" id="processing-${e.id}">
                    <label class="form-check-label" for="processing-${e.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="出貨中" name="orderStatus-${e.id}" id="delivering-${e.id}" checked>
                    <label class="form-check-label" for="delivering-${e.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="訂單取消" name="orderStatus-${e.id}" id="orderCanceled-${e.id}">
                    <label class="form-check-label" for="orderCanceled-${e.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="訂單完成" name="orderStatus-${e.id}" id="orderCompleted-${e.id}">
                    <label class="form-check-label" for="orderCompleted-${e.id}">訂單完成</label>
                </div>
                `:e.status=="訂單取消"?d=`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="尚未處理" name="orderStatus-${e.id}" id="notProcessed-${e.id}">
                    <label class="form-check-label" for="notProcessed-${e.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="揀貨中" name="orderStatus-${e.id}" id="processing-${e.id}">
                    <label class="form-check-label" for="processing-${e.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="出貨中" name="orderStatus-${e.id}" id="delivering-${e.id}">
                    <label class="form-check-label" for="delivering-${e.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="訂單取消" name="orderStatus-${e.id}" id="orderCanceled-${e.id}" checked>
                    <label class="form-check-label" for="orderCanceled-${e.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="訂單完成" name="orderStatus-${e.id}" id="orderCompleted-${e.id}">
                    <label class="form-check-label" for="orderCompleted-${e.id}">訂單完成</label>
                </div>
                `:e.status=="訂單完成"&&(d=`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="尚未處理" name="orderStatus-${e.id}" id="notProcessed-${e.id}">
                    <label class="form-check-label" for="notProcessed-${e.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="揀貨中" name="orderStatus-${e.id}" id="processing-${e.id}">
                    <label class="form-check-label" for="processing-${e.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="出貨中" name="orderStatus-${e.id}" id="delivering-${e.id}">
                    <label class="form-check-label" for="delivering-${e.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="訂單取消" name="orderStatus-${e.id}" id="orderCanceled-${e.id}">
                    <label class="form-check-label" for="orderCanceled-${e.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" data-status="訂單完成" name="orderStatus-${e.id}" id="orderCompleted-${e.id}" checked>
                    <label class="form-check-label" for="orderCompleted-${e.id}">訂單完成</label>
                </div>
                `);let s=e.cart,t="";for(let a=0;a<s.length;a++)a==s.length-1?t+=`${s[a].productName}X${s[a].quantity}`:t+=`${s[a].productName}X${s[a].quantity}、`;let l="";e.couponDiscount?l=`${e.couponDiscount}`:l="無",o+=`
            <tr>
                <td>${e.orderDate}</td>
                <td>${e.id}</td>
                <td>${e.deliverInfo.name}</td>

                <td>
                ${d}
                </td>

                <td>
                  <a class="text-decoration-none" href="#" data-bs-toggle="collapse" data-bs-target="#orderNum-${e.id}">+</a>
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  <div id="orderNum-${e.id}" class="collapse">
                    <p>${t}</p>
                    <p>使用優惠代碼：${l}</p>
                    <p>訂單總額：${e.total}元</p>
                    <p>付款方式：${e.payment}</p>
                    <p>訂購人電話：${e.deliverInfo.tel}</p>
                    <p>配送地址：${e.deliverInfo.address}</p>
                  </div>
                </td>
            </tr>
            
            `}}),u.innerHTML=o,o||(u.innerHTML=`
        <tr>
            <td class="py-5" colspan="5" >目前無此狀態的訂單</td>
        </tr>
        `)}u.addEventListener("change",function(r){let o=r.target.getAttribute("data-status"),e=r.target.getAttribute("name").split("orderStatus-")[1];Swal.fire({title:`移動訂單：${e}，<br>狀態改為${o} `,showDenyButton:!0,showCancelButton:!1,confirmButtonText:"確認",denyButtonText:"取消"}).then(d=>{d.isConfirmed&&axios.patch(`${f}/orders/${e}`,{status:o}).then(function(s){let t=s.data.memberId,l=[];axios.get(`${f}/users/${t}`).then(function(a){l=a.data.historyOrder,l.forEach(function(i){i.id==e&&(i.status=o)}),axios.patch(`${f}/users/${t}`,{historyOrder:l}).then(function(i){p.fire({icon:"success",title:"修改成功"}).then($=>{location.reload()})}).catch(function(i){console.log(i)})}).catch(function(a){console.log(a)})}).catch(function(s){console.log(s)})})});
