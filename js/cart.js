const none =()=> main.innerHTML = "<h3 class='mt-5 w-100 text-center'><span class='badge badge-warning'>пуста</span></h3>";
window.addEventListener('load',()=> (sessionStorage.cart) ? F.script('/js/carts.js') : none());