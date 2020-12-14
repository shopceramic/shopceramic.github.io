window.addEventListener('load',()=>{

head_toggler.onclick = function(){
  head.children[2].classList.toggle('d-none')
  head.children[3].classList.toggle('d-flex')
  head.children[4].classList.toggle('d-flex')
  let src = ['https://sun9-62.userapi.com/c855428/v855428233/16a7e0/QFUYFC42mJc.jpg','https://sun9-41.userapi.com/c853524/v853524454/163f78/d-MIOq4b2es.jpg'];
  this.src = (this.src == src[0]) ? src[1] : src[0];
}
let head = document.querySelector('header'),
scrollOn =()=>{
  window.removeEventListener('scroll',scrollOn)
  if(innerWidth < 992 && head.getElementsByClassName('d-flex').length > 0) head_toggler.onclick()
  let h1 = document.querySelector('h1'); h1.style.marginTop = h1.offsetTop
  head.style.cssText = 'position:fixed;top:0;right:15px;left:15px;z-index:1';
};
window.addEventListener('scroll',scrollOn)
if(sessionStorage.cart) F.cartHead(JSON.parse(sessionStorage.cart))
for(let btn of head.getElementsByClassName('btn')){
  if(location.pathname == btn.pathname) return btn.classList.add('active')
}

})
const F ={
  ajax:(page,fun)=>{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/'+page);
    xhr.send();
    xhr.onload = fun;
  },
  btn:(btn)=>{
    btn.classList.add('pulsate','duration-1500');
    setTimeout(()=> btn.classList.remove('pulsate'),1500);
  },
  cartAdd:(btn,ar)=>{//alert(ar)
    F.btn(btn); let arr;
    if(sessionStorage.cart){
      arr = JSON.parse(sessionStorage.cart);
      let rep = arr.findIndex(item => ar[1] == item[1]);
      if(rep > -1) arr[rep][0] += 1;
      else{ arr.unshift(ar); if(arr.length > 10) arr.pop() }
    }
    else arr = [ar];
    F.cartHead(arr); F.write(arr)
  },
  cartHead:(arr)=>{
    cart1.textContent = arr.reduce((sum,ar)=> sum+ar[0],0);
    cart1.classList.remove('badge-warning')
    cart1.classList.add('badge-success')
  },
  write:(arr)=> sessionStorage.cart = JSON.stringify(arr)
}