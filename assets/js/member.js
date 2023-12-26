//登出
const logoutBtn = document.querySelector(".logoutBtn");
//會員資料
const memberFile = document.querySelector(".memberFile");
const memberName = document.querySelector("#memberName");
const memberEmail = document.querySelector("#memberEmail");
const memberAddress = document.querySelector("#memberAddress");
const saveFileComfirm = document.querySelector(".saveFileComfirm");
//歷史訂單
const historyOrderContent = document.querySelector(".historyOrderContent");

let userId ;
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

//會員中心初始
init()

function init(){
    userId = localStorage.getItem("userId");

    if(userId){
        apiGetMember();
    }else{
        window.location.href ="login.html";
    }
}

//取得會員資料渲染
function apiGetMember(){
    axios.get(`${_url}/users/${userId}`)
    .then(function(res){
        render(res.data);
    })
    .catch(function(err){
        console.log(err);
    })
}

//渲染表單
function render(data){

    //會員資料
    memberName.value = data.name;
    memberEmail.value = data.email;
    memberAddress.value = data.address;

    //歷史訂單
    let historyOrderStr="";
    let historyOrderAry = data.historyOrder;
    if(historyOrderAry.length == 0){
        historyOrderContent.innerHTML=`
        <tr>
            <td class="py-5" colspan="5" >尚無歷史訂單資料</td>
        </tr>
        `
    }else{
        //每筆訂單
        historyOrderAry.forEach(function(item){

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

            historyOrderStr +=`
            <tr>
                <td >${item.orderDate}</td>
                <td>${item.id}</td>
                <td>${item.deliverInfo.name}</td>
                <td>${item.status}</td>
                <td>
                    <a class="text-decoration-none" href="#" data-bs-toggle="collapse" data-bs-target="#orderId-${item.id}">+</a>
                </td>
            </tr>
                
            <tr>
                <td colspan="5">
                    <div id="orderId-${item.id}" class="collapse">
                    <p>${productsStr}</p>
                    <p>使用優惠碼：${couponDiscountStr}</p>
                    <p>訂單總額：${item.total}元</p>
                    <p>付款方式：${item.payment}</p>
                    <p>訂購人電話：${item.deliverInfo.tel}</p>
                    <p>配送地址：${item.deliverInfo.address}</p>
                    </div>
                </td>
            </tr>
            `
        })
        historyOrderContent.innerHTML = historyOrderStr;

    }
}

//修改會員資料
function apiModifyMember(name,email,address){
    axios.patch(`${_url}/users/${userId}`,{
        "name":name,
        "address":address,
        "email":email
    })
    .then(function(res){
        //sweetalert2
        Toast.fire({
            icon: "success",
            title: "變更成功"
        }).then((result) =>{
            window.location.href ="member.html";
        })
    })
    .catch(function(err){
        console.log(err);
    })
}

//登出
logoutBtn.addEventListener("click",function(e){
    e.preventDefault();
    localStorage.clear();
    window.location.href ="index.html";
})

//儲存變更
saveFileComfirm.addEventListener("click",function(e){
    e.preventDefault();

    //驗證物件
    const modifyNameConstraints = {
        //驗證對象
        用戶名稱:{
            presence:{   //必填驗證
                allowEmpty: false,
                message:"是必填欄位",
            },
            format: {
                pattern: /^[^\s]+([^\s]+)*$/, // 正則表達式：不可在中間包含空白符號
                message: "不可含有空白符號",
            },
        },
    };

    //驗證配送地址
    const modifyAddressConstraints = {
        //驗證對象
        配送地址:{
            presence:{   //必填驗證
                allowEmpty: false,
                message:"是必填欄位",
            },
        },
    };

    //驗證電子信箱
    const modifyEmailConstraints = {
        //驗證對象
        電子信箱:{
            presence:{   //必填驗證
                allowEmpty: false,
                message:"是必填欄位",
            },
        },
    };

    const modifyNameErrors = validate(memberFile,modifyNameConstraints);
    const modifyAddressErrors = validate(memberFile,modifyAddressConstraints);
    const modifyEmailErrors = validate(memberFile,modifyEmailConstraints);

    let modifyNameErrorsContent = modifyNameErrors ? `${modifyNameErrors["用戶名稱"]}` : "";
    let modifyAddressErrorsContent = modifyAddressErrors ? `${modifyAddressErrors["配送地址"]}` : "";
    let modifyEmailErrorsContent = modifyEmailErrors ? `${modifyEmailErrors["電子信箱"]}` : "";

    if(modifyNameErrorsContent){
        //sweetalert2
        Toast.fire({
            icon: "warning",
            title: `${modifyNameErrorsContent}`
        });
    }else if(modifyAddressErrorsContent){
        Toast.fire({
            icon: "warning",
            title: `${modifyAddressErrorsContent}`
        });
    }else if(modifyEmailErrorsContent){
        Toast.fire({
            icon: "warning",
            title: `${modifyEmailErrorsContent}`
        });
    }else{
        apiModifyMember(memberName.value,memberEmail.value,memberAddress.value);
        
    }

})