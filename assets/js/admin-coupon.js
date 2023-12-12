//新優惠碼
const releaseCouponForm=document.querySelector(".releaseCouponForm");
const releaseCouponDate=document.querySelector("#releaseCouponDate");
const releaseCouponId=document.querySelector("#releaseCouponId");
const releaseCouponName=document.querySelector("#releaseCouponName");
const releaseCouponUsage=document.querySelector("#releaseCouponUsage");
const releaseCouponDiscount=document.querySelector("#releaseCouponDiscount");
//優惠碼列表
const couponList=document.querySelector(".couponList");
//送出按鈕
const checkCouponBtn=document.querySelector(".checkCouponBtn");

// const _url="https://dealmealserver.onrender.com";
const _url="http://localhost:3000";

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
                                按下確認後將切換此優惠碼可使用狀態
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
        alert(`${releaseCouponDateErrors["發佈日期"]}`);
    }else if(releaseCouponIdErrors){
        alert(`${releaseCouponIdErrors["優惠碼序號"]}`);
    }else if(releaseCouponNameErrors || releaseCouponUsageErrors || releaseCouponDiscountErrors){
        alert("尚有欄位未選擇");
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
        alert("發佈成功");
        window.location.href ="admin-coupon.html";
        
    })
    .catch(function(err){
        console.log(err);
        alert("發佈失敗");
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