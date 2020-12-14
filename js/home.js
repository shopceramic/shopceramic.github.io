window.addEventListener('load',()=>{

// for(let div of document.querySelectorAll('main>div')){
let big = [["https://sun9-56.userapi.com/c855416/v855416587/1a42e3/D_oRZoAtiqU.jpg","https://sun9-27.userapi.com/c858436/v858436587/124834/PjLL16FGf1A.jpg","https://sun9-17.userapi.com/c858436/v858436587/12483d/w7dvvC5-fFw.jpg"],["https://sun9-19.userapi.com/c858436/v858436587/124846/wxxqTCTEZvA.jpg","https://sun9-57.userapi.com/c858436/v858436587/124859/WqH23-7GyJA.jpg"],["https://sun9-16.userapi.com/c858436/v858436587/124862/9DJipOCpsi4.jpg","https://sun9-14.userapi.com/c858436/v858436587/12487d/SiUrUtqZ568.jpg"],["https://sun9-47.userapi.com/c858436/v858436587/12489a/0fJS94rO-XQ.jpg","https://sun9-69.userapi.com/c858436/v858436587/1248a3/NFOzk1ipltU.jpg"]],
min = [["https://sun9-54.userapi.com/c858436/v858436587/1248b2/UvFI2jSBZTk.jpg","https://sun9-38.userapi.com/c858436/v858436587/1248c2/KQIXHNEf_w8.jpg","https://sun9-38.userapi.com/c858436/v858436587/1248c9/Y5vRVVALXn4.jpg"],["https://sun9-7.userapi.com/c858436/v858436587/1248d0/4idzyaGIJJw.jpg","https://sun9-71.userapi.com/c858436/v858436587/1248d7/U_77LW62NiA.jpg"],["https://sun9-45.userapi.com/c858436/v858436587/1248de/cDPYf10AWEA.jpg","https://sun9-72.userapi.com/c858436/v858436587/1248e5/V3XlUBHFgnM.jpg"],["https://sun9-8.userapi.com/c858436/v858436587/1248f6/k_HfKfUQPKg.jpg","https://sun9-16.userapi.com/c858436/v858436587/1248fd/PlcFno9aYNk.jpg"]];
for(let i = 0; i < 4; i++){
  let div = document.querySelectorAll('main>div')[i],
  img = div.getElementsByTagName('img'),
  len = big[i].length, n = 0,
  fun =(num)=>{
    div.classList.add('fadeOut'); main.classList.add('op-7');
    img[2+n].classList.add('op-7'); n = num();
    setTimeout(()=>{
      div.style.backgroundImage = `url(${big[i][n]})`; div.classList.add('fadeIn');
      img[2+n].classList.remove('op-7'); div.classList.remove('fadeOut');
    },900)
    setTimeout(()=> main.classList.remove('op-7'),1600)
  };
  div.getElementsByTagName('td')[3].innerHTML = min[i].reduce((str,el)=> str+`<img class='m-1 img-thumbnail h-2 op-7' src='${el}'/>`,'');
  img[2].classList.remove('op-7');
  img[1].onclick =()=> fun(()=>(n+1<len) ? n+1 : 0);
  img[0].onclick =()=> fun(()=>(n>0) ? n-1 : len-1);
  // div.getElementsByTagName('img')[0].onclick =()=> alert(1)
  // div.getElementsByTagName('img')[1].onclick =()=> alert(2)
  // div.getElementsByTagName('td')[3].innerHTML = min[i].reduce((str,el)=> str+`<img class='m-1 btn-sm btn-light h-2 op-8' src='${el}'/>`,'')
  // img[2].classList.add('active')
  // img[2].classList.add('btn-sm','btn-warning')
    // for(let i=2; i < len+2; i++){ if(!img[i].matches('op-7')) img[i].classList.add('op-7') }
}

})