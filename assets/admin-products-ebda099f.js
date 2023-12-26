import"./bootstrap.min-f122c4cb.js";import"./admin-header-e186e282.js";const m=document.querySelector(".filterArea"),S=document.querySelector("#selectStatus"),b=document.querySelector("#selectSeries"),h=document.querySelector(".editBtn"),g=document.querySelector(".finishBtn"),$=document.querySelector(".finishContent"),k=document.querySelector(".finishConfirmBtn"),p=document.querySelector(".productListContent"),d="https://dealmealserver.onrender.com",v=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:e=>{e.onmouseenter=Swal.stopTimer,e.onmouseleave=Swal.resumeTimer}});x();let c=[],i=[];function x(){axios.get(`${d}/products`).then(function(e){c=e.data,i=c,u(c)}).catch(function(e){console.log(e)}),axios.get(`${d}/productsEditTemp`).then(function(e){e.data.forEach(function(a){axios.delete(`${d}/productsEditTemp/${a.id}`).then(function(t){}).catch(function(t){console.log(t)})})}).catch(function(e){console.log(e)})}function u(e){let a="";e.forEach(function(t){let s="",o=t.state;o=="販售中"?s=`
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
            `:o=="完售中"&&(s=`
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
            `);let n="";t.storage<=0?n='<span class="text-danger">庫存量：無</span>':t.storage<=10?n='<span class="text-info">庫存量：低</span>':t.storage<=20?n='<span class="text-success">庫存量：中</span>':n='<span class="text-primary">庫存量：高</span>',a+=`
        <tr class="align-middle border border-primary">
            <td class="p-3" style="width: 110px;">
                <div class="ratio ratio-1x1 ">
                    <img src="${t.image}" alt="${t.name}">
                </div>
            </td>
            <td>${t.series}</td>
            <td>${t.name}</td>
            <td>${t.price}元</td>
            ${s}
            <td>
                <span>${t.storage}份，</span>
                ${n}
            </td>
            <td>
                <input type="number" disabled>
            </td>
            <td>
                <a href="admin-detail.html?id=${t.id}">詳細內容</a>
            </td>
        </tr>
        `}),p.innerHTML=a}h.addEventListener("click",function(e){c.forEach(function(a){axios.post(`${d}/productsEditTemp`,a).then(function(t){}).catch(function(t){console.log(t)})}),y(c),g.classList.remove("disabled"),h.classList.add("disabled"),S.disabled="ture",b.disabled="ture"});function y(e){let a="";e.forEach(function(t){let s="",o=t.state;o=="販售中"?s=`
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
            `:o=="完售中"&&(s=`
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
            `);let n="";t.storage<=0?n='<span class="text-danger">庫存量：無</span>':t.storage<=10?n='<span class="text-info">庫存量：低</span>':t.storage<=20?n='<span class="text-success">庫存量：中</span>':n='<span class="text-primary">庫存量：高</span>',a+=`
        <tr class="align-middle border border-primary">
            <td class="p-3" style="width: 110px;">
                <div class="ratio ratio-1x1 ">
                    <img src="${t.image}" alt="${t.name}">
                </div>
            </td>
            <td>${t.series}</td>
            <td>${t.name}</td>
            <td>${t.price}元</td>
            ${s}
            <td>
                <span>${t.storage}份，</span>
                ${n}
            </td>
            <td>
                <input type="number" min="0" data-js="editStorage" data-js-id="${t.id}">
            </td>
            <td>
                <a >詳細內容</a>
            </td>
        </tr>
        `}),p.innerHTML=a}p.addEventListener("click",function(e){if(e.target.getAttribute("data-js")=="editState"){let a=e.target.getAttribute("data-js-id"),t=e.target.getAttribute("data-js-state");axios.patch(`${d}/productsEditTemp/${a}`,{state:t}).then(function(s){}).catch(function(s){console.log(s)})}});p.addEventListener("change",function(e){if(e.target.getAttribute("data-js")=="editStorage"){let a=e.target.getAttribute("data-js-id"),t=Number(e.target.value);axios.get(`${d}/products/${a}`).then(function(s){let o=s.data.storage;axios.patch(`${d}/productsEditTemp/${a}`,{storage:o+t}).then(function(n){}).catch(function(n){console.log(n)})}).catch(function(s){console.log(s)})}});let f="";g.addEventListener("click",function(e){axios.get(`${d}/productsEditTemp`).then(function(a){f="",a.data.forEach(function(t){c.forEach(function(s){t.id==s.id&&(t.state!=s.state||t.storage!=s.storage)&&(f+=`<span class="text-danger">${t.name}</span> 的架上狀態修改為 <span class="text-danger">${t.state}</span> ，所增加庫存量為 <span class="text-danger">${t.storage-s.storage} 份</span><br>`)})}),f?$.innerHTML=`
            本次編輯的資料為<br>
            ${f}
            `:$.innerHTML=`
            無變更資料，確認後離開編輯模式
            `}).catch(function(a){console.log(a)})});k.addEventListener("click",function(e){f?axios.get(`${d}/productsEditTemp`).then(function(a){let t=a.data.length,s=0;a.data.forEach(function(o){axios.patch(`${d}/products/${o.id}`,o).then(function(n){s+=1,s==t&&v.fire({icon:"success",title:"修改成功"}).then(E=>{location.reload()})}).catch(function(n){console.log(n)})})}).catch(function(a){console.log(a)}):location.reload()});let r="全部",l="全部";m.addEventListener("change",function(e){let a=[];e.target.getAttribute("id")=="selectStatus"?r=e.target.value:e.target.getAttribute("id")=="selectSeries"&&(l=e.target.value),console.log(r),console.log(l),r=="全部"&&l=="全部"?(c=i,u(c)):l=="全部"?(i.forEach(function(t){t.state==r&&a.push(t)}),c=a,u(c)):r=="全部"?(i.forEach(function(t){t.series==l&&a.push(t)}),c=a,u(c)):(i.forEach(function(t){t.state==r&&t.series==l&&a.push(t)}),c=a,u(c))});
