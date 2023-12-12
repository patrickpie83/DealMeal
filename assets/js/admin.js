//登入
const adminEmail=document.querySelector("#adminEmail");
const adminPassword=document.querySelector("#adminPassword");
const adminLoginBtn=document.querySelector(".adminLoginBtn");

// const _url="https://dealmealserver.onrender.com";
const _url="http://localhost:3000";

function apiAdminLogin(){
    axios.post(`${_url}/login`,{
        "email":adminEmail.value,
        "password":adminPassword.value
    })
    .then(function(res){
        alert("登入成功");
        localStorage.setItem("adminToken",res.data.accessToken);
        localStorage.setItem("adminId",res.data.user.id);
        window.location.href ="admin-products.html";
        
    })
    .catch(function(err){
        console.log(err);
        alert("登入失敗");
    })
}

adminLoginBtn.addEventListener("click",function(e){
    e.preventDefault();
    if(! (adminEmail.value && adminPassword.value)){
        alert("欄位未填");
        return;
    }
    apiAdminLogin();
})