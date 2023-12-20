const orderStatusTitle=document.querySelector(".orderStatusTitle");
const orderListContent=document.querySelector(".orderListContent");


//取得header點選狀態
let listStatus = location.href.split("=")[1];

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

if(listStatus == "notProcessedOrder"){
    listStatus = "尚未處理";
    orderStatusTitle.textContent = "尚未處理的訂單";
}else if(listStatus == "processingOrder"){
    listStatus = "揀貨中";
    orderStatusTitle.textContent = "揀貨中的訂單";
}else if(listStatus == "deliveringOrder"){
    listStatus = "出貨中";
    orderStatusTitle.textContent = "出貨中的訂單";
}else if(listStatus == "canceledOrder"){
    listStatus = "訂單取消";
    orderStatusTitle.textContent = "已取消的訂單";
}else if(listStatus == "completedOrder"){
    listStatus = "訂單完成";
    orderStatusTitle.textContent = "已完成的訂單";
}


init();

function init(){
    axios.get(`${_url}/orders`)
        .then(function(res){
            renderOrderList(res.data)
        })
        .catch(function(err){
            console.log(err);
        })
}

//取得對應資料渲染
function renderOrderList(data){
    let str="";

    data.forEach(function(item){
        
        //列出篩選的訂單
        if(item.status == listStatus){

            //訂單狀態
            let orderCheckInputStr="";
            if(item.status == "尚未處理"){
                orderCheckInputStr =`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="notProcessed-${item.id}" checked>
                    <label class="form-check-label" for="notProcessed-${item.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="processing-${item.id}">
                    <label class="form-check-label" for="processing-${item.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="delivering-${item.id}">
                    <label class="form-check-label" for="delivering-${item.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="orderCanceled-${item.id}">
                    <label class="form-check-label" for="orderCanceled-${item.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="orderCompleted-${item.id}">
                    <label class="form-check-label" for="orderCompleted-${item.id}">訂單完成</label>
                </div>
                `
            }else if(item.status == "揀貨中"){
                orderCheckInputStr =`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="notProcessed-${item.id}">
                    <label class="form-check-label" for="notProcessed-${item.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="processing-${item.id}" checked>
                    <label class="form-check-label" for="processing-${item.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="delivering-${item.id}">
                    <label class="form-check-label" for="delivering-${item.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="orderCanceled-${item.id}">
                    <label class="form-check-label" for="orderCanceled-${item.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="orderCompleted-${item.id}">
                    <label class="form-check-label" for="orderCompleted-${item.id}">訂單完成</label>
                </div>
                `
            }else if(item.status == "出貨中"){
                orderCheckInputStr =`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="notProcessed-${item.id}">
                    <label class="form-check-label" for="notProcessed-${item.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="processing-${item.id}">
                    <label class="form-check-label" for="processing-${item.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="delivering-${item.id}" checked>
                    <label class="form-check-label" for="delivering-${item.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="orderCanceled-${item.id}">
                    <label class="form-check-label" for="orderCanceled-${item.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="orderCompleted-${item.id}">
                    <label class="form-check-label" for="orderCompleted-${item.id}">訂單完成</label>
                </div>
                `
            }else if(item.status == "訂單取消"){
                orderCheckInputStr =`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="notProcessed-${item.id}">
                    <label class="form-check-label" for="notProcessed-${item.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="processing-${item.id}">
                    <label class="form-check-label" for="processing-${item.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="delivering-${item.id}">
                    <label class="form-check-label" for="delivering-${item.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="orderCanceled-${item.id}" checked>
                    <label class="form-check-label" for="orderCanceled-${item.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="orderCompleted-${item.id}">
                    <label class="form-check-label" for="orderCompleted-${item.id}">訂單完成</label>
                </div>
                `
            }else if(item.status == "訂單完成"){
                orderCheckInputStr =`
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="notProcessed-${item.id}">
                    <label class="form-check-label" for="notProcessed-${item.id}">尚未處理</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="processing-${item.id}">
                    <label class="form-check-label" for="processing-${item.id}">揀貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="delivering-${item.id}">
                    <label class="form-check-label" for="delivering-${item.id}">出貨中</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="orderCanceled-${item.id}">
                    <label class="form-check-label" for="orderCanceled-${item.id}">訂單取消</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="orderState-${item.id}" id="orderCompleted-${item.id}" checked>
                    <label class="form-check-label" for="orderCompleted-${item.id}">訂單完成</label>
                </div>
                `
            }

            //訂單中的商品資訊
            let productsAry = item.cart;
            let productsStr="";
            for(let i=0;i<productsAry.length;i++){
                //最後一筆資料結尾不會有頓號
                if(i == productsAry.length-1){
                    productsStr+=`${productsAry[i].productName}X${productsAry[i].quantity}`;
                }else{
                    productsStr+=`${productsAry[i].productName}X${productsAry[i].quantity}、`;
                }
            }

            //優惠碼
            let couponDiscountStr="";
            if(!item.couponDiscount){
                couponDiscountStr="無";
            }else{
                couponDiscountStr=`${item.couponDiscount}`;
            }

            str +=`
            <tr>
                <td>${item.orderDate}</td>
                <td>${item.id}</td>
                <td>${item.deliverInfo.name}</td>

                <td>
                ${orderCheckInputStr}
                </td>

                <td>
                  <a class="text-decoration-none" href="#" data-bs-toggle="collapse" data-bs-target="#orderNum-${item.id}">+</a>
                </td>
              </tr>
              <tr>
                <td colspan="5">
                  <div id="orderNum-${item.id}" class="collapse">
                    <p>${productsStr}</p>
                    <p>使用優惠代碼：${couponDiscountStr}</p>
                    <p>訂單總額：${item.total}元</p>
                    <p>付款方式：${item.payment}</p>
                    <p>訂購人電話：${item.deliverInfo.tel}</p>
                    <p>配送地址：${item.deliverInfo.address}</p>
                  </div>
                </td>
            </tr>
            
            `
        }
    })

    orderListContent.innerHTML = str;
    if(!str){
        orderListContent.innerHTML=`
        <tr>
            <td class="py-5" colspan="5" >目前無此狀態的訂單</td>
        </tr>
        `
    }
}