//會員名稱顯示
const memberWelcome = document.querySelector(".memberWelcome");
//會員中心判斷
const memberBtn = document.querySelector(".memberBtn");
//購物車連結判斷
const memberCart = document.querySelector(".memberCart");
const burgerBtn = document.querySelector(".burgerBtn");
const cartAlertBurgerBadge = document.querySelector(".cartAlertBurgerBadge");
const cartAlertBadge = document.querySelector(".cartAlertBadge");

let userId ;
const _url="https://dealmealserver.onrender.com";
// const _url="http://localhost:3000";

// sweetalert2 timer=1200
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
    userId = localStorage.getItem("userId");
    
    //如果有登入會員會顯示購物車連結
    if(userId){
        memberCart.classList.remove("d-none");
        apiGetUser(userId);
    }else{
        memberCart.classList.add("d-none");
    }
}

//取得會員名稱
function apiGetUser(userId){
    axios.get(`${_url}/users/${userId}`)
    .then(function(res){
        const memberName = res.data.name ;
        memberWelcome.innerHTML=`<p class="text-normal-brown">${memberName}，歡迎回來</p>`;

        if(res.data.cartExist){
            cartAlertBurgerBadge.classList.remove("d-none");
            cartAlertBadge.classList.remove("d-none");

            //加上position-relative
            burgerBtn.classList.add("alertBadgeBackground");
            memberCart.classList.add("alertBadgeBackground");
            cartAlertBurgerBadge.classList.add("alertBadge");
            cartAlertBadge.classList.add("alertBadge");
            
        }else{
            //移除position-relative
            burgerBtn.classList.remove("alertBadgeBackground");
            memberCart.classList.remove("alertBadgeBackground");
            cartAlertBurgerBadge.classList.remove("alertBadge");
            cartAlertBadge.classList.remove("alertBadge");
        }
    })
    .catch(function(err){
        console.log(err);
        Toast.fire({
            icon: "error",
            title: "會員帳號有問題，請聯絡官方"
        })
    })
}

memberBtn.addEventListener("click",function(e){
    e.preventDefault();
    if(userId){
        window.location.href =`member.html`;
    }else{
        window.location.href ="login.html";
    }
        
})