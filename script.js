
// fetch("https://restcountries.com/")
// .then((response)=>{
// console.log(response.json()) ;
// })
// .then(data=>{
//     console.log(data)
// })
// .catch((error)=>{
//     console.log(error)
// })

let template = {
    Capital: "",
Population: "",
Region:"",
Flag: "",
"Bordering Countires": {}
}
let country_info = document.getElementById('country-info')
let userin = document.getElementById('input').value;
let country = {};
function handleClick(){
    
    fetch('https://restcountries.com/v3.1/all' )
  .then((response) => {
    if (response.ok == false) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    for (let i=0; i<data.length; i++){
        if(data[i]["name"]['common'].toLowerCase()===String(userin).toLowerCase()){
             return data[i];
          //  console.log(data[i])
        }
    }
    
  })
  .catch((error) => {
    console.error('Fetch error:', error);
  });

//   for (let i=0; i<Object.getOwnPropertyNames(country).length; i++){
//     console.log(i)
// }
}
function buildpage(){
    const country =  handleClick();
    console.log(handleClick());
}
buildpage()






