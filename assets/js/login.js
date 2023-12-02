

//註冊會員
const signUpName=document.querySelector("#signUpName");
const signUpAddress=document.querySelector("#signUpAddress");
const signUpEmail=document.querySelector("#signUpEmail");
const signUpPassword=document.querySelector("#signUpPassword");
const signUpBtn=document.querySelector(".signUpBtn");
//登入會員
const loginEmail=document.querySelector("#loginEmail");
const loginPassword=document.querySelector("#loginPassword");
const loginBtn=document.querySelector(".loginBtn");

//000

const _url="https://dealmeal.onrender.com/";
// const _url="http://localhost:3000/";

// 註冊會員API
function signUp(){
    let myuuid = crypto.randomUUID();
    axios.post(`${_url}users`,{
        "id":myuuid,
        "name":signUpName.value,
        "address":signUpAddress.value,
        "email":signUpEmail.value,
        "password":signUpPassword.value
    })
    .then(function(res){
        alert("註冊成功");
        // window.location.href = "index.html" ;
    })
    .catch(function(err){
        console.log(err);
    })
}
signUpBtn.addEventListener("click",function(){
    if(! (signUpName.value && signUpAddress.value && signUpEmail.value && signUpPassword.value)){
        alert("尚有欄位未填完畢");
        return;
    }
    signUp();
})

//登入會員
function login(){
    axios.post(`${_url}login`,{
        "email":loginEmail.value,
        "password":loginPassword.value
    })
    .then(function(res){
        alert("登入成功");
        //判斷身份別，若是admin為管理者，會進入後台 (role由手動修改db.json加入)
        //同時依照身份，admin或user，將token紀錄下來，在跳轉網址顯示頁面(後台網址、景點列表網址)時會檢查
        // if(res.data.user.role==="admin"){
        //     localStorage.setItem("adminToken",res.data.accessToken);
        //     // 待調整
        //     // window.location.href ="admin-page.html";
        // }else{
        //     localStorage.setItem("userToken",res.data.accessToken);
        //     localStorage.setItem("userId",res.data.user.id);
        //     // 待調整
        //     // window.location.href ="attractionList.html";
        // }
        
    })
    .catch(function(err){
        console.log(err);
        alert("登入失敗");
    })
}
loginBtn.addEventListener("click",function(){
    if(! (loginEmail.value && loginPassword.value)){
        alert("欄位未填");
        return;
    }
    login();
})