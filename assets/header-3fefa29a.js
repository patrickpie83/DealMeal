const l=document.querySelector(".memberWelcome"),d=document.querySelector(".memberBtn"),r=document.querySelector(".memberCart"),s=document.querySelector(".burgerBtn"),o=document.querySelector(".cartAlertBurgerBadge"),c=document.querySelector(".cartAlertBadge");let t;const m="http://localhost:3000";i();function i(){t=localStorage.getItem("userId"),t?(r.classList.remove("d-none"),u(t)):r.classList.add("d-none")}function u(a){axios.get(`${m}/users/${a}`).then(function(e){const n=e.data.name;l.innerHTML=`<p class="text-normal-brown">${n}，歡迎回來</p>`,e.data.cartExist?(o.classList.remove("d-none"),c.classList.remove("d-none"),s.classList.add("alertBadgeBackground"),r.classList.add("alertBadgeBackground"),o.classList.add("alertBadge"),c.classList.add("alertBadge")):(s.classList.remove("alertBadgeBackground"),r.classList.remove("alertBadgeBackground"),o.classList.remove("alertBadge"),c.classList.remove("alertBadge"))}).catch(function(e){console.log(e)})}d.addEventListener("click",function(a){a.preventDefault(),t?window.location.href="member.html":window.location.href="login.html"});
