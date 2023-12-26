import"./bootstrap.min-f122c4cb.js";import"./admin-header-e186e282.js";const f=document.querySelector("#selectMonth"),$=document.querySelector(".productList"),b=document.querySelector(".totalContent"),d=document.querySelector(".chartContent"),u="https://dealmealserver.onrender.com";v();let h=[];function v(){axios.get(`${u}/sales`).then(function(t){h=t.data,o(t.data)}).catch(function(t){console.log(t)})}let l;function o(t){l={},t.forEach(e=>{l[e.monthId]==null&&(l[e.monthId]={})}),t.forEach(e=>{e.products.forEach(s=>{l[e.monthId][s.name]==null?l[e.monthId][s.name]={image:s.image,series:s.series,price:s.price,saleQuantity:s.saleQuantity,saleFigures:s.saleFigures}:(l[e.monthId][s.name].saleQuantity+=s.saleQuantity,l[e.monthId][s.name].saleFigures+=s.saleFigures)})}),F(l)}function F(t){let e="",s=0,c=0;const g=Object.keys(t);d.innerHTML="",g.forEach(n=>{let y=Object.keys(t[n]),r={},i=[];y.forEach(a=>{e+=`
            <tr class="align-middle border border-primary">
                <td>${n}</td>
                <td class="p-3" style="width: 110px;">
                  <div class="ratio ratio-1x1 ">
                    <img src="${t[n][a].image}" alt="${a}">
                  </div>
                </td>
                <td>${t[n][a].series}</td>
                <td>${a}</td>
                <td>${t[n][a].price}元</td>
                <td>${t[n][a].saleQuantity}份</td>
                <td>${t[n][a].saleFigures}元</td>
              </tr>
            `,s+=t[n][a].saleQuantity,c+=t[n][a].saleFigures,i.push([a,t[n][a].saleFigures])}),r[n]=i,d.innerHTML+=`
        <p class="mt-7">銷售月份：${n}</p>
        <div id="chart-${n}"></div>
        `,c3.generate({bindto:`#chart-${n}`,data:{columns:r[n],type:"bar"},bar:{width:100}})}),$.innerHTML=e,b.innerHTML=`
    <td>${s}份</td>
    <td>${c}元</td>
    `}f.addEventListener("change",t=>{t.target.value=="全部"?o(h):axios.get(`${u}/sales?monthId=${t.target.value}`).then(function(e){o(e.data)}).catch(function(e){console.log(e)})});
