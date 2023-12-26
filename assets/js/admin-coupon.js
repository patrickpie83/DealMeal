//新優惠碼
const releaseCouponForm=document.querySelector(".releaseCouponForm");
const releaseCouponDate=document.querySelector("#releaseCouponDate");
const releaseCouponId=document.querySelector("#releaseCouponId");
const releaseCouponName=document.querySelector("#releaseCouponName");
const releaseCouponUsage=document.querySelector("#releaseCouponUsage");
const releaseCouponDiscount=document.querySelector("#releaseCouponDiscount");
const checkIdBtn=document.querySelector(".checkIdBtn");
const checkIdText=document.querySelector(".checkIdText");
//優惠碼列表
const couponList=document.querySelector(".couponList");
//送出按鈕
const cancelCouponBtn=document.querySelector(".cancelCouponBtn");
const checkCouponBtn=document.querySelector(".checkCouponBtn");

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
    axios.get(`${_url}/coupons`)
    .then(function(res){
        renderCouponList(res.data);
    })
    .catch(function(err){
        console.log(err);
    })
}

//渲染
function renderCouponList(data){
    let str="";
    let checkInputStr="";
    data.forEach(function(item){

        if(item.state == "發佈中"){
            checkInputStr =`
            <input class="form-check-input" type="checkbox" role="switch" id="${item.id}" checked data-bs-toggle="modal" data-bs-target="#couponAlert-${item.id}">
            `
        }else{
            checkInputStr =`
            <input class="form-check-input" type="checkbox" role="switch" id="${item.id}" data-bs-toggle="modal" data-bs-target="#couponAlert-${item.id}">
            `
        }

        str+=`
        <tr class="align-middle border border-primary">
            <td>${item.date}</td>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.usage}</td>
            <td>${item.discount}</td>
            <td>
                <div class="form-check form-switch d-flex justify-content-around">
                    ${checkInputStr}
                    <label class="form-check-label" for="${item.id}" data-bs-toggle="modal" data-bs-target="#couponAlert-${item.id}">${item.state}</label>
                </div>

                <div class="modal fade" id="couponAlert-${item.id}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h6 class="modal-title">確認視窗</h6>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="關閉"></button>
                            </div>
                            <div class="modal-body">
                                按下確認後將切換 ${item.id} 優惠碼使用狀態
                            </div>
                            
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                <button type="button" class="btn btn-primary" data-js-state="${item.state}" data-js-switchState="${item.id}">確認</button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td>${item.useCount}</td>
        </tr>
        `
    })

    couponList.innerHTML=str;

}

//檢查優惠碼序號
checkIdBtn.addEventListener("click",function(e){
    axios.get(`${_url}/coupons`)
    .then(function(res){
        let checkIdOK = true;
        res.data.forEach(function(item){
            if(releaseCouponId.value == item.id){
                checkIdOK = checkIdOK && false;
            }
        })
        if(checkIdOK){
            checkIdText.innerHTML =` <p class="fs-7 text-success">此序號可以使用</p>`
        }else{
            checkIdText.innerHTML =` <p class="fs-7 text-danger">此序號已重複</p>`
        }
    })
    .catch(function(err){
        console.log(err);
    })
})

//取消送出
cancelCouponBtn.addEventListener("click",function(){
    releaseCouponForm.reset();
})

//送出&驗證
checkCouponBtn.addEventListener("click",function(e){
    e.preventDefault();
    //驗證物件
    const releaseCouponDateConstraints = {
        //驗證對象
        發佈日期:{
            presence:{   //必填驗證
                allowEmpty: false,
                message:"是必填欄位",
            }
        },
    };

    //驗證優惠碼序號
    const releaseCouponIdConstraints = {
        //驗證對象
        優惠碼序號:{
            presence:{   //必填驗證
                allowEmpty: false,
                message:"是必填欄位",
            },
        },
    };

    const releaseCouponDateErrors = validate(releaseCouponForm,releaseCouponDateConstraints);
    const releaseCouponIdErrors = validate(releaseCouponForm,releaseCouponIdConstraints);
    const releaseCouponNameErrors = releaseCouponName.value=="請選擇" ? true : false;
    const releaseCouponUsageErrors = releaseCouponUsage.value=="請選擇" ? true : false;
    const releaseCouponDiscountErrors = releaseCouponDiscount.value=="請選擇" ? true : false;

    if(releaseCouponDateErrors){
        //sweetalert2
        Toast.fire({
            icon: "warning",
            title: `${releaseCouponDateErrors["發佈日期"]}`
        });
    }else if(releaseCouponIdErrors){
        Toast.fire({
            icon: "warning",
            title: `${releaseCouponIdErrors["優惠碼序號"]}`
        });
    }else if(releaseCouponNameErrors || releaseCouponUsageErrors || releaseCouponDiscountErrors){
        Toast.fire({
            icon: "warning",
            title: "尚有欄位未選擇"
        });
    }else{
        apiReleaseCoupon();
    }

})

//發布優惠碼
function apiReleaseCoupon(){
    // let couponuuid = crypto.randomUUID();
    axios.post(`${_url}/coupons`,{
        "id":releaseCouponId.value,
        "date": releaseCouponDate.value,
        "name": releaseCouponName.value,
        "usage": releaseCouponUsage.value,
        "discount": releaseCouponDiscount.value,
        "state": "發佈中",
        "useCount": 0
    })
    .then(function(res){
        //sweetalert2
        Toast.fire({
            icon: "warning",
            title: "發佈成功"
        }).then((result) =>{
            window.location.href ="admin-coupon.html";
        })
        
    })
    .catch(function(err){
        console.log(err);
        Toast.fire({
            icon: "error",
            title: "發佈失敗"
        })
    })
}

//優惠碼狀態切換監聽
couponList.addEventListener("click",function(e){
    e.preventDefault();

    if(e.target.innerHTML=="確認"){

        let state = e.target.getAttribute("data-js-state")
        let id = e.target.getAttribute("data-js-switchState");

        if (state == "發佈中"){
            axios.patch(`${_url}/coupons/${id}`,{
                "state": "停用中"
            })
            .then(function(res){
                window.location.href = "admin-coupon.html" ;
                
            })
            .catch(function(err){
                console.log(err);
            })
        }else{
            axios.patch(`${_url}/coupons/${id}`,{
                "state": "發佈中"
            })
            .then(function(res){
                window.location.href = "admin-coupon.html" ;
                
            })
            .catch(function(err){
                console.log(err);
            })
        }
        
    }
    
})