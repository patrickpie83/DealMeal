import"./bootstrap.min-d005857b.js";const o=document.querySelector("#adminEmail"),t=document.querySelector("#adminPassword"),i=document.querySelector(".adminLoginBtn"),a="https://dealmealserver.onrender.com",n=Swal.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,timerProgressBar:!1,didOpen:e=>{e.onmouseenter=Swal.stopTimer,e.onmouseleave=Swal.resumeTimer}});r();function r(){localStorage.getItem("adminToken")&&(window.location.href="admin-products.html")}function l(){axios.post(`${a}/login`,{email:o.value,password:t.value}).then(function(e){e.data.user.role=="admin"?n.fire({icon:"success",title:"登入成功"}).then(s=>{localStorage.setItem("adminToken",e.data.accessToken),localStorage.setItem("adminId",e.data.user.id),window.location.href="admin-products.html"}):n.fire({icon:"error",title:"登入失敗"})}).catch(function(e){console.log(e),n.fire({icon:"error",title:"登入失敗"})})}i.addEventListener("click",function(e){if(e.preventDefault(),!(o.value&&t.value)){n.fire({icon:"warning",title:"欄位未填"});return}l()});
