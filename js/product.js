window.addEventListener('load',()=>{

document.querySelector('main button').onclick = function(){
  F.cartAdd(this,[1,document.querySelector('h1').textContent,+document.querySelector('h2').textContent.replace(/\D/g,''),decodeURI(location.pathname)])
};
const magic =(btn,page)=>{
  F.btn(btn); F.ajax(page+'/',function(){
    let res = this.response.split('main')[2];
    view_text.innerHTML = res.slice(res.indexOf('>')+1,-2);
    view_img.classList.add('d-none');
    view_text.classList.remove('d-none');
    btn.onclick =()=>{
      view_img.classList.remove('d-none');
      view_text.classList.add('d-none');
      btn.onclick =()=> magic(btn,page);
    }
  })
};
document.querySelectorAll('main img')[1].onclick = function(){ magic(this,'delivery') };
document.querySelectorAll('main img')[2].onclick = function(){ magic(this,'payment') };
view_text.style.height = view_img.offsetHeight;

})
