const adminLogoutBtn=document.querySelector(".adminLogoutBtn");

const _url="https://dealmealserver.onrender.com";
// const _url="http://localhost:3000";

//登出admin
adminLogoutBtn.addEventListener("click",function(e){
    e.preventDefault();
    localStorage.clear();
    window.location.href ="admin.html";
})