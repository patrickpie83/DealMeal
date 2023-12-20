//登入
const adminEmail=document.querySelector("#adminEmail");
const adminPassword=document.querySelector("#adminPassword");
const adminLoginBtn=document.querySelector(".adminLoginBtn");


init();

function init(){
    if( localStorage.getItem("adminToken") ){
        window.location.href ="admin-products.html";
    }
}

function apiAdminLogin(){
    axios.post(`${_url}/login`,{
        "email":adminEmail.value,
        "password":adminPassword.value
    })
    .then(function(res){
        if(res.data.user.role == "admin"){
            //sweetalert2
            Toast.fire({
                icon: "success",
                title: "登入成功"
            }).then((result) => {
                localStorage.setItem("adminToken",res.data.accessToken);
                localStorage.setItem("adminId",res.data.user.id);
                window.location.href ="admin-products.html";
            });
            
        }else{
            Toast.fire({
                icon: "error",
                title: "登入失敗"
            });
        }
        
    })
    .catch(function(err){
        console.log(err);
        Toast.fire({
            icon: "error",
            title: "登入失敗"
        });
    })
}

adminLoginBtn.addEventListener("click",function(e){
    e.preventDefault();
    if(! (adminEmail.value && adminPassword.value)){
        Toast.fire({
            icon: "warning",
            title: "欄位未填"
        });
        return;
    }
    apiAdminLogin();
})