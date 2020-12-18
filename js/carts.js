let total = 0, carts = JSON.parse(sessionStorage.cart);
main.innerHTML = carts.reduce((str,ar,i)=>{
  let result = ar[2]*ar[0]; total += result;
  return str + `<tr><td>${i+1} </td><td class='text-left'><a href='${ar[3]}'>${ar[1]}</a></td><td><button class='align-middle w-25 btn btn-light shadow'>-</button><input class='align-middle w-25 p-2 text-center border-0' value='${ar[0]}'><button class='align-middle w-25 btn btn-light shadow'>+</button></td><td><big>${result}</big> <small>руб</small></td><td class='btn text-danger'>&#10060;</td></tr>`;
},"<table class='table table-hover table-responsive-md text-center rounded'><thead><tr><th>№</th><th>Наименование:</th><th>Количество:</th><th>Стоимость:</th><th></th></tr></thead><tbody id='tbody'>")+ `</tbody><tfoot><tr><td></td><td colspan='2' class='text-right'>Общая сумма заказа:</td><th colspan='2'><big id='result' class='text-success'>${total}</big> <small>руб</small></th><tr></tfoot></table><div class='my-5 w-100 text-center'><div id='contin' class='btn btn-lg btn-info'>Оформить</div></div>`;
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
    if(carts.length == 1) return cartDel();
    carts.splice(i,1); tr.remove();
    tbody.childNodes.forEach((tr,i)=> tr.children[0].textContent = i+1)
    add(); events()
  }
}),
add =()=>{
  let total = 0;
  for(let sum of tbody.getElementsByTagName('big')){ total += +sum.textContent }
  result.textContent = total; F.cartHead(carts); F.write(carts)
},
cartDel =()=>{
  none(); cart1.textContent = 0;
  cart1.classList.remove('badge-success'); cart1.classList.add('badge-warning');
  delete sessionStorage.cart; return
},
checkTel =()=>{
  if(!tel.value) tel.value = '+7(';
  tel.onkeyup = ()=>{
    let a = tel.value.replace(/[^0-9]/g, '');
    if(!a[0]) return; if (a[0] != 7) a = 7+a; let t = '+7(';
    if (a[1]){ t += a[1]; if (a[2]){ t += a[2]; if (a[3]){ t += a[3]+')'; if (a[4]){ t += a[4]; if (a[5]){ t += a[5]; if (a[6]){ t += a[6]+'-'; if (a[7]){ t += a[7]; if (a[8]){ t += a[8]+'-'; if (a[9]){ t += a[9]; if (a[10]) t += a[10];}}}}}}}}}
    tel.value = t;
  };
};
events();
document.querySelectorAll('main a').forEach(a => a.onclick =()=>{ window.open(a.href); return false })
contin.onclick =()=>{
  F.btn(contin);
  if(document.scripts.length == 4) F.script('//code-ya.jivosite.com/widget/ZCCoipNRaL');
  (()=>{
    let link = document.createElement('link');
    link.type = 'text/css'; link.rel='stylesheet'; link.href = '/css/unfold.css';
    document.head.append(link)
  })();
  main.insertAdjacentHTML('beforeEnd', [["Контактное лицо","<input id='nam'","30'/>"],["Конт. номер телефона","<input type='tel' id='tel'","16'/>"],["Адрес доставки","<textarea id='address' rows='4'","300'></textarea>"],["Комментарий","<textarea id='comment' rows='4'","300' placeholder='Необязательное поле'></textarea>"]].reduce((sum,ar)=> `${sum}<div class='col-sm-6 p-4 shadow-sm'><h6 class='alert alert-info'>${ar[0]}</h6>${ar[1]} class='form-control' maxlength='${ar[2]}</div>`,"<div class='row'>")+'</div>')
  contin.textContent = 'Заказать';
  if('onkeyup' in window){ tel.onfocus = checkTel; tel.onblur =()=>{ if(tel.value == '+7(') tel.value = '' } }
  contin.onclick =()=>{
    let arr = [nam.value,tel.value,address.value];
    if(arr.includes('')){
      let div = document.createElement('div');
      div.innerHTML = "<h3 class='position-absolute alert alert-danger unfold duration-500' style='z-index:1'>Заполните все поля !</h3>";
      contin.before(div);
      setTimeout(()=>{
        div.children[0].classList.remove('unfold'); div.children[0].classList.add('fold')
      },1500);
      setTimeout(()=> div.remove(),2000); return
    }
    F.btn(contin);
    let mes = carts.reduce((str,ar,i)=> str+`${i+1}. ${ar[1]} ${ar[0]}шт ${ar[2]}р\n`,'')+'Адрес: '+arr[2];
    if(comment.value) mes += '\nКомментарий: '+comment.value;
    let apiResult = jivo_api.sendOfflineMessage({
      "name": arr[0],
      "phone": arr[1],
      "description": main.getElementsByTagName('tfoot')[0].textContent,
      "message": mes
    });
    if(apiResult.result !== 'ok') return alert('Заказ не обработан.\nСвяжитесь с администрацией сайта.');
    cartDel(); main.insertAdjacentHTML('beforeEnd',"<h3 class='mt-5 alert alert-info text-center unfold duration-1500'>Заказ принят.<br><br><br><br>В случае необходимости менеджер свяжется с Вами.</h3>")
  }
};
