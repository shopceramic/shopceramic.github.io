window.addEventListener('load',()=>{

const none =()=> main.innerHTML = "<h3 class='mt-5 w-100 text-center'><span class='badge badge-warning'>пуста</span></h3>";
if(!sessionStorage.cart) return none();
let total = 0, carts = JSON.parse(sessionStorage.cart);
main.innerHTML = carts.reduce((str,ar,i)=>{
  let result = ar[2]*ar[0]; total += result;
  return str + `<tr><td>${i+1} </td><td class='text-left'><a href='${ar[3]}'>${ar[1]}</a></td><td><button class='align-middle w-25 btn btn-light shadow'>-</button><input class='align-middle w-25 p-2 text-center border-0' value='${ar[0]}'><button class='align-middle w-25 btn btn-light shadow'>+</button></td><td><big>${result}</big> <small>руб</small></td><td class='btn text-danger'>&#10060;</td></tr>`;
},"<table class='table table-hover table-responsive-md text-center rounded'><thead><tr><th>№</th><th>Наименование:</th><th>Количество:</th><th>Стоимость:</th><th></th></tr></thead><tbody id='tbody'>")+ `</tbody><tfoot><tr><td></td><td colspan='2' class='text-right'>Общая сумма заказа:</td><th colspan='2'><big id='result' class='text-success'>${total}</big> <small>руб</small></th><tr></tfoot></table>`;
document.querySelectorAll('main a').forEach(a => a.onclick =()=>{ window.open(a.href); return false })
const events =()=> tbody.childNodes.forEach((tr,i)=>{
  let minusplus =()=>{
    let count = carts[i][0], price = sum.textContent / input.value;
    input.value = count; sum.textContent = price * count; add()
  },
  btn = tr.getElementsByTagName('button'),
  sum = tr.getElementsByTagName('big')[0],
  input = tr.getElementsByTagName('input')[0];
  input.onchange =()=>{
    F.btn(input); let val = +input.value;
    if(isFinite(val) === false || val < 1 || val > 99) return;
    sum.textContent = sum.textContent / carts[i][0] * val;
    carts[i][0] = val; add();
  };
  btn[0].onclick =()=>{
    F.btn(btn[0]); if(input.value < 2) return; carts[i][0] -= 1; minusplus()
  };
  btn[1].onclick =()=>{ F.btn(btn[1]); carts[i][0] += 1; minusplus() };
  tr.lastChild.onclick =()=>{
    if(carts.length == 1){
      none(); cart1.textContent = 0;
      cart1.classList.remove('badge-success'); cart1.classList.add('badge-warning');
      delete sessionStorage.cart; return
    }
    carts.splice(i,1); tr.remove();
    tbody.childNodes.forEach((tr,i)=> tr.children[0].textContent = i+1)
    add(); events()
  }
}),
add =()=>{
  let total = 0
  for(let sum of tbody.getElementsByTagName('big')){ total += +sum.textContent }
  result.textContent = total; F.cartHead(carts); F.write(carts)
};
events()

})