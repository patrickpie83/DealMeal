import"./bootstrap.min-d005857b.js";import"./admin-header-663d3a3c.js";import"./config-b9ecf40d.js";const T=document.querySelector(".imgUpload"),i=document.querySelector(".imgInput"),a=document.querySelector(".imgArea"),L=document.querySelector(".imgCancel"),l=document.querySelector("#productSeries"),k=document.querySelector(".checkNameBtn"),n=document.querySelector("#productName"),t=document.querySelector("#existNameText"),s=document.querySelector("#productPrice"),d=document.querySelector("#productStock"),m=document.querySelector("#productIngredient"),f=document.querySelector("#productSize"),v=document.querySelector("#productCalories"),p=document.querySelector("#productCarb"),g=document.querySelector("#productProtein"),S=document.querySelector("#productFat"),y=document.querySelector("#microwave"),q=document.querySelector("#oven"),x=document.querySelector("#electricPot"),h=document.querySelector("#pan"),b=document.querySelector(".finishBtn");let r=!1,u=!1;T.addEventListener("click",function(e){e.preventDefault(),a.innerHTML=`
    <img class="" src="${i.value}" alt="">
    `,u=!0});L.addEventListener("click",function(e){e.preventDefault(),a.innerHTML=`
    <p class="text-danger">目前是空的</p>
    `,i.value="",u=!1});k.addEventListener("click",function(e){e.preventDefault(),n.value||Toast.fire({icon:"warning",title:"商品名稱不可為空"}),w(n.value)});function w(e){axios.get(`${_url}/products`).then(function(c){if(!e)t.classList.remove("text-success"),t.classList.add("text-danger"),t.textContent="名稱不可為空",r=!1;else{let o=!1;c.data.forEach(function(N){if(N.name==e){o=o||!0;return}else o=o||!1}),o?(t.classList.remove("text-success"),t.classList.add("text-danger"),t.textContent="此名稱已存在",r=!1):(t.classList.remove("text-danger"),t.classList.add("text-success"),t.textContent="此名稱可以使用",r=!0)}}).catch(function(c){console.log(c)})}function C(){let e=crypto.randomUUID();axios.post(`${_url}/products`,{id:e,image:i.value,series:l.value,name:n.value,storage:Number(d.value),price:Number(s.value),state:"完售中",ingredient:m.value,nutrition:{size:Number(f.value),calories:Number(v.value),carb:Number(p.value),protein:Number(g.value),fat:Number(S.value)},heat:{microwave:y.value,oven:q.value,electricPot:x.value,pan:h.value}}).then(function(c){Toast.fire({icon:"success",title:"成功送出"}).then(o=>{window.location.href="admin-products.html"})}).catch(function(c){console.log(c)})}b.addEventListener("click",function(e){e.preventDefault(),w(n.value),i.value?u?l.value=="請選擇"?Toast.fire({icon:"warning",title:"尚未選取商品系列"}):n.value?r?s.value?d.value?m.value?f.value&&v.value&&p.value&&g.value&&S.value?y.value&&q.value&&x.value&&h.value?C():Toast.fire({icon:"warning",title:"加熱方式不可為空"}):Toast.fire({icon:"warning",title:"營養標示不可為空"}):Toast.fire({icon:"warning",title:"內容物不可為空"}):Toast.fire({icon:"warning",title:"庫存不可為空"}):Toast.fire({icon:"warning",title:"單價不可為空"}):Toast.fire({icon:"warning",title:"請檢查商品名稱"}):Toast.fire({icon:"warning",title:"商品名稱不可為空"}):Toast.fire({icon:"warning",title:"請先預覽過圖片"}):Toast.fire({icon:"warning",title:"圖片網址不可為空"})});
