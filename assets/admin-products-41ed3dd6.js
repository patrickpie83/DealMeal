import"./bootstrap.min-275429c0.js";import"./admin-header-184d0ca2.js";const n=document.querySelector(".productListContent"),o="https://dealmealserver.onrender.com";l();function l(){axios.get(`${o}/products`).then(function(e){r(e.data)}).catch(function(e){console.log(e)})}function r(e){console.log(e);let c="";e.forEach(function(a){let s="";a.state=="販售中"?s=`
            <td>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${a.name}" id="onSale-${a.name}" checked>
                    <label class="form-check-label" for="onSale-${a.name}">
                        販售中
                    </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input ms-auto" type="radio" name="productState-${a.name}" id="soldOut-${a.name}">
                <label class="form-check-label" for="soldOut-${a.name}">
                    完售中
                </label>
                </div>
            </td>
            `:s=`
            <td>
                <div class="form-check form-check-inline">
                    <input class="form-check-input ms-auto" type="radio" name="productState-${a.name}" id="onSale-${a.name}" checked>
                    <label class="form-check-label" for="onSale-${a.name}">
                        販售中
                    </label>
                </div>
                <div class="form-check form-check-inline">
                <input class="form-check-input ms-auto" type="radio" name="productState-${a.name}" id="soldOut-${a.name}">
                <label class="form-check-label" for="soldOut-${a.name}">
                    完售中
                </label>
                </div>
            </td>
            `;let t="";a.storage<=0?t='<span class="text-danger">庫存量：無</span>':a.storage<=10?t='<span class="text-info">庫存量：低</span>':a.storage<=20?t='<span class="text-success">庫存量：中</span>':t='<span class="text-primary">庫存量：高</span>',c+=`
        <tr class="align-middle border border-primary">
            <td class="p-3" style="width: 110px;">
                <div class="ratio ratio-1x1 ">
                    <img src="${a.image}" alt="${a.name}">
                </div>
            </td>
            <td>${a.series}</td>
            <td>${a.name}</td>
            <td>${a.price}元</td>
            ${s}
            <td>
                <span>${a.storage}份，</span>
                ${t}
            </td>
            <td>
                <input type="number" disabled>
            </td>
            <td>
                <a href="admin-detail.html?id=${a.id}">詳細內容</a>
            </td>
        </tr>
        `}),n.innerHTML=c}
