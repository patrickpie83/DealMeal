import"./bootstrap.min-275429c0.js";const n=document.querySelector("#adminEmail"),t=document.querySelector("#adminPassword"),a=document.querySelector(".adminLoginBtn"),o="https://dealmealserver.onrender.com";function i(){axios.post(`${o}/login`,{email:n.value,password:t.value}).then(function(e){alert("登入成功"),localStorage.setItem("adminToken",e.data.accessToken),localStorage.setItem("adminId",e.data.user.id),window.location.href="admin-products.html"}).catch(function(e){console.log(e),alert("登入失敗")})}a.addEventListener("click",function(e){if(e.preventDefault(),!(n.value&&t.value)){alert("欄位未填");return}i()});
