window.addEventListener('load',()=>{

let card_arr; const cardArr =()=>{
  if(typeof card_arr == 'undefined') card_arr = Array.from(main.children[1].childNodes)
},
sortfilt =(id)=>{
  let price =(el)=> +el.getElementsByTagName('h5')[0].textContent.replace(/\D/g,''),
  fun ={
    'sort':['filter',(name)=>{
      fun[id][2][name](); main.children[1].innerHTML = '';
      card_arr.forEach(el =>  main.children[1].append(el))
    },{
      'Увеличению цены':()=> card_arr.sort((a,b)=> price(a)-price(b)),
      'Уменьшению цены':()=> card_arr.sort((a,b)=> price(b)-price(a)),
      Алфавиту:()=> card_arr.sort((a,b)=>{
        let y = a.textContent; let z = b.textContent;
        return (y < z) ? -1 : (y > z) ? 1 : 0
      })
    }],
    'filter':['sort',(name)=>{
      let arr = fun[id][2][name](); main.children[1].innerHTML = '';
      arr.forEach(el =>  main.children[1].append(el))
    },{
      Часы:()=> card_arr.filter(el => el.textContent.indexOf('Часы') > -1),
      Киоты:()=> card_arr.filter(el => el.textContent.indexOf('Киот') > -1),
      Сувениры:()=> card_arr.filter(el => !el.textContent.match(/Часы|Киот/))
    }]
  },
  near = document.getElementById('catalog_'+fun[id][0]),
  byid = document.getElementById('catalog_'+id);
  byid.classList.toggle('d-none');
  if(!near.classList.contains('d-none')) near.classList.add('d-none');
  if(byid.childNodes.length < 1) byid.innerHTML = Object.keys(fun[id][2]).reduce((str,el)=> str+`<div class='col-12 col-sm-6 col-md-3 p-3 text-center'><em class='w-100 btn btn-outline-dark shadow'>${el}</em></div>`,'');
  byid.childNodes.forEach(el => el.children[0].onclick = function(){
    let act = byid.getElementsByClassName('active')[0];
    // let act = document.querySelector(`#catalog_${id} .active`);
    if(act) act.classList.remove('active');
    this.classList.add('active');
    if(main.childNodes.length > 2) more.onclick();
    cardArr(); fun[id][1](this.textContent)
  })
},
nones =(key)=>{
  for(let i = 24; i < 36; i++){
    document.querySelectorAll('main .card')[i].parentNode.classList[key]('d-none')
  }
};
nones('add')
more.onclick =()=>{ nones('remove'); more.parentNode.remove() }
sort_toggler.onclick =()=> sortfilt('sort');
filter_toggler.onclick =()=> sortfilt('filter');

})