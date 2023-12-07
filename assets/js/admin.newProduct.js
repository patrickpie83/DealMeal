//圖片
const imgUpload=document.querySelector(".imgUpload");
const imgInput=document.querySelector(".imgInput");
const imgArea=document.querySelector(".imgArea");
const imgCancel=document.querySelector(".imgCancel");
//系列
const productSeries=document.querySelector("#productSeries");
//商品名稱
const checkNameBtn=document.querySelector(".checkNameBtn");
const productName=document.querySelector("#productName");
const existNameText=document.querySelector("#existNameText");
//單價
const productPrice=document.querySelector("#productPrice");
//庫存
const productStock=document.querySelector("#productStock");
//內容物
const productIngredient=document.querySelector("#productIngredient");
//營養標示
const productSize=document.querySelector("#productSize");
const productCalories=document.querySelector("#productCalories");
const productCarb=document.querySelector("#productCarb");
const productProtein=document.querySelector("#productProtein");
const productFat=document.querySelector("#productFat");
//加熱方式
const microwave=document.querySelector("#microwave");
const oven=document.querySelector("#oven");
const electricPot=document.querySelector("#electricPot");
const pan=document.querySelector("#pan");





//完成按鈕
const finishBtn=document.querySelector(".finishBtn");


const _url="https://dealmealserver.onrender.com";

let checkNameOK = false;
let checkImgOK = false;


//圖片上傳
imgUpload.addEventListener("click",function(e){
    e.preventDefault();
    imgArea.innerHTML=`
    <img class="" src="${imgInput.value}" alt="">
    `;
    checkImgOK = true ;
})

//圖片取消
imgCancel.addEventListener("click",function(e){
    e.preventDefault();
    imgArea.innerHTML=`
    <p class="text-danger">目前是空的</p>
    `;
    imgInput.value="";
    checkImgOK = false ;
})

//商品名稱輸入框檢查
checkNameBtn.addEventListener("click",function(e){
    e.preventDefault();
    if(!productName.value){
        alert("商品名稱不可為空");
    }
    checkName(productName.value);
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
                if(item.name == newName){
                    existName = existName || true;
                    
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


//登錄新商品
function apiCheckProductPages(){
    
    //先確認目前商品筆數
    axios.get(`${_url}/products`)
    .then(function(res){
        let page;
        let len=res.data.length;
        //每四筆商品會是一頁
        page = Math.floor( ( len - 1 ) / 4 ) + 1;
        apiNewProduct(page);
    })
    .catch(function(err){
        console.log(err);
    })

}

function apiNewProduct(page){
    let randomId = crypto.randomUUID();

    axios.post( `${_url}/products` , {
        "page":page,
        "id": randomId,
        "image": imgInput.value,
        "series": productSeries.value,
        "name": productName.value,
        "storage": Number(productStock.value) ,
        "price": Number(productPrice.value),
        "state": "完售中",
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
        console.log(res);
        //跳轉至後台商品頁
    })
    .catch(function(err){
        console.log(err);
    })
}



// 送出按鈕監聽
finishBtn.addEventListener("click",function(e){
    e.preventDefault();

    checkName(productName.value);

    // 如果已上傳圖片，但又改別的圖片網址，那就沒辦法了

    if( !imgInput.value ){
        //檢查圖片網址欄位空白
        alert("圖片網址不可為空");

    }else if( !checkImgOK ){
        //檢查預覽過圖片
        alert("請先預覽過圖片");

    }else if( productSeries.value=="請選擇" ){
        //檢查預覽過圖片
        alert("尚未選取商品系列");

    }else if( !productName.value ){
        //檢查商品名稱欄位
        alert("商品名稱不可為空");

    }else if( !checkNameOK ){
        //檢查是否檢查過商品名稱
        alert("請檢查商品名稱");

    }else if( !productPrice.value ){
        //單價
        alert("單價不可為空");

    }else if( !productStock.value ){
        //庫存
        alert("庫存不可為空");

    }else if( !productIngredient.value ){
        //內容物   
        alert("內容物不可為空");

    }else if( !(productSize.value && productCalories.value && productCarb.value && productProtein.value && productFat.value) ){
        //營養標示
        alert("營養標示不可為空");

    }else if( !(microwave.value && oven.value && electricPot.value && pan.value )){
        //加熱方式
        alert("加熱方式不可為空");

    }else{
        apiCheckProductPages();
        alert("成功送出");
    }
    

})
   
