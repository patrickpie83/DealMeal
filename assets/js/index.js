// 回到最上面按鈕
const backToTopBtn=document.querySelector(".backToTopBtn");

// 往下滑200px即出現
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
}

if(backToTopBtn){
  backToTopBtn.addEventListener("click",function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  })
}else{
  console.error('Element with ID "myButton" not found.');
}

//sweetalert2 timer=1200
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

//複製優惠碼
const couponText=document.querySelector(".couponText");
const copyCouponBtn=document.querySelector(".copyCouponBtn");

copyCouponBtn.addEventListener("click",function(){
  navigator.clipboard.writeText(couponText.value)
        .then(function() {
          //sweetalert2
          Toast.fire({
              icon: "success",
              title: `已複製 ${couponText.value}`
            })
        })
        .catch(function(err) {
            console.log(err);
        });
})
