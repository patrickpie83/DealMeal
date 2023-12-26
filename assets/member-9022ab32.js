import"./bootstrap.min-f122c4cb.js";import"./header-cf4ee72a.js";const g=document.querySelector(".logoutBtn"),c=document.querySelector(".memberFile"),p=document.querySelector("#memberName"),y=document.querySelector("#memberEmail"),$=document.querySelector("#memberAddress"),v=document.querySelector(".saveFileComfirm"),f=document.querySelector(".historyOrderContent");let d;const h="https://dealmealserver.onrender.com",a=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:t=>{t.onmouseenter=Swal.stopTimer,t.onmouseleave=Swal.resumeTimer}});E();function E(){d=localStorage.getItem("userId"),d?w():window.location.href="login.html"}function w(){axios.get(`${h}/users/${d}`).then(function(t){S(t.data)}).catch(function(t){console.log(t)})}function S(t){p.value=t.name,y.value=t.email,$.value=t.address;let n="",s=t.historyOrder;s.length==0?f.innerHTML=`
        <tr>
            <td class="py-5" colspan="5" >尚無歷史訂單資料</td>
        </tr>
        `:(s.forEach(function(e){let o=e.cart,l="";for(let r=0;r<o.length;r++)r==o.length-1?l+=`${o[r].productName}X${o[r].quantity}`:l+=`${o[r].productName}X${o[r].quantity}、`;let i="";e.couponDiscount?i=`${e.couponDiscount}`:i="無",n+=`
            <tr>
                <td >${e.orderDate}</td>
                <td>${e.id}</td>
                <td>${e.deliverInfo.name}</td>
                <td>${e.status}</td>
                <td>
                    <a class="text-decoration-none" href="#" data-bs-toggle="collapse" data-bs-target="#orderId-${e.id}">+</a>
                </td>
            </tr>
                
            <tr>
                <td colspan="5">
                    <div id="orderId-${e.id}" class="collapse">
                    <p>${l}</p>
                    <p>使用優惠碼：${i}</p>
                    <p>訂單總額：${e.total}元</p>
                    <p>付款方式：${e.payment}</p>
                    <p>訂購人電話：${e.deliverInfo.tel}</p>
                    <p>配送地址：${e.deliverInfo.address}</p>
                    </div>
                </td>
            </tr>
            `}),f.innerHTML=n)}function b(t,n,s){axios.patch(`${h}/users/${d}`,{name:t,address:s,email:n}).then(function(e){a.fire({icon:"success",title:"變更成功"}).then(o=>{window.location.href="member.html"})}).catch(function(e){console.log(e)})}g.addEventListener("click",function(t){t.preventDefault(),localStorage.clear(),window.location.href="index.html"});v.addEventListener("click",function(t){t.preventDefault();const n={用戶名稱:{presence:{allowEmpty:!1,message:"是必填欄位"},format:{pattern:/^[^\s]+([^\s]+)*$/,message:"不可含有空白符號"}}},s={配送地址:{presence:{allowEmpty:!1,message:"是必填欄位"}}},e={電子信箱:{presence:{allowEmpty:!1,message:"是必填欄位"}}},o=validate(c,n),l=validate(c,s),i=validate(c,e);let r=o?`${o.用戶名稱}`:"",m=l?`${l.配送地址}`:"",u=i?`${i.電子信箱}`:"";r?a.fire({icon:"warning",title:`${r}`}):m?a.fire({icon:"warning",title:`${m}`}):u?a.fire({icon:"warning",title:`${u}`}):b(p.value,y.value,$.value)});
