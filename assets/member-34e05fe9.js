import"./bootstrap.min-275429c0.js";import"./header-d5d66ed4.js";const h=document.querySelector(".logoutBtn"),c=document.querySelector(".memberFile"),f=document.querySelector("#memberName"),p=document.querySelector("#memberEmail"),y=document.querySelector("#memberAddress"),v=document.querySelector(".saveFileComfirm"),u=document.querySelector(".historyOrderContent");let d;const $="https://dealmealserver.onrender.com";g();function g(){d=localStorage.getItem("userId"),d?E():window.location.href="login.html"}function E(){axios.get(`${$}/users/${d}`).then(function(t){b(t.data)}).catch(function(t){console.log(t)})}function b(t){f.value=t.name,p.value=t.email,y.value=t.address;let n="",s=t.historyOrder;s.length==0?u.innerHTML=`
        <tr>
            <td class="py-5" colspan="5" >尚無歷史訂單資料</td>
        </tr>
        `:(s.forEach(function(e){let o=e.cart,l="";for(let r=0;r<o.length;r++)r==o.length-1?l+=`${o[r].productName}X${o[r].quantity}`:l+=`${o[r].productName}X${o[r].quantity}、`;let a="";e.couponDiscount?a=`${e.couponDiscount}`:a="無",n+=`
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
                    <p>使用優惠碼：${a}</p>
                    <p>訂單總額：${e.total}元</p>
                    <p>付款方式：${e.payment}</p>
                    <p>訂購人電話：${e.deliverInfo.tel}</p>
                    <p>配送地址：${e.deliverInfo.address}</p>
                    </div>
                </td>
            </tr>
            `}),u.innerHTML=n)}function S(t,n,s){axios.patch(`${$}/users/${d}`,{name:t,address:s,email:n}).then(function(e){alert("變更成功"),window.location.href="member.html"}).catch(function(e){console.log(e)})}h.addEventListener("click",function(t){t.preventDefault(),localStorage.clear(),window.location.href="index.html"});v.addEventListener("click",function(t){t.preventDefault();const n={用戶名稱:{presence:{allowEmpty:!1,message:"是必填欄位"},format:{pattern:/^[^\s]+([^\s]+)*$/,message:"不可含有空白符號"}}},s={配送地址:{presence:{allowEmpty:!1,message:"是必填欄位"}}},e={電子信箱:{presence:{allowEmpty:!1,message:"是必填欄位"}}},o=validate(c,n),l=validate(c,s),a=validate(c,e);let r=o?`${o.用戶名稱}`:"",i=l?`${l.配送地址}`:"",m=a?`${a.電子信箱}`:"";r?alert(r):i?alert(i):m?alert(m):S(f.value,p.value,y.value)});
