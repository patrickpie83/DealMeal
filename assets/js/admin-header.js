//登出
const adminLogoutBtn=document.querySelector(".adminLogoutBtn");
//訂單管理
const notProcessedOrder=document.querySelector(".notProcessedOrder");
const processingOrder=document.querySelector(".processingOrder");
const deliveringOrder=document.querySelector(".deliveringOrder");
const canceledOrder=document.querySelector(".canceledOrder");
const completedOrder=document.querySelector(".completedOrder");

//登出admin
adminLogoutBtn.addEventListener("click",function(e){
    e.preventDefault();
    localStorage.clear();
    window.location.href ="admin.html";
})


//訂單管理
notProcessedOrder.addEventListener("click",function(e){
    e.preventDefault();
    window.location.href = "admin-orderList.html?status=notProcessedOrder";
})

processingOrder.addEventListener("click",function(e){
    e.preventDefault();
    window.location.href = "admin-orderList.html?status=processingOrder";
})

deliveringOrder.addEventListener("click",function(e){
    e.preventDefault();
    window.location.href = "admin-orderList.html?status=deliveringOrder";
    console.log("")
})

canceledOrder.addEventListener("click",function(e){
    e.preventDefault();
    window.location.href = "admin-orderList.html?status=canceledOrder";
})

completedOrder.addEventListener("click",function(e){
    e.preventDefault();
    window.location.href = "admin-orderList.html?status=completedOrder";
})


