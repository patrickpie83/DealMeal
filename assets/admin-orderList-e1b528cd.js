import"./bootstrap.min-d005857b.js";import"./admin-header-e186e282.js";const a=document.querySelector(".orderStatusTitle"),t=document.querySelector(".orderListContent");let c=location.href.split("=")[1];const f="http://localhost:3000";Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:r=>{r.onmouseenter=Swal.stopTimer,r.onmouseleave=Swal.resumeTimer}});c=="notProcessedOrder"?(c="尚未處理",a.textContent="尚未處理的訂單"):c=="processingOrder"?(c="揀貨中",a.textContent="揀貨中的訂單"):c=="deliveringOrder"?(c="出貨中",a.textContent="出貨中的訂單"):c=="canceledOrder"?(c="訂單取消",a.textContent="已取消的訂單"):c=="completedOrder"&&(c="訂單完成",a.textContent="已完成的訂單");p();function p(){axios.get(`${f}/orders`).then(function(r){h(r.data)}).catch(function(r){console.log(r)})}function h(r){let i="";r.forEach(function(e){if(e.status==c){let d="";e.status=="尚未處理"?d=`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="notProcessed-${e.id}" checked>
                    <label class="form-check-label" for="notProcessed-${e.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="processing-${e.id}">
                    <label class="form-check-label" for="processing-${e.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="delivering-${e.id}">
                    <label class="form-check-label" for="delivering-${e.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="orderCanceled-${e.id}">
                    <label class="form-check-label" for="orderCanceled-${e.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="orderCompleted-${e.id}">
                    <label class="form-check-label" for="orderCompleted-${e.id}">訂單完成</label>
                </div>
                `:e.status=="揀貨中"?d=`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="notProcessed-${e.id}">
                    <label class="form-check-label" for="notProcessed-${e.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="processing-${e.id}" checked>
                    <label class="form-check-label" for="processing-${e.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="delivering-${e.id}">
                    <label class="form-check-label" for="delivering-${e.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="orderCanceled-${e.id}">
                    <label class="form-check-label" for="orderCanceled-${e.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="orderCompleted-${e.id}">
                    <label class="form-check-label" for="orderCompleted-${e.id}">訂單完成</label>
                </div>
                `:e.status=="出貨中"?d=`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="notProcessed-${e.id}">
                    <label class="form-check-label" for="notProcessed-${e.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="processing-${e.id}">
                    <label class="form-check-label" for="processing-${e.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="delivering-${e.id}" checked>
                    <label class="form-check-label" for="delivering-${e.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="orderCanceled-${e.id}">
                    <label class="form-check-label" for="orderCanceled-${e.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="orderCompleted-${e.id}">
                    <label class="form-check-label" for="orderCompleted-${e.id}">訂單完成</label>
                </div>
                `:e.status=="訂單取消"?d=`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="notProcessed-${e.id}">
                    <label class="form-check-label" for="notProcessed-${e.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="processing-${e.id}">
                    <label class="form-check-label" for="processing-${e.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="delivering-${e.id}">
                    <label class="form-check-label" for="delivering-${e.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="orderCanceled-${e.id}" checked>
                    <label class="form-check-label" for="orderCanceled-${e.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="orderCompleted-${e.id}">
                    <label class="form-check-label" for="orderCompleted-${e.id}">訂單完成</label>
                </div>
                `:e.status=="訂單完成"&&(d=`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="notProcessed-${e.id}">
                    <label class="form-check-label" for="notProcessed-${e.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="processing-${e.id}">
                    <label class="form-check-label" for="processing-${e.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="delivering-${e.id}">
                    <label class="form-check-label" for="delivering-${e.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="orderCanceled-${e.id}">
                    <label class="form-check-label" for="orderCanceled-${e.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${e.id}" id="orderCompleted-${e.id}" checked>
                    <label class="form-check-label" for="orderCompleted-${e.id}">訂單完成</label>
                </div>
                `);let o=e.cart,s="";for(let l=0;l<o.length;l++)l==o.length-1?s+=`${o[l].productName}X${o[l].quantity}`:s+=`${o[l].productName}X${o[l].quantity}、`;let n="";e.couponDiscount?n=`${e.couponDiscount}`:n="無",i+=`
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
                    <p>${s}</p>
                    <p>使用優惠代碼：${n}</p>
                    <p>訂單總額：${e.total}元</p>
                    <p>付款方式：${e.payment}</p>
                    <p>訂購人電話：${e.deliverInfo.tel}</p>
                    <p>配送地址：${e.deliverInfo.address}</p>
                  </div>
                </td>
            </tr>
            
            `}}),t.innerHTML=i,i||(t.innerHTML=`
        <tr>
            <td class="py-5" colspan="5" >目前無此狀態的訂單</td>
        </tr>
        `)}
