window.addEventListener('load',()=>{

let onmt =('ontouchmove' in window) ? ['touchmove','touchend'] : ['mouseover','mouseout'];
for(let card of document.querySelectorAll('main .card')){
  let a = card.getElementsByTagName('a')[0];
  a.onclick =()=>{ window.open(a.href); return false }
  card.getElementsByTagName('input')[0].onclick = function(){
    F.cartAdd(this,[1,card.getElementsByClassName('card-header')[0].textContent,+card.getElementsByTagName('h5')[0].textContent.replace(/\D/g,''),decodeURI(a.pathname)])
  }
  card.addEventListener(onmt[0],flip);
}
function flip(){
  let img = this.getElementsByTagName('img')[0];
  img.classList.add('flip','duration-2000');
  this.style.outline = '0.5rem outset #AC9FD7';
  this.addEventListener(onmt[1],function(){
    img.classList.remove('flip'); this.style.outline = '';
  });
}

})
