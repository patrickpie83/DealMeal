import"./bootstrap.min-d005857b.js";import"./admin-header-663d3a3c.js";import"./config-b9ecf40d.js";const l=document.querySelector(".editBtn"),i=document.querySelector(".finishBtn"),r=document.querySelector(".finishContent"),u=document.querySelector(".finishConfirmBtn"),d=document.querySelector(".productListContent");f();function f(){axios.get(`${_url}/products`).then(function(n){p(n.data)}).catch(function(n){console.log(n)}),axios.get(`${_url}/productsEditTemp`).then(function(n){n.data.forEach(function(a){axios.delete(`${_url}/productsEditTemp/${a.id}`).then(function(t){}).catch(function(t){console.log(t)})})}).catch(function(n){console.log(n)})}function p(n){let a="";n.forEach(function(t){let e="",c=t.state;c=="販售中"?e=`
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
            `:c=="完售中"&&(e=`
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
            ${e}
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
        `}),d.innerHTML=a}l.addEventListener("click",function(n){axios.get(`${_url}/products`).then(function(a){a.data.forEach(function(t){axios.post(`${_url}/productsEditTemp`,t).then(function(e){}).catch(function(e){console.log(e)})}),h(a.data),i.classList.remove("disabled"),l.classList.add("disabled")}).catch(function(a){console.log(a)})});function h(n){let a="";n.forEach(function(t){let e="",c=t.state;c=="販售中"?e=`
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
            `:c=="完售中"&&(e=`
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
            ${e}
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
        `}),d.innerHTML=a}d.addEventListener("click",function(n){if(n.target.getAttribute("data-js")=="editState"){let a=n.target.getAttribute("data-js-id"),t=n.target.getAttribute("data-js-state");axios.patch(`${_url}/productsEditTemp/${a}`,{state:t}).then(function(e){}).catch(function(e){console.log(e)})}});d.addEventListener("change",function(n){if(n.target.getAttribute("data-js")=="editStorage"){let a=n.target.getAttribute("data-js-id"),t=Number(n.target.value);axios.get(`${_url}/products/${a}`).then(function(e){let c=e.data.storage;axios.patch(`${_url}/productsEditTemp/${a}`,{storage:c+t}).then(function(s){}).catch(function(s){console.log(s)})}).catch(function(e){console.log(e)})}});let o="";i.addEventListener("click",function(n){axios.get(`${_url}/productsEditTemp`).then(function(a){axios.get(`${_url}/products`).then(function(t){o="";let e=[];e=t.data,a.data.forEach(function(c){e.forEach(function(s){c.id==s.id&&(c.state!=s.state||c.storage!=s.storage)&&(o+=`<span class="text-danger">${c.name}</span> 的架上狀態修改為 <span class="text-danger">${c.state}</span> ，所增加庫存量為 <span class="text-danger">${c.storage-s.storage} 份</span><br>`)})}),o?r.innerHTML=`
                本次編輯的資料為<br>
                ${o}
                `:r.innerHTML=`
                無變更資料，確認後離開編輯模式
                `}).catch(function(t){console.log(t)})}).catch(function(a){console.log(a)})});u.addEventListener("click",function(n){o?axios.get(`${_url}/productsEditTemp`).then(function(a){let t=a.data.length,e=0;a.data.forEach(function(c){axios.patch(`${_url}/products/${c.id}`,c).then(function(s){e+=1,e==t&&Toast.fire({icon:"success",title:"修改成功"}).then($=>{location.reload()})}).catch(function(s){console.log(s)})})}).catch(function(a){console.log(a)}):location.reload()});
