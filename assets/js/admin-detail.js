//商品內容
const detailContent=document.querySelector(".detailContent");
//刪除按鈕
const deleteBtn=document.querySelector(".deleteBtn");
//送出按鈕
const sendBtn=document.querySelector(".sendBtn");
//圖片
let imgInput;
let imgArea;
//系列
let productSeries;
//商品名稱
let originName;
let productName ;
let existNameText;
//單價
let productPrice;
//內容物
let productIngredient;
//營養標示
let productSize;
let productCalories;
let productCarb;
let productProtein;
let productFat;
//加熱方式
let microwave;
let oven;
let electricPot;
let pan;

//取出跳轉商品id，把當前網址切割，取[1]的值 (此id為string)
const id = location.href.split("=")[1];
const _url="https://dealmealserver.onrender.com";
// const _url="http://localhost:3000";

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

//初始
init();

function init(){
    //取得商品資料 
    axios.get(`${_url}/products/${id}`)
    .then(function(res){
        render(res.data);
    })
    .catch(function(err){
        console.log(err);
    })
}

//渲染內容
function render(data){
    let str="";
    let seriesStr="";

    if(data.series == "塑身系列"){
        seriesStr = `
        <option value="塑身系列" selected>塑身系列</option>
        <option value="增肌系列">增肌系列</option>
        <option value="早餐系列">早餐系列</option>
        `;
    }else if(data.series == "增肌系列"){
        seriesStr = `
        <option value="塑身系列">塑身系列</option>
        <option value="增肌系列" selected>增肌系列</option>
        <option value="早餐系列">早餐系列</option>
        `;
    }else if(data.series == "早餐系列"){
        seriesStr = `
        <option value="塑身系列">塑身系列</option>
        <option value="增肌系列">增肌系列</option>
        <option value="早餐系列" selected>早餐系列</option>
        `;
    }

    str=`
    <div class="col-6">
        <div class="d-flex flex-column px-7 py-5 border border-primary rounded-40 h-100">
            <span class="fs-4 mb-4">圖片</span>
            <span>預覽圖片</span>
            <div class="ratio ratio-1x1 w-100 mb-4 imgArea">
                <img src="${data.image}" alt="${data.name}">
            </div>
            <span>圖片網址</span>
            <div class="d-flex">
                <input class="imgInput" type="text" style="width: 65%;" value="${data.image}">
                <button type="button" class="btn btn-normal-brown ms-3" data-js="預覽圖片">預覽</button>
                <button type="button" class="btn btn-danger ms-3" data-js="移除圖片">移除</button>
            </div>
        </div>
    </div>


    <div class="col-6">
        <div class="px-7 py-5 mb-2 border border-primary rounded-40">
            <label class="fs-4 d-block mb-4" for="productSeries">商品系列</label>
            <select class="w-50" name="series" id="productSeries">
                ${seriesStr}
            </select>
        </div>
        <div class="px-7 py-5 mb-2 border border-primary rounded-40">
            <label class="fs-4 d-block mb-4" for="productName">商品名稱</label>
            <span class="fs-7">＊名稱字數限制為10字以內</span>
            <div class="d-flex">
                <input class="w-50" type="text" id="productName" value="${data.name}" maxlength="10">
                <button class="w-25 ms-4 btn btn-normal-brown rounded-pill text-primary" type="button" data-js="檢查名稱">檢查</button>
            </div>
            <span class="fs-7" id="existNameText"></span>
        </div>
        <div class="px-7 py-5 mb-2 border border-primary rounded-40">
            <label class="fs-4 d-block mb-4" for="productPrice">單價</label>
            <div class="d-flex align-items-end">
                <input class="w-50" type="number" id="productPrice" value="${data.price}">
                <span>元</span>
            </div>
        </div>
        <div class="px-7 py-5 border border-primary rounded-40">
            <label class="fs-4 d-block mb-4" for="productStock">商品庫存</label>
            <input class="w-50 d-block" type="number" id="productStock" value="${data.storage}" disabled>
            <span class="text-danger fs-7">＊庫存僅能於初始登錄時或總覽頁進行增加</span>
        </div>
    </div>

    <div class="col-12">
        <div class="px-7 py-5 border border-primary rounded-40">
            <label class="fs-4 d-block mb-4" for="productIngredient">內容物</label>
            <textarea class="w-100" name="productIngredient" id="productIngredient" >${data.ingredient}</textarea>
        </div>
    </div>

    <div class="col-6">
        <div class="d-flex flex-column px-7 py-5 border border-primary rounded-40 h-100">
            <span class="fs-4 mb-4">營養標示</span>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="productSize">每一份量</label>
                <div class="d-flex align-items-end">
                    <input class="w-50" type="number" id="productSize" value="${data.nutrition.size}">
                    <span>公克</span>
                </div>
            </div>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="productCalories">熱量</label>
                <div class="d-flex align-items-end">
                    <input class="w-50" type="number" id="productCalories" value="${data.nutrition.calories}">
                    <span>大卡</span>
                </div>
            </div>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="productCarb">碳水化合物</label>
                <div class="d-flex align-items-end">
                    <input class="w-50" type="number" id="productCarb" value="${data.nutrition.carb}">
                    <span>公克</span>
                </div>
            </div>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="productProtein">蛋白質</label>
                <div class="d-flex align-items-end">
                    <input class="w-50" type="number" id="productProtein" value="${data.nutrition.protein}">
                    <span>公克</span>
                </div>
            </div>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="productFat">脂肪</label>
                <div class="d-flex align-items-end">
                    <input class="w-50" type="number" id="productFat" value="${data.nutrition.fat}">
                    <span>公克</span>
                </div>
            </div>
        </div>
    </div>

    <div class="col-6">
        <div class="d-flex flex-column px-7 py-5 border border-primary rounded-40 h-100">
            <span class="fs-4 mb-4">加熱方式</span>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="microwave">微波</label>
                <input class="w-100" type="text" id="microwave" value="${data.heat.microwave}">
            </div>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="oven">烤箱</label>
                <input class="w-100" type="text" id="oven" value="${data.heat.oven}">
            </div>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="electricPot">電鍋</label>
                <input class="w-100" type="text" id="electricPot" value="${data.heat.electricPot}">
            </div>
            <div class="mb-5">
                <label class="fs-4 d-block mb-2 fw-bold" for="pan">平底鍋</label>
                <input class="w-100" type="text" id="pan" value="${data.heat.pan}">
            </div>
        </div>
    </div>
    `;

    detailContent.innerHTML = str;

    imgArea=document.querySelector(".imgArea");
    imgInput=document.querySelector(".imgInput");
    productName=document.querySelector("#productName");
    originName = data.name;
    existNameText=document.querySelector("#existNameText");

    //直接取值即可
    productSeries=document.querySelector("#productSeries");
    productPrice=document.querySelector("#productPrice");
    productIngredient=document.querySelector("#productIngredient");
    productSize=document.querySelector("#productSize");
    productCalories=document.querySelector("#productCalories");
    productCarb=document.querySelector("#productCarb");
    productProtein=document.querySelector("#productProtein");
    productFat=document.querySelector("#productFat");
    microwave=document.querySelector("#microwave");
    oven=document.querySelector("#oven");
    electricPot=document.querySelector("#electricPot");
    pan=document.querySelector("#pan");

}

//刪除此品項監聽
deleteBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    Swal.fire({
        title: `確定要刪除登錄：<br>${originName}？`,
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "確認",
        denyButtonText: "取消"
      }).then((result) => {
        if (result.isConfirmed) {
            apiDeleteProduct();
        } 
      });
})

function apiDeleteProduct(){
    //及刪除購物車內仍含有此品項的
    axios.get( `${_url}/carts`)
    .then(function(res){
        //item為每一筆購物車完整資料
        res.data.forEach((item)=>{

            let ary = item.cart;
            for(let i=0 ; i < ary.length ; i++){
                if( ary[i].productId == id){
                     ary.splice(i,1);
                }
            }

            let userId = item.id;
            axios.patch(`${_url}/carts/${userId}`,{
                "cart":ary
            })
            .then(function(res){
            })
            .catch(function(err){
                console.log(err);
            })
        })
    })
    .catch(function(err){
        console.log(err);
    })

        //刪除此商品的登錄
        axios.delete( `${_url}/products/${id}`)
        .then(function(res){
            Toast.fire({
                icon: "success",
                title: "刪除成功"
            }).then((result) =>{
                window.location.href ="admin-products.html";
                //跳轉至後台商品頁
            })

        })
        .catch(function(err){
            console.log(err);
        })
}

let checkNameOK = false;
let checkImgOK = false;
//圖片預覽監聽
detailContent.addEventListener("click",function(e){
    e.preventDefault();
    if(e.target.getAttribute("data-js") != "預覽圖片"){
       return;
    }else{
        imgArea.innerHTML=`
        <img class="" src="${imgInput.value}" alt="">
        `;
        checkImgOK = true ;
    }
})

//圖片輸入移除監聽
detailContent.addEventListener("click",function(e){
    e.preventDefault();
    if(e.target.getAttribute("data-js") != "移除圖片"){
       return;
    }else{
        imgArea.innerHTML=`
        <p class="text-danger">目前是空的</p>
        `;
        imgInput.value="";
        checkImgOK = false ;
    }
})

//商品名稱輸入框檢查
detailContent.addEventListener("click",function(e){
    e.preventDefault();

    if(e.target.getAttribute("data-js") != "檢查名稱"){
        return;
     }else{
        if(!productName.value){
            //sweetalert2
            Toast.fire({
                icon: "warning",
                title: "商品名稱不可為空"
            });
        }
        checkName(productName.value);
     }
})

//商品名稱檢查
function checkName(newName){

    //確認名稱是否與已存在資料有重複
    axios.get(`${_url}/products`)
    .then(function(res){

        if(!newName){
            existNameText.classList.remove("text-success");
            existNameText.classList.add("text-danger");
            existNameText.textContent = "名稱不可為空";
            checkNameOK = false ;
        }else{

            let existName = false;
            res.data.forEach(function(item){
                if(newName == item.name  && newName != originName){
                    //紀錄名稱已存在 (不含原名)
                    existName = existName || true;
                    return;
                }else{
                    existName = existName || false;
                }
            })
    
            if(existName){
                existNameText.classList.remove("text-success");
                existNameText.classList.add("text-danger");
                existNameText.textContent = "此名稱已存在";
                checkNameOK = false ;
            }else{
                existNameText.classList.remove("text-danger");
                existNameText.classList.add("text-success");
                existNameText.textContent = "此名稱可以使用";
                checkNameOK = true ;
            }
        }

    })
    .catch(function(err){
        console.log(err);
    })
}

//送出編輯商品
function apiEditProduct(){

    axios.patch( `${_url}/products/${id}` , {
        "image": imgInput.value,
        "series": productSeries.value,
        "name": productName.value,
        "price": Number(productPrice.value),
        "ingredient":productIngredient.value,
        "nutrition": {
            "size": Number(productSize.value),
            "calories": Number(productCalories.value),
            "carb": Number(productCarb.value),
            "protein": Number(productProtein.value),
            "fat": Number(productFat.value)
        },
        "heat": {
            "microwave": microwave.value,
            "oven": oven.value,
            "electricPot": electricPot.value,
            "pan": pan.value
        }
        
    })
    .then(function(res){
        Toast.fire({
            icon: "success",
            title: "成功送出"
        }).then((result) =>{
            window.location.href ="admin-products.html";
            //跳轉至後台商品頁
        })
        
    })
    .catch(function(err){
        console.log(err);
    })
}

//送出按鈕監聽
sendBtn.addEventListener("click",function(e){
    e.preventDefault();

    checkName(productName.value);

    // 如果已上傳圖片，但又改別的圖片網址，那就沒辦法了

    if( !imgInput.value ){
        //檢查圖片網址欄位空白
        //sweetalert2
        Toast.fire({
            icon: "warning",
            title: "圖片網址不可為空"
        });

    }else if( !checkImgOK ){
        //檢查預覽過圖片
        Toast.fire({
            icon: "warning",
            title: "請先預覽過圖片"
        });

    }else if( !productName.value ){
        //檢查商品名稱欄位
        Toast.fire({
            icon: "warning",
            title: "商品名稱不可為空"
        });
    }else if( !checkNameOK ){
        //檢查是否檢查過商品名稱
        Toast.fire({
            icon: "warning",
            title: "請檢查商品名稱"
        });
    }else if( !productPrice.value ){
        //單價
        Toast.fire({
            icon: "warning",
            title: "單價不可為空"
        });
    }else if( !productIngredient.value ){
        //內容物
        Toast.fire({
            icon: "warning",
            title: "內容物不可為空"
        });
    }else if( !(productSize.value && productCalories.value && productCarb.value && productProtein.value && productFat.value) ){
        //營養標示
        Toast.fire({
            icon: "warning",
            title: "營養標示不可為空"
        });
    }else if( !(microwave.value && oven.value && electricPot.value && pan.value )){
        //加熱方式
        Toast.fire({
            icon: "warning",
            title: "加熱方式不可為空"
        });
    }else{

        Swal.fire({
            title: "確認送出？",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "確認",
            denyButtonText: "取消"
          }).then((result) => {
            if (result.isConfirmed) {
                apiEditProduct();
            } 
          });
    }
})



