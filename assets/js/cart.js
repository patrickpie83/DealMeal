
//頁面判斷
const cartFirstStep=document.querySelector(".cartFirstStep");
//購物車內容
const clearCartBtn=document.querySelector(".clearCartBtn");
const cartItemsContent=document.querySelector(".cartItemsContent");
const cartTotal=document.querySelector(".cartTotal");
//優惠折扣碼
const couponInput=document.querySelector(".couponInput");
const useCouponBtn=document.querySelector(".useCouponBtn");
const couponDiscount=document.querySelector(".couponDiscount");
//下一步
const cartNextBtn=document.querySelector(".cartNextBtn");

let userId = localStorage.getItem("userId");
const _url="https://dealmealserver.onrender.com";
// const _url="http://localhost:3000";

//sweetalert2 timer=800
const Toast = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 1200,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

//初始
init();

function init(){

    //購物車內容
    axios.get(`${_url}/users/${userId}`)
    .then(function(res){
        //判斷是否已有使用購物車
        if(!res.data.cartExist){
            cartFirstStep.innerHTML=`
            <div class="col-10">
                <p class="my-7 text-dark-brown" align="center">目前購物車內無商品</p>
                <a href="products.html" type="button" class="d-block mx-auto py-3 btn btn-primary text-light-brown w-50 rounded-0">前往挑選商品</a>
            </div>
            `
        }else{
            // 初始優惠碼＆初始total計算&渲染購物車
            axios.patch(`${_url}/carts/${userId}`,{
                "coupon":"",
                "couponDiscount":""
            })
            .then(function(res){
                couponInput.value="";
                apiCalculateTotal(res.data);
            })
            .catch(function(err){
                console.log(err);
            })
        }
    })
    .catch(function(err){
        console.log(err);
    })

}

//購物車內容
function renderCart(data){
    let str="";

    data.cart.forEach(function(item){
        
        str +=`
        <div class="row py-4 justify-content-center border border-top-0 border-dark-brown">
            <div class="col-md-5 d-flex align-items-center">
            <div class="w-50">
                <div class="ratio ratio-1x1">
                <img src="${item.productImage}" alt="${item.productName}">
                </div>
            </div>
            <div class="w-50 text-center">
                <p class="fs-7 text-dark-brown">${item.productSeries}</p>
                <p class="my-2">${item.productName}</p>
                <p class="fs-7 text-dark-brown">即時庫存： ${item.productStorage} 份</p>
            </div>
            </div>

            <div class="col-md-2 my-auto text-end text-md-center">
            <p>${item.productPrice}元</p>
            </div>

            <div class="col-7 col-md-2 my-auto">
                <input data-js="quantityInput" data-cartItemId="${item.cartItemId}" class="w-75 " type="number" value="${item.quantity}" min=1 max=${item.productStorage} >
                <span> 份</span>
            </div>
            <div class="col-5 col-md-2 my-auto text-end text-md-center">
                <p class="subTotal">共 ${item.productPrice * item.quantity} 元</p>
            </div>
            <div class="col-md-1 mt-3  my-md-auto text-end text-md-center">
                <a href="" >
                    <img data-js="deleteItem"  data-cartItemId="${item.cartItemId}" width="16" src="https://github.com/patrickpie83/DealMeal/blob/main/assets/images/icon_trash.png?raw=true" alt="icon_trash">
                </a>
                
            </div>
        </div>
        `
    })

    cartItemsContent.innerHTML = str;
    cartTotal.textContent = `${data.total}元`;

}

//購物車商品調整，金額變動監聽
cartItemsContent.addEventListener("change",function(e){
    if(e.target.getAttribute("data-js") == "quantityInput"){

        apiModifyCart( e.target.getAttribute("data-cartItemId"),  Number(e.target.value) )
    }
})

//修改購物車數量
function apiModifyCart(cartItemId,quantity){
    axios.get(`${_url}/carts/${userId}`)
    .then(function(res){
        let ary=res.data.cart;
        
        ary.forEach(function(item){
            if(item.cartItemId == cartItemId){
                item.quantity = quantity;
            }
        })

        axios.patch(`${_url}/carts/${userId}`,{
            "cart":ary
        })
        .then(function(res){
            //重新計算total&渲染
            apiCalculateTotal(res.data)
        })
        .catch(function(err){
            console.log(err);
        })
    })
    .catch(function(err){
        console.log(err);
    })
}

//刪除購物車指定品項監聽
cartItemsContent.addEventListener("click",function(e){
    e.preventDefault();
    if(e.target.getAttribute("data-js") == "deleteItem"){
        apiDeleteCartItem( e.target.getAttribute("data-cartItemId") );
    }
})

//刪除購物車指定品項
function apiDeleteCartItem(cartItemId){
    axios.get(`${_url}/carts/${userId}`)
    .then(function(res){
        let ary=res.data.cart;
        
        for(let i=0 ; i < ary.length ; i++){
            if( ary[i].cartItemId == cartItemId){
                 ary.splice(i,1);
            }
        }

        //若購物車已被清空，則重新顯示
        if(ary.length == 0){
            apiClearCart();
        }else{
            axios.patch(`${_url}/carts/${userId}`,{
                "cart":ary
            })
            .then(function(res){
                //重新計算total&渲染
                apiCalculateTotal(res.data)
            })
            .catch(function(err){
                console.log(err);
            })
        }

    })
    .catch(function(err){
        console.log(err);
    })
}

//清空購物車監聽
clearCartBtn.addEventListener("click",function(e){
    e.preventDefault();
    apiClearCart();
})

//清空購物車
function apiClearCart(){

    axios.patch(`${_url}/users/${userId}`,{
        "cartExist":false
    })
    .then(function(res){

        axios.delete(`${_url}/carts/${userId}`)
        .then(function(res){

            //sweetalert2
            Toast.fire({
                icon: "info",
                title: "購物車已清空"
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
    
}

//初始合計計算
function initTotal(){
    //重新計算total
    // 初始優惠碼＆初始total計算&渲染購物車
    axios.patch(`${_url}/carts/${userId}`,{
        "coupon":"",
        "couponDiscount":""
    })
    .then(function(res){
        apiCalculateTotal(res.data);
    })
    .catch(function(err){
        console.log(err);
    })
}

//優惠折扣碼監聽
useCouponBtn.addEventListener("click",function(){

    axios.get(`${_url}/coupons`)
    .then(function(res){
        
        //確認輸入的是否為有效優惠碼資訊
        let getCoupon={};
        res.data.forEach(function(item){
            if(item.id == couponInput.value && item.state == "發佈中"){
                getCoupon = item ;
            }
        })

        //先確認優惠碼是否存在
        if(Object.keys(getCoupon).length == 0){
            couponDiscount.innerHTML=`
            <span class="text-danger">無效的優惠碼，請重新確認</span>`;
            initTotal();

        }else if( getCoupon.usage =="僅一筆" ){
            //再確認若為一次性使用，需確認會員是否已使用過該優惠碼
            axios.get(`${_url}/users/${userId}`)
            .then(function(res){
                let usedCouponAry = res.data.usedCoupon;
                if(usedCouponAry.indexOf(`${getCoupon.id}`) >=0){
                    //若有使用過
                    couponDiscount.innerHTML=`
                    <span class="text-danger">此優惠碼已使用過不得再使用</span>`;
                    initTotal();
                }else{
                    //無使用過
                    couponDiscount.innerHTML=`
                    套用優惠碼：
                    <span class="text-danger">${getCoupon.discount}</span>
                    `;
                
                    //有效優惠碼才會寫入優惠碼資料，並計算total
                    axios.patch(`${_url}/carts/${userId}`,{
                        "coupon":couponInput.value,
                        "couponDiscount":getCoupon.discount
                    })
                    .then(function(res){
                        apiCalculateTotal(res.data)
                    })
                    .catch(function(err){
                        console.log(err);
                    })
                }
            })
            .catch(function(err){
                console.log(err);
            })

        }else{
            couponDiscount.innerHTML=`
            套用優惠碼：
            <span class="text-danger">${getCoupon.discount}</span>
            `;
        
            //有效優惠碼才會寫入優惠碼資料，並計算total
            axios.patch(`${_url}/carts/${userId}`,{
                "coupon":couponInput.value,
                "couponDiscount":getCoupon.discount
            })
            .then(function(res){
                apiCalculateTotal(res.data)
            })
            .catch(function(err){
                console.log(err);
            })
        }

    })
    .catch(function(err){
        console.log(err);
    })
})

//計算cart total並寫入
function apiCalculateTotal(data){
    //data為整個cart資訊

    let calculateTotal=0;
    let deliverFee = 80;

    data.cart.forEach(function(item){
        calculateTotal += item.productPrice * item.quantity ;
    })

    if(!data.coupon){

        axios.patch(`${_url}/carts/${userId}`,{
            "total":calculateTotal + deliverFee
        })
        .then(function(res){
            renderCart(res.data)
        })
        .catch(function(err){
            console.log(err);
        })

    }else{
        axios.get(`${_url}/coupons/${data.coupon}`)
        .then(function(res){
            //res為coupon資訊

            if( res.data.discount == "整筆折500元" ){
                calculateTotal -= 500;
                if(calculateTotal<0){
                    calculateTotal = 0;
                }
            }else if( res.data.discount == "整筆折300元" ){
                calculateTotal -= 300;
                if(calculateTotal<0){
                    calculateTotal = 0;
                }
            }else if( res.data.discount == "整筆折100元" ){
                calculateTotal -= 100;
                if(calculateTotal<0){
                    calculateTotal = 0;
                }
            }else if( res.data.discount == "整筆訂單8折" ){
                calculateTotal = Math.floor(calculateTotal*0.8);
            }else if( res.data.discount == "整筆訂單85折" ){
                calculateTotal = Math.floor(calculateTotal*0.85);
            }else if( res.data.discount == "整筆訂單9折" ){
                calculateTotal = Math.floor(calculateTotal*0.9);
            }else if( res.data.discount == "整筆訂單95折" ){
                calculateTotal = Math.floor(calculateTotal*0.95);
            }

            axios.patch(`${_url}/carts/${userId}`,{
                "total":calculateTotal + deliverFee
            })
            .then(function(res){
                renderCart(res.data)
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

//下一步
cartNextBtn.addEventListener("click",function(e){
    e.preventDefault();
    
    axios.get(`${_url}/carts/${userId}`)
    .then(function(res){
        //確保購買庫存不大於即時庫存
        let errorQuantity = false;
        res.data.cart.forEach(function(item){
            if(item.quantity >item.productStorage){
                errorQuantity = errorQuantity || true ;
            }
        })

        if(errorQuantity){
            //sweetalert2
            Toast.fire({
                icon: "error",
                title: "購買數量 不可大於 即時庫存"
              })
        }else{
            //先清空配送資訊
            axios.patch(`${_url}/carts/${userId}`,{
                "deliverInfo":{}
            })
            .then(function(res){
                window.location.href ="deliver.html";
            })
            .catch(function(err){
                console.log(err);
            })
        }
    })
    .catch(function(err){
        console.log(err);
    })

})