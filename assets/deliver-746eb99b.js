import"./bootstrap.min-f122c4cb.js";import"./header-cf4ee72a.js";const r=document.querySelector(".deliverInfoForm"),s=document.querySelector(".deliverInfoName"),a=document.querySelector(".deliverInfoEmail"),I=document.querySelector(".deliverInfoTel"),c=document.querySelector(".deliverInfoAddress"),g=document.querySelector(".deliverNextBtn");let d=localStorage.getItem("userId");const m="https://dealmealserver.onrender.com",n=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:e=>{e.onmouseenter=Swal.stopTimer,e.onmouseleave=Swal.resumeTimer}});w();function w(){axios.get(`${m}/users/${d}`).then(function(e){E(e.data)}).catch(function(e){console.log(e)})}function E(e){s.value=e.name,a.value=e.email,c.value=e.address}g.addEventListener("click",function(e){e.preventDefault();const v={姓名:{presence:{allowEmpty:!1,message:"是必填欄位"}}},f={配送地址:{presence:{allowEmpty:!1,message:"是必填欄位"}}},u={電子信箱:{presence:{allowEmpty:!1,message:"是必填欄位"}}},p={電話號碼:{presence:{allowEmpty:!1,message:"是必填欄位"}}},t=validate(r,v),o=validate(r,f),l=validate(r,u),i=validate(r,p);t?n.fire({icon:"warning",title:`${t.姓名}`}):l?n.fire({icon:"warning",title:`${l.電子信箱}`}):i?n.fire({icon:"warning",title:`${i.電話號碼}`}):o?n.fire({icon:"warning",title:`${o.配送地址}`}):y()});function y(){axios.patch(`${m}/carts/${d}`,{deliverInfo:{name:s.value,email:a.value,address:c.value,tel:I.value}}).then(function(e){window.location.href="payment.html"}).catch(function(e){console.log(e)})}
