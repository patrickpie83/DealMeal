//商品內容
const paymentItemsContent=document.querySelector(".paymentItemsContent");
//優惠碼
const couponContent=document.querySelector(".couponContent");
//配送資訊
const deliverNameContent=document.querySelector(".deliverNameContent");
const deliverEmailContent=document.querySelector(".deliverEmailContent");
const deliverTelContent=document.querySelector(".deliverTelContent");
const deliverAddressContent=document.querySelector(".deliverAddressContent");
const totalPriceContent=document.querySelector(".totalPriceContent");
//支付別
const linePay=document.querySelector("#linePay");
const jkoPay=document.querySelector("#jkoPay");
const applePay=document.querySelector("#applePay");
//付款按鈕
const confrimBtn=document.querySelector(".confrimBtn");
//確認按鈕
const sendOrderBtn=document.querySelector(".sendOrderBtn");

let userId = localStorage.getItem("userId");
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
let completeInformation;

function init(){
    axios.get(`${_url}/carts/${userId}`)
    .then(function(res){
        completeInformation = res.data;
        renderPayment(res.data);
    })
    .catch(function(err){
        console.log(err);
    })
}

//訂單內容渲染
function renderPayment(data){
    //商品
    let paymentItemsStr="";
    data.cart.forEach(function(item){
        paymentItemsStr +=`
        <div class="row py-4 justify-content-center border border-top-0 border-dark-brown">
            <div class="col-md-5 d-flex align-items-center">
            <div class="w-50">
                <div class=" ratio ratio-1x1">
                <img src="${item.productImage}" alt="${item.productName}">
                </div>
            </div>
            <div class="w-50 text-center">
                <p>${item.productName}</p>
            </div>
            </div>

            <div class="col-md-2 my-auto text-end text-md-center">
            <p>${item.productPrice}元</p>
            </div>

            <div class="col-7 col-md-2 my-auto">
            <p class="text-center">${item.quantity}份</p>
            </div>
            <div class="col-5 col-md-3 my-auto text-end text-md-center">
            <p>共 ${item.productPrice * item.quantity}元</p>
            </div>
        </div>
        `
    })
    paymentItemsContent.innerHTML = paymentItemsStr;

    //優惠碼
    let couponContentStr="";
    if(data.coupon){
        axios.get(`${_url}/coupons/${data.coupon}`)
        .then(function(res){

            couponContentStr=`
            <p>${data.coupon}</p>
            <span>套用優惠碼：${res.data.discount}</span>
            `
            couponContent.innerHTML = couponContentStr;

        })
        .catch(function(err){
            console.log(err);
        })
    }else{
        couponContentStr=`
        <p>無</p>
        `
        couponContent.innerHTML = couponContentStr;
    }
    
    //配送資訊
    deliverNameContent.textContent = `${data.deliverInfo.name}`;
    deliverEmailContent.textContent = `${data.deliverInfo.email}`;
    deliverTelContent.textContent = `${data.deliverInfo.tel}`;
    deliverAddressContent.textContent = `${data.deliverInfo.address}`;
    totalPriceContent.textContent = `${data.total}元`;
}

let choosePayment;

linePay.addEventListener("click",function(e){
    choosePayment = e.target.getAttribute("data-js-payment");
    confrimBtn.setAttribute("data-bs-target","#confirmOrderModal")
    
})
jkoPay.addEventListener("click",function(e){
    choosePayment = e.target.getAttribute("data-js-payment");
    confrimBtn.setAttribute("data-bs-target","#confirmOrderModal")
})
applePay.addEventListener("click",function(e){
    choosePayment = e.target.getAttribute("data-js-payment");
    confrimBtn.setAttribute("data-bs-target","#confirmOrderModal")
})

sendOrderBtn.addEventListener("click",function(e){

    let orderuuid = crypto.randomUUID();
    let memberId = completeInformation.id;

    // 創建一個新的 Date 物件，其中包含當前的日期和時間
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth()+1; // 月份是從 0 開始的，所以要加 1
    let day = currentDate.getDate();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    let orderDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    completeInformation.id = orderuuid;
    completeInformation.memberId = memberId;
    completeInformation.payment = choosePayment;
    completeInformation.orderDate = orderDate;
    completeInformation.status = "尚未處理";

    //送出訂單資訊
    axios.post(`${_url}/orders`,completeInformation)
    .then(function(res){

        if(completeInformation.coupon){
            //計算優惠碼相關資訊
            apiCountCoupon(completeInformation.coupon);
        }

        //sweetalert2
        Toast.fire({
            icon: "success",
            title: "已送出訂單"
        }).then((result) => {
            //送出訂單後清空購物車
            apiClearCart();
            //架上的商品扣除庫存
            apiTakeProductStorage(completeInformation.cart);
        });

    })
    .catch(function(err){
        console.log(err);
        //sweetalert2
        Toast.fire({
            icon: "error",
            title: "訂單送出失敗"
        });
    })

    //送出訂單後移到歷史訂單
    axios.get(`${_url}/users/${userId}`)
    .then(function(res){
        let historyOrderAry = res.data.historyOrder;
        let usedCouponAry = res.data.usedCoupon;
        historyOrderAry.push(completeInformation);
        usedCouponAry.push(completeInformation.coupon);

        axios.patch(`${_url}/users/${userId}`,{
            "historyOrder":historyOrderAry,
            "usedCoupon":usedCouponAry
        })
        .then(function(res){
        })
        .catch(function(err){
            console.log(err);
        })
    })
    .catch(function(err){
        console.log(err);
    })

    let saleMonth =`${year}-${month}`;
    let saleProducts = [];
    //將所購買的商品，資料挑出來
    completeInformation.cart.forEach(function(item){
        saleProducts.push({
            "productId": item.productId,
            "image": item.productImage,
            "series": item.productSeries,
            "name": item.productName,
            "price":item.productPrice,
            "saleQuantity": item.quantity,
            "saleFigures": item.productPrice*item.quantity
        })
    })

    //送出訂單後傳送業績
    axios.post(`${_url}/sales`,{
        "monthId":saleMonth,
        "products":saleProducts
    })
    .then(function(res){

    })
    .catch(function(err){
        console.log(err);
    })
})

//計算優惠碼相關資訊
function apiCountCoupon(couponId){
    axios.get(`${_url}/coupons/${couponId}`)
    .then(function(res){

        //計算被使用量
        let newUseCount = res.data.useCount + 1;
        axios.patch(`${_url}/coupons/${couponId}`,{
            "useCount":newUseCount
        })

    })
    .catch(function(err){
        console.log(err);
    })
}

//送出訂單後清空購物車
function apiClearCart(){

    axios.delete(`${_url}/carts/${userId}`)
    .then(function(res){
        
        axios.patch(`${_url}/users/${userId}`,{
            "cartExist":false
        })
        .then(function(res){    
        })
        .catch(function(err){
            console.log(err);
        })

    })
    .catch(function(err){
        console.log(err)
    })
}

//架上的商品扣除庫存
function apiTakeProductStorage(data){

    data.forEach(function(item){

        //取得商品原庫存
        let originStorage;
        axios.get( `${_url}/products/${item.productId}`)
        .then(function(res){
            originStorage = res.data.storage;

            //修改商品庫存
            axios.patch( `${_url}/products/${item.productId}`,{
                "storage" : originStorage - item.quantity
            })
            .then(function(res){
                //若完售，則修改商品狀態
                if( originStorage - item.quantity <= 0){

                    axios.patch( `${_url}/products/${item.productId}`,{
                        "state" : "完售中"
                    })
                    .then(function(res){
        
                    })
                    .catch(function(err){
                        console.log(err);
                    })

                }
                window.location.href ="index.html";
            })
            .catch(function(err){
                console.log(err);
            })

        })
        .catch(function(err){
            console.log(err);
        })

    })

}