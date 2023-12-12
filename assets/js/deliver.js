//顧客資訊
const deliverInfoForm=document.querySelector(".deliverInfoForm");
const deliverInfoName=document.querySelector(".deliverInfoName");
const deliverInfoEmail=document.querySelector(".deliverInfoEmail");
const deliverInfoTel=document.querySelector(".deliverInfoTel");
const deliverInfoAddress=document.querySelector(".deliverInfoAddress");
//下一步
const deliverNextBtn=document.querySelector(".deliverNextBtn");


// const _url="https://dealmealserver.onrender.com";
const _url="http://localhost:3000";
let userId = localStorage.getItem("userId");

//初始
init();

function init(){
    axios.get(`${_url}/users/${userId}`)
    .then(function(res){
        renderDeliver(res.data);
    })
    .catch(function(err){
        console.log(err);
    })
}

//渲染
function renderDeliver(data){

    deliverInfoName.value = data.name;
    deliverInfoEmail.value = data.email;
    deliverInfoAddress.value = data.address;

}

//下一步監聽&驗證
deliverNextBtn.addEventListener("click",function(e){
    e.preventDefault();

    //驗證物件
    const deliverNameConstraints = {
        //驗證對象
        姓名:{
            presence:{   //必填驗證
                allowEmpty: false,
                message:"是必填欄位",
            },
        },
    };

    //驗證配送地址
    const deliverAddressConstraints = {
        //驗證對象
        配送地址:{
            presence:{   //必填驗證
                allowEmpty: false,
                message:"是必填欄位",
            },
        },
    };

    //驗證電子信箱
    const deliverEmailConstraints = {
        //驗證對象
        電子信箱:{
            presence:{   //必填驗證
                allowEmpty: false,
                message:"是必填欄位",
            },
        },
    };

    //驗證電話號碼
    const deliverTelConstraints = {
        //驗證對象
        電話號碼:{
            presence:{   //必填驗證
                allowEmpty: false,
                message:"是必填欄位",
            },
        },
    };

    const deliverNameErrors = validate(deliverInfoForm,deliverNameConstraints);
    const deliverAddressErrors = validate(deliverInfoForm,deliverAddressConstraints);
    const deliverEmailErrors = validate(deliverInfoForm,deliverEmailConstraints);
    const deliverTelErrors = validate(deliverInfoForm,deliverTelConstraints);


    if(deliverNameErrors){
        alert(deliverNameErrors["姓名"]);
    }else if(deliverEmailErrors){
        alert(deliverEmailErrors["電子信箱"]);
    }else if(deliverTelErrors){
        alert(deliverTelErrors["電話號碼"]);
    }else if(deliverAddressErrors){
        alert(deliverAddressErrors["配送地址"]);
    }else{
        apiAddCartDeliverInfo();
    }
    
})

//修改購物車的配送資訊
function apiAddCartDeliverInfo(){
    axios.patch(`${_url}/carts/${userId}`,{
        "deliverInfo":{
            "name":deliverInfoName.value,
            "email":deliverInfoEmail.value,
            "address":deliverInfoAddress.value,
            "tel":deliverInfoTel.value
        }
    })
    .then(function(res){
        window.location.href ="payment.html";
    })
    .catch(function(err){
        console.log(err);
    })

}