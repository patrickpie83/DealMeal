//產品列表頁面
const productsList=document.querySelector(".productsList");
//分頁
const pagination=document.querySelector(".pagination");

// const _url="https://dealmealserver.onrender.com";
const _url="http://localhost:3000";

//sweetalert2 timer=1000
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

// 渲染內容
function renderProducts(data){
  let str="";

  data.forEach(function(item){
      //商品庫存判斷

      //完售時變透明
      let filterStr="";
      //無加入購物車按鈕
      let displayNoneStr="";
      //庫存敘述
      let storageStr="";
      if( item.storage <= 0 || item.state == "完售中"){
        storageStr ="完售中";
        filterStr = "soldOutFilter";
        displayNoneStr = "d-none";
      }else{
        storageStr =`即時庫存：${item.storage}份`;
      }


      
      str+=`
      <div class="col-6 mb-5 mb-lg-7 ${filterStr} ">
        <div class="card rounded-0 border-0">
          <div class="position-relative">
            <div class="ratio ratio-1x1">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <button class="${displayNoneStr} cardBtn py-4" data-js="addCartBtn" data-productId="${item.id}" >加入購物車</button>
          </div>
          <div class="mt-1 mt-lg-2 p-2 p-lg-3 border border-primary">
            <div class="d-lg-flex justify-content-lg-between">
              <a class="stretched-link text-decoration-none" href="meal.html?id=${item.id}"><h3 class="productName">${item.name}</h3></a>
              <p class="text-end mt-2 mt-lg-0 fs-7 text-dark-brown">${storageStr}</p>
            </div>
            <div class="mt-3 mt-lg-4 d-lg-flex justify-content-lg-between align-items-lg-end">
              <div class="productNutrition">
                <p>熱量：${item.nutrition.calories}大卡
                <br>碳水化合物：${item.nutrition.carb}公克
                <br>蛋白質：${item.nutrition.protein}公克
                <br>脂肪：${item.nutrition.fat}公克 
                </p>
              </div>
              <p class="productPrice fw-bold mt-3 mt-lg-0">售價：${item.price}元</p>
              
            </div>
          </div>
        </div>
        <button class="${displayNoneStr} cartIcon text-center d-lg-none py-1 w-100 border-0" data-js="addCartBtn" data-productId="${item.id}" >
          <img data-js="addCartBtn" src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_cart.png?raw=true" alt="icon_cart" style="height: 16px;" data-js="addCartBtn" data-productId="${item.id}">
        </button>
      </div>
      `
  })

  productsList.innerHTML=str;
}

// 初始
let productData=[];

function init(){
    axios.get(`${_url}/products`)
    .then(function(res){

      let len=res.data.length;
      //設置頁數
      for(let i=0 ; i<len ; i++){
        let item = res.data[i];
        
        let page = Math.floor(i / 4) +1 ;
        item.page = page ;
        productData.push(item);
      }

      renderProducts(res.data);

    })
    .catch(function(err){
        console.log(err);
    })
}

//初始
init();

//加入購物車
function apiAddCart(productId){

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
    let productName;
    let productPrice;
    let total;

    //取得商品資訊一起加入購物車
    axios.get(`${_url}/products/${productId}`)
    .then(function(res){
      productImage = res.data.image;
      productSeries = res.data.series;
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
                    item.quantity+=1;
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
                    "productName":productName,
                    "productPrice":productPrice,
                    "quantity": 1
                  })
                  newCart = cart;
                }

                
                axios.patch(`${_url}/carts/${userId}`,{
                  "cart":newCart,
                  "total":total + productPrice
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
                    "productName":productName,
                    "productPrice":productPrice,
                    "quantity": 1
                  }
                ],
                "total":productPrice + 80
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

//商品列表頁的 加入購物車按鍵
productsList.addEventListener("click",function(e){

  if(e.target.getAttribute("data-js") !== "addCartBtn"){
    return;
  }else{
    let productId = e.target.getAttribute("data-productId");
    apiAddCart(productId)
  }
})


//分頁按鈕
pagination.addEventListener("click",function(e){
  e.preventDefault();
  let choosePage = e.target.getAttribute("data-page");
  let renderData = [];
  productData.forEach(function(item){
    if(item.page == choosePage){
      console.log(item)
    }
  })
})