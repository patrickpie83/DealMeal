//產品列表頁面
const productsList=document.querySelector(".productsList");
//系列篩選
const mobileSeriesFilter=document.querySelector(".mobileSeriesFilter");
const pcSeriesFilter=document.querySelector(".pcSeriesFilter");
//分頁
const pagination=document.querySelector(".pagination");

const _url="https://dealmealserver.onrender.com";
// const _url="http://localhost:3000";

//sweetalert2
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

//初始設定
let productsData=[];
let currentPageNum;
let currentSeries="全部商品";

//渲染側邊欄
function renderSeriesFilter( selectSeries ){
    
    let seriesOption = ["全部商品","塑身系列","增肌系列","早餐系列"];
    let mobileSeriesFilterStr = "";
    let pcSeriesFilterStr = "";

    seriesOption.forEach(function(item){
      if( item == selectSeries ){
        //若是選系列
        mobileSeriesFilterStr +=`
        <button type="button" class="fs-7 col-3 btn btn-primary rounded-0 text-light-brown active">${item}</button>
        `;
        pcSeriesFilterStr +=`
        <button type="button" class="btn btn-primary rounded-0 text-light-brown active">${item}</button>
        `;
      }else{
        mobileSeriesFilterStr +=`
        <button type="button" class="fs-7 col-3 btn btn-primary rounded-0 text-light-brown">${item}</button>
        `;
        pcSeriesFilterStr +=`
        <button type="button" class="btn btn-primary rounded-0 text-light-brown">${item}</button>
        `;
      }
    })

    mobileSeriesFilter.innerHTML = mobileSeriesFilterStr;

    pcSeriesFilter.innerHTML = pcSeriesFilterStr;

}

// 渲染內容 + 分頁按鈕
function renderProducts(data){
  
  //渲染資料內容
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
            <p class="fs-7 text-dark-brown">${item.series}</p>
            <div class="d-lg-flex justify-content-lg-between">
              <a class="stretched-link text-decoration-none" href="meal.html?id=${item.id}">
                <h3 class="productName">${item.name}</h3>
              </a>
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

  //確認總商品頁數並渲染分頁按鈕
  let paginationStr = "";
  let pageNumStr = "";
  //計算最後一頁頁碼
  let lastPageNum = Math.ceil( productsData.length / 4 );

  //最多顯示七個頁碼。若共七頁以下時
  if(lastPageNum <= 7){

    //依序產出頁碼樣式
    for(let i = 1 ; i <= lastPageNum ; i++ ){
      
      if( currentPageNum == i){
        //選中的頁碼樣式
        pageNumStr +=`
        <button class="btn btn-primary px-0 rounded-0 pageBtn" type="button" data-page="${i}">${i}</button>
        `
      }else{
        //非選中的頁碼樣式
        pageNumStr +=`
        <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${i}">${i}</button>
        `
      }
    }
    
    if(lastPageNum == 1){
      //若僅為一頁時，不會有前後頁切換按鈕
      paginationStr = pageNumStr;

    }else if(currentPageNum == 1){
      // 如果是在第一頁，不會有前頁切換按鈕
      paginationStr =`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous" disabled>
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_left.png?raw=true" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${pageNumStr}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_right.png?raw=true" alt="" data-page="next" style="width: 16px;">
      </button>
      `;

    }else if(currentPageNum == lastPageNum){
      // 如果是在最後一頁，不會有後頁切換按鈕
      paginationStr =`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_left.png?raw=true" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${pageNumStr}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next" disabled>
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_right.png?raw=true" alt="" data-page="next" style="width: 16px;">
      </button>
      `;

    }else{
      //有前後頁切換按鈕
      paginationStr =`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_left.png?raw=true" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${pageNumStr}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_right.png?raw=true" alt="" data-page="next" style="width: 16px;">
      </button>
      `;
    }

  }else{
    //八頁以上時

    if( currentPageNum <= 4){
      //若當前在1~4頁

      for(let i = 1 ; i <= 6; i++ ){
        if( currentPageNum == i){
          //選中的頁碼樣式
          pageNumStr +=`
          <button class="btn btn-primary px-0 rounded-0 pageBtn" type="button" data-page="${i}">${i}</button>
          `;
        }else{
          //非選中的頁碼樣式
          pageNumStr +=`
          <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${i}">${i}</button>
          `;
        }
      }
      //再加上最後一頁頁碼
      pageNumStr +=`
      <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${lastPageNum}">${lastPageNum}</button>
      `;


    }else if( currentPageNum >= lastPageNum-3){
      //若當前在最後四頁

      //先加上第一頁頁碼
      pageNumStr +=`
      <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="1">1</button>
      `;

      for(let i = lastPageNum-5 ; i <= lastPageNum; i++ ){
        if( currentPageNum == i){
          //選中的頁碼樣式
          pageNumStr +=`
          <button class="btn btn-primary px-0 rounded-0 pageBtn" type="button" data-page="${i}">${i}</button>
          `
        }else{
          //非選中的頁碼樣式
          pageNumStr +=`
          <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${i}">${i}</button>
          `
        }
      }

    }else if ( (currentPageNum > 4) && ( currentPageNum < (lastPageNum-3) )){
      //若當前在中間頁

      //先加上第一頁頁碼
      pageNumStr +=`
      <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="1">1</button>
      `;

      for(let i = currentPageNum-2 ; i <= currentPageNum+2 ; i++ ){
        if( currentPageNum == i){
          //選中的頁碼樣式
          pageNumStr +=`
          <button class="btn btn-primary px-0 rounded-0 pageBtn" type="button" data-page="${i}">${i}</button>
          `
        }else{
          //非選中的頁碼樣式
          pageNumStr +=`
          <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${i}">${i}</button>
          `
        }
      }

      //再加上最後一頁頁碼
      pageNumStr +=`
      <button class="btn btn-outline-primary px-0 rounded-0 pageBtn" type="button" data-page="${lastPageNum}">${lastPageNum}</button>
      `;

    }

    //加上前後頁切換
    if(currentPageNum == 1){
      // 如果是在第一頁，不會有前頁切換按鈕
      paginationStr =`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous" disabled>
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_left.png?raw=true" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${pageNumStr}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_right.png?raw=true" alt="" data-page="next" style="width: 16px;">
      </button>
      `;
    }else if(currentPageNum == lastPageNum){
      // 如果是在最後一頁，不會有後頁切換按鈕
      paginationStr =`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_left.png?raw=true" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${pageNumStr}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next" disabled>
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_right.png?raw=true" alt="" data-page="next" style="width: 16px;">
      </button>
      `;

    }else{
      //有前後頁切換按鈕
      paginationStr =`
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="previous">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_left.png?raw=true" alt="" data-page="previous" style="width: 16px;">
      </button>
      ${pageNumStr}
      <button class="btn btn-outline-light-brown px-0 rounded-0 pageBtn" type="button" data-page="next">
        <img src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_chevron_right.png?raw=true" alt="" data-page="next" style="width: 16px;">
      </button>
      `;
    }
  }


  pagination.innerHTML = paginationStr;
}

// 初始
function init(){
  axios.get(`${_url}/products`)
  .then(function(res){

    //先取得所有商品
    productsData = res.data;

    //再取得第一頁渲染
    axios.get(`${_url}/products?_page=1&_limit=4`)
    .then(function(res){
      currentPageNum=1;
      renderProducts(res.data);
      renderSeriesFilter(currentSeries);

    })
    .catch(function(err){
        console.log(err);
    })

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
                    "productStorage":productStorage,
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
                    "productStorage":productStorage,
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

// 分頁按鈕
pagination.addEventListener("click",function(e){
  e.preventDefault();
  let choosePage = e.target.getAttribute("data-page");

  if( choosePage == "previous" ){
    currentPageNum -= 1;
  }else if ( choosePage == "next" ){
    currentPageNum += 1;
  }else if(choosePage){
    currentPageNum = Number(choosePage);
  }

  if( currentSeries == "全部商品"){
    axios.get(`${_url}/products?_page=${currentPageNum}&_limit=4`)
    .then(function(res){
      renderProducts(res.data);
    })
    .catch(function(err){
        console.log(err);
    })
  }else{
    axios.get(`${_url}/products?series=${currentSeries}&_page=${currentPageNum}&_limit=4`)
    .then(function(res){
      renderProducts(res.data);
    })
    .catch(function(err){
        console.log(err);
    })
  }
})

// 篩選系列
mobileSeriesFilter.addEventListener("click",function(e){
  currentSeries = e.target.textContent;
  renderSeriesFilter(currentSeries);

  if( currentSeries == "全部商品"){
    init();
  }else{
    axios.get(`${_url}/products?series=${currentSeries}`)
    .then(function(res){
      //先取得系列總商品
      productsData = res.data;

      //再取第一頁渲染
      axios.get(`${_url}/products?series=${currentSeries}&_page=1&_limit=4`)
      .then(function(res){
        currentPageNum=1;
        //渲染頁面
        renderProducts(res.data);
        renderSeriesFilter(currentSeries);
      })
      .catch(function(err){
          console.log(err);
      })

    })
    .catch(function(err){
        console.log(err);
    })
  }
})

pcSeriesFilter.addEventListener("click",function(e){
  currentSeries = e.target.textContent;
  renderSeriesFilter(currentSeries);

  if( currentSeries == "全部商品"){
    init();
  }else{
    axios.get(`${_url}/products?series=${currentSeries}`)
    .then(function(res){
      //先取得系列總商品
      productsData = res.data;

      //再取第一頁渲染
      axios.get(`${_url}/products?series=${currentSeries}&_page=1&_limit=4`)
      .then(function(res){
        currentPageNum=1;
        //渲染頁面
        renderProducts(res.data);
        renderSeriesFilter(currentSeries);
      })
      .catch(function(err){
          console.log(err);
      })

    })
    .catch(function(err){
        console.log(err);
    })
  }
})

