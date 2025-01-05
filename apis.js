let url = "http://universities.hipolabs.com/search?name=";
let country = 'nepal';
let btn = document.querySelector('button');
btn.addEventListener('click',async () =>{
  country = document.querySelector('input').value;
  console.log(country);

  let colleges = await getColleges(country);
  console.log(colleges);
  show(colleges);
});

async function getColleges(country){
  try{
    let res = await axios.get(url+country);
    //console.log(res.data);
    return res.data;
  }catch(e){
    console.log('error-',e);
    return [];
  }
}
function show(collArr){
  let ol= document.createElement('ol');
  ol.innerHTML = country;
  let box = document.querySelector('.box');
  box.appendChild(ol);
  for(col of collArr){
    console.log(col.name);
    let li = document.createElement('li');
    li.innerText = col.name;
    ol.appendChild(li);
  }
}
