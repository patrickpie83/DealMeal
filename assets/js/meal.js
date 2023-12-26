const mealDetail=document.querySelector(".mealDetail");

//取出跳轉商品id，把當前網址切割，取[1]的值 (此id為string)
const id = location.href.split("=")[1];
const _url="https://dealmealserver.onrender.com";
// const _url="http://localhost:3000";

//sweetalert2 timer=1200
const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

//渲染內容
function renderData(data){
    let str="";
    let item=data[0];
    let quantityInputStr="";
    let storageStr="";

    if(item.storage > 0){
        quantityInputStr =`
        <div class="d-flex align-items-center mb-4">
            <p class="mealQuatity me-3">數量</p>
             <input type="number" class="rounded-0 mx-2 border border-primary w-75" value="1" min="1" max="${item.storage}" data-js="addCartQuantity">
        </div>
        <button type="button" class="py-2 py-lg-3 mt-3 mt-lg-5 btn btn-primary text-light-brown w-100 rounded-0">加入購物車</button>
        `;
        storageStr=`
        <p class="mealStorage mb-lg-4">即時庫存：${item.storage}份</p>
        `;
    }else{
        quantityInputStr =`<p class="mealQuatity">完售中</p>`
    }
    
    str+=`
    <div class="row justify-content-between mb-7">
        <div class="col-lg-6">
            <div class="ratio ratio-1x1">
                <img src="${item.image}" alt="${item.name}">
            </div>
        </div>
        <div class="col-lg-6 d-flex flex-column justify-content-between mt-3 mt-lg-0">
            <div>
                <span class="mb-3 text-dark-brown">${item.series}</span>
                <h1 class="mealName mb-4 mb-lg-4">${item.name}</h1>
                ${storageStr}
                <p class="mealPrice fw-bold">售價：${item.price}元</p>
            </div>
            <div class="mt-4 mt-lg-0">
                ${quantityInputStr}
            </div>
        </div>
    </div>

    <h2 class="bg-light-brown fs-5 fw-normal py-2 text-lg-center">內容物</h2>
    <p class="py-5 text-lg-center fs-6">${item.ingredient}</p>
    <div class="row justify-content-between mb-7">
        <div class="col-lg-6 text-lg-center mb-5 mb-lg-0">
            <h2 class="bg-normal-brown fs-5 fw-normal py-2">營養標示</h2>
            <h3 class="fs-6 fw-bold pt-5 mb-1">每一份量</h3>
            <p>${item.nutrition.size}公克</p>
            <h3 class="fs-6 fw-bold pt-4 mb-1">熱量</h3>
            <p>${item.nutrition.calories}大卡</p>
            <h3 class="fs-6 fw-bold pt-4 mb-1">碳水化合物</h3>
            <p>${item.nutrition.carb}公克</p>
            <h3 class="fs-6 fw-bold pt-4 mb-1">蛋白質</h3>
            <p>${item.nutrition.protein}公克</p>
            <h3 class="fs-6 fw-bold pt-4 mb-1">脂肪</h3>
            <p>${item.nutrition.fat}公克</p>
        </div>
        <div class="col-lg-6 text-lg-center">
            <h2 class="bg-normal-brown fs-5 fw-normal py-2">加熱方式</h2>
            <h3 class="fs-6 fw-bold pt-5 mb-1">微波</h3>
            <p>${item.heat.microwave}</p>
            <h3 class="fs-6 fw-bold pt-4 mb-1">烤箱</h3>
            <p>${item.heat.oven}</p>
            <h3 class="fs-6 fw-bold pt-4 mb-1">電鍋</h3>
            <p>${item.heat.electricPot}</p>
            <h3 class="fs-6 fw-bold pt-4 mb-1">平底鍋</h3>
            <p>${item.heat.pan}</p>
        </div>
    </div>
    `

    mealDetail.innerHTML=str;
}

//取得商品資料
function apiGetMeal(){
    axios.get(`${_url}/products?id=${id}`)
    .then(function(res){
        renderData(res.data);

    })
    .catch(function(err){
        console.log(err);
    })

}

//初始
apiGetMeal()

//初始數量
let addQuantity=1;

mealDetail.addEventListener("change",function(e){
    if(e.target.getAttribute("data-js") == "addCartQuantity"){
        addQuantity = Number(e.target.value);
    }
})

//加入購物車監聽
mealDetail.addEventListener("click",function(e){
    if(e.target.textContent == "加入購物車"){
        apiAddCart(id,addQuantity);
    }

})

//加入購物車
function apiAddCart(productId,productQuantity){

    let userId = localStorage.getItem("userId");
  
    //登入會員判斷
    if(!userId){
  
      //sweetalert2
      Toast.fire({
        icon: "warning",
        title: "請先登入會員"
      }).then((result) =>{
          window.location.href ="login.html";
      })
  
    }else{
  
      let productImage;
      let productSeries;
      let productStorage;
      let productName;
      let productPrice;
      let total;
  
      //取得商品資訊一起加入購物車
      axios.get(`${_url}/products/${productId}`)
      .then(function(res){
        productImage = res.data.image;
        productSeries = res.data.series;
        productStorage = res.data.storage;
        productName = res.data.name;
        productPrice = res.data.price;
  
            //取得會員狀態
            axios.get(`${_url}/users/${userId}`)
            .then(function(res){
  
              let cartItemuuid = crypto.randomUUID();
  
              //判斷使用者是否已有使用購物車
              if(res.data.cartExist){
  
                //購物車已有商品
                //先取得購物車資訊
                //就修改(推入) cart內容
                axios.get(`${_url}/carts/${userId}`)
                .then(function(res){
                  
                  let cart = res.data.cart;
                  let newCart=[];
                  total = res.data.total;
                  let alreadyExist = false;
  
                  //判斷購物車內是否有此重複商品
                  cart.forEach(function(item){
                    if(item.productId == productId){
                      item.quantity+=productQuantity;
                      alreadyExist = true;
                    }
                  })
  
                  if(alreadyExist){
                    newCart = cart;
                  }else{
                    cart.push({
                      "productId": productId,
                      "cartItemId": cartItemuuid,
                      "productImage":productImage,
                      "productSeries":productSeries,
                      "productStorage":productStorage,
                      "productName":productName,
                      "productPrice":productPrice,
                      "quantity": productQuantity
                    })
                    newCart = cart;
                  }
  
                  
                  axios.patch(`${_url}/carts/${userId}`,{
                    "cart":newCart,
                    "total":total + productPrice*productQuantity
                  })
                  .then(function(res){
                    //sweetalert2
                    Toast.fire({
                      icon: "success",
                      title: "已加入購物車"
                    }).then((result) =>{
                      location.reload();
                    })
                    
                  })
                  .catch(function(err){
                    console.log(err);
                  })
  
                  
  
                })
                .catch(function(err){
                  console.log(err);
                })
  
              }else{
                //購物車尚未有商品
                axios.post(`${_url}/carts`,{
                  "id":userId,
                  "cart": [
                    {
                      "productId": productId,
                      "cartItemId": cartItemuuid,
                      "productImage":productImage,
                      "productSeries":productSeries,
                      "productStorage":productStorage,
                      "productName":productName,
                      "productPrice":productPrice,
                      "quantity": productQuantity
                    }
                  ],
                  "total":productPrice*productQuantity + 80
                })
                .then(function(res){
                    //sweetalert2
                    Toast.fire({
                      icon: "success",
                      title: "已加入購物車"
                    }).then((result) =>{
                      location.reload();
                    })
                })
                .catch(function(err){
                  console.log(err);
                })
              }
              
              //新增入購物車成功，有物品在購物車的話，會員狀態會改為true
              axios.patch(`${_url}/users/${userId}`,{
                "cartExist":true
              })
  
                
            })
            .catch(function(err){
              console.log(err);
            })
  
      })
      .catch(function(err){
        console.log(err);
      })
  
    }
  }