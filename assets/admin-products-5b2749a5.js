import"./bootstrap.min-d005857b.js";import"./admin-header-e186e282.js";const l=document.querySelector(".editBtn"),u=document.querySelector(".finishBtn"),i=document.querySelector(".finishContent"),f=document.querySelector(".finishConfirmBtn"),r=document.querySelector(".productListContent"),c="http://localhost:3000",p=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:e=>{e.onmouseenter=Swal.stopTimer,e.onmouseleave=Swal.resumeTimer}});h();function h(){axios.get(`${c}/products`).then(function(e){$(e.data)}).catch(function(e){console.log(e)}),axios.get(`${c}/productsEditTemp`).then(function(e){e.data.forEach(function(a){axios.delete(`${c}/productsEditTemp/${a.id}`).then(function(t){}).catch(function(t){console.log(t)})})}).catch(function(e){console.log(e)})}function $(e){let a="";e.forEach(function(t){let n="",o=t.state;o=="販售中"?n=`
            <td>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${t.name}" id="onSale-${t.name}" checked disabled>
                    <label class="form-check-label" for="onSale-${t.name}">
                        販售中
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${t.name}" id="soldOut-${t.name}"  disabled>
                    <label class="form-check-label" for="soldOut-${t.name}">
                        完售中
                    </label>
                </div>
            </td>
            `:o=="完售中"&&(n=`
            <td>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${t.name}" id="onSale-${t.name}" disabled>
                    <label class="form-check-label" for="onSale-${t.name}">
                        販售中
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${t.name}" id="soldOut-${t.name}" checked disabled>
                    <label class="form-check-label" for="soldOut-${t.name}">
                        完售中
                    </label>
                </div>
            </td>
            `);let s="";t.storage<=0?s='<span class="text-danger">庫存量：無</span>':t.storage<=10?s='<span class="text-info">庫存量：低</span>':t.storage<=20?s='<span class="text-success">庫存量：中</span>':s='<span class="text-primary">庫存量：高</span>',a+=`
        <tr class="align-middle border border-primary">
            <td class="p-3" style="width: 110px;">
                <div class="ratio ratio-1x1 ">
                    <img src="${t.image}" alt="${t.name}">
                </div>
            </td>
            <td>${t.series}</td>
            <td>${t.name}</td>
            <td>${t.price}元</td>
            ${n}
            <td>
                <span>${t.storage}份，</span>
                ${s}
            </td>
            <td>
                <input type="number" disabled>
            </td>
            <td>
                <a href="admin-detail.html?id=${t.id}">詳細內容</a>
            </td>
        </tr>
        `}),r.innerHTML=a}l.addEventListener("click",function(e){axios.get(`${c}/products`).then(function(a){a.data.forEach(function(t){axios.post(`${c}/productsEditTemp`,t).then(function(n){}).catch(function(n){console.log(n)})}),g(a.data),u.classList.remove("disabled"),l.classList.add("disabled")}).catch(function(a){console.log(a)})});function g(e){let a="";e.forEach(function(t){let n="",o=t.state;o=="販售中"?n=`
            <td>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${t.name}" id="onSale-${t.name}" data-js="editState" data-js-id="${t.id}" data-js-name="${t.name}" data-js-state="販售中" checked>
                    <label class="form-check-label" for="onSale-${t.name}">
                        販售中
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${t.name}" id="soldOut-${t.name}" data-js="editState" data-js-id="${t.id}" data-js-name="${t.name}" data-js-state="完售中">
                    <label class="form-check-label" for="soldOut-${t.name}">
                        完售中
                    </label>
                </div>
            </td>
            `:o=="完售中"&&(n=`
            <td>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${t.name}" id="onSale-${t.name}" data-js="editState" data-js-id="${t.id}" data-js-name="${t.name}" data-js-state="販售中">
                    <label class="form-check-label" for="onSale-${t.name}">
                        販售中
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${t.name}" id="soldOut-${t.name}" data-js="editState" data-js-id="${t.id}" data-js-name="${t.name}" data-js-state="完售中" checked>
                    <label class="form-check-label" for="soldOut-${t.name}">
                        完售中
                    </label>
                </div>
            </td>
            `);let s="";t.storage<=0?s='<span class="text-danger">庫存量：無</span>':t.storage<=10?s='<span class="text-info">庫存量：低</span>':t.storage<=20?s='<span class="text-success">庫存量：中</span>':s='<span class="text-primary">庫存量：高</span>',a+=`
        <tr class="align-middle border border-primary">
            <td class="p-3" style="width: 110px;">
                <div class="ratio ratio-1x1 ">
                    <img src="${t.image}" alt="${t.name}">
                </div>
            </td>
            <td>${t.series}</td>
            <td>${t.name}</td>
            <td>${t.price}元</td>
            ${n}
            <td>
                <span>${t.storage}份，</span>
                ${s}
            </td>
            <td>
                <input type="number" min="0" data-js="editStorage" data-js-id="${t.id}">
            </td>
            <td>
                <a >詳細內容</a>
            </td>
        </tr>
        `}),r.innerHTML=a}r.addEventListener("click",function(e){if(e.target.getAttribute("data-js")=="editState"){let a=e.target.getAttribute("data-js-id"),t=e.target.getAttribute("data-js-state");axios.patch(`${c}/productsEditTemp/${a}`,{state:t}).then(function(n){}).catch(function(n){console.log(n)})}});r.addEventListener("change",function(e){if(e.target.getAttribute("data-js")=="editStorage"){let a=e.target.getAttribute("data-js-id"),t=Number(e.target.value);axios.get(`${c}/products/${a}`).then(function(n){let o=n.data.storage;axios.patch(`${c}/productsEditTemp/${a}`,{storage:o+t}).then(function(s){}).catch(function(s){console.log(s)})}).catch(function(n){console.log(n)})}});let d="";u.addEventListener("click",function(e){axios.get(`${c}/productsEditTemp`).then(function(a){axios.get(`${c}/products`).then(function(t){d="";let n=[];n=t.data,a.data.forEach(function(o){n.forEach(function(s){o.id==s.id&&(o.state!=s.state||o.storage!=s.storage)&&(d+=`<span class="text-danger">${o.name}</span> 的架上狀態修改為 <span class="text-danger">${o.state}</span> ，所增加庫存量為 <span class="text-danger">${o.storage-s.storage} 份</span><br>`)})}),d?i.innerHTML=`
                本次編輯的資料為<br>
                ${d}
                `:i.innerHTML=`
                無變更資料，確認後離開編輯模式
                `}).catch(function(t){console.log(t)})}).catch(function(a){console.log(a)})});f.addEventListener("click",function(e){d?axios.get(`${c}/productsEditTemp`).then(function(a){let t=a.data.length,n=0;a.data.forEach(function(o){axios.patch(`${c}/products/${o.id}`,o).then(function(s){n+=1,n==t&&p.fire({icon:"success",title:"修改成功"}).then(m=>{location.reload()})}).catch(function(s){console.log(s)})})}).catch(function(a){console.log(a)}):location.reload()});
