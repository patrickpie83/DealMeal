//註冊會員
const signUpName=document.querySelector("#signUpName");
const signUpAddress=document.querySelector("#signUpAddress");
const signUpEmail=document.querySelector("#signUpEmail");
const signUpPassword=document.querySelector("#signUpPassword");
const signUpBtn=document.querySelector(".signUpBtn");
const signUpForm=document.querySelector(".signUpForm");
const signUpNameContent=document.querySelector(".signUpNameContent");
const signUpAddressContent=document.querySelector(".signUpAddressContent");
const signUpEmailContent=document.querySelector(".signUpEmailContent");
const signUpPasswordContent=document.querySelector(".signUpPasswordContent");
//登入會員
const loginEmail=document.querySelector("#loginEmail");
const loginPassword=document.querySelector("#loginPassword");
const loginBtn=document.querySelector(".loginBtn");

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

// 註冊會員API
function apiSignUp(){
    let myuuid = crypto.randomUUID();
    axios.post(`${_url}/users`,{
        "id":myuuid,
        "name":signUpName.value,
        "address":signUpAddress.value,
        "email":signUpEmail.value,
        "password":signUpPassword.value,
        "cartExist":false,
        "usedCoupon":[],
        "historyOrder":[]
    })
    .then(function(res){
        //sweetalert2
        Toast.fire({
            icon: "success",
            title: "註冊成功"
        }).then((result) =>{
            window.location.href = "login.html" ;
        })
        
    })
    .catch(function(err){
        console.log(err);
    })
}

//註冊＆驗證
signUpBtn.addEventListener("click",function(e){
    e.preventDefault();

    //驗證物件
    const signUpNameConstraints = {
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
    const signUpAddressConstraints = {
        //驗證對象
        配送地址:{
            presence:{   //必填驗證
                allowEmpty: false,
                message:"是必填欄位",
            },
        },
    };

    //驗證電子信箱
    const signUpEmailConstraints = {
        //驗證對象
        電子信箱:{
            presence:{   //必填驗證
                allowEmpty: false,
                message:"是必填欄位",
            },
        },
    };

    //驗證密碼
    const signUpPasswordConstraints = {
        //驗證對象
        密碼:{
            presence:{   //必填驗證
                allowEmpty: false,
                message:"是必填欄位",
            },
        },
    };

    const signUpNameErrors = validate(signUpForm,signUpNameConstraints);
    const signUpAddressErrors = validate(signUpForm,signUpAddressConstraints);
    const signUpEmailErrors = validate(signUpForm,signUpEmailConstraints);
    const signUpPasswordErrors = validate(signUpForm,signUpPasswordConstraints);

    signUpNameContent.textContent = signUpNameErrors ? `${signUpNameErrors["用戶名稱"]}` : "";
    signUpAddressContent.textContent = signUpAddressErrors ? `${signUpAddressErrors["配送地址"]}` : "";
    signUpEmailContent.textContent = signUpEmailErrors ? `${signUpEmailErrors["電子信箱"]}` : "";
    signUpPasswordContent.textContent = signUpPasswordErrors ? `${signUpPasswordErrors["密碼"]}` : "";

    if( !(signUpNameErrors || signUpAddressErrors || signUpEmailErrors || signUpPasswordErrors) ){
        apiSignUp();
    }
    
})

//登入會員
function apiLogin(){
    axios.post(`${_url}/login`,{
        "email":loginEmail.value,
        "password":loginPassword.value
    })
    .then(function(res){
        //sweetalert2
        Toast.fire({
            icon: "success",
            title: "登入成功"
          }).then((result) => {
            localStorage.setItem("userToken",res.data.accessToken);
            localStorage.setItem("userId",res.data.user.id);
            window.location.href ="index.html";
          });
    })
    .catch(function(err){
        console.log(err);
        //sweetalert2
        Toast.fire({
            icon: "error",
            title: "登入失敗"
        })
    })
}

loginBtn.addEventListener("click",function(e){
    e.preventDefault();
    if(! (loginEmail.value && loginPassword.value)){

        //sweetalert2
        Toast.fire({
            icon: "warning",
            title: "欄位未填"
        })

        return;
    }
    apiLogin();
})