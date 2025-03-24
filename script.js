
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


const neighboringFlags = document.getElementById('neighboring-flags');
country_info = document.getElementById('country-info')

// lets handle our api call and making sure we fetch all the dat we need to succesfully and safely without interrupting rendering of our html page 
 

  // Add event listener for the 'click' event on the button
  document.getElementById('submitBtn').addEventListener('click', function() {
    const userin = document.getElementById('input').value; // Get the input value
  //  console.log(userin); // Log the value to the console
    getData(userin) // Pass the input value to the getData function
   
  
  }
);


  
const getData = async (userin) => {
try {
//    console.log('https://restcountries.com/v3.1/name/'+userin );
if (userin === "" || userin.length<4){
    alert("cant be empty and enetr a valid country")
    return 0
}
     const res = await fetch('https://restcountries.com/v3.1/all' ) // assumption here is that it found it
   if (!res.ok){
    throw new Error("country couldnt be found, enter a country")
   }

   const data = await res.json()
   const country = data.find(count=>count['name']['common'].toLowerCase()===userin.toLowerCase())
   console.log(country);
   if(country === undefined){
    alert('country couldnt be fopund')
   return 0;
   }
 const template = {
    Capital: country["capital"][0],
Population: country["population"],
Region:country['region'],
Flag: country['flags']['png'],
"Bordering Countires": country['borders'] || []
}
    console.log(template);
    updatecount(template)
    neigh(template["Bordering Countires"]);


   //  console.log(all_country)
  //  const country = data.find((count)=>{count['name']['common'] ===userin });
  
} catch (error) {
  console.log(error)
}
  
 }
///// function 
const updatecount = (template)=>{
    country_info.innerHTML = `
    <h2>- Capital: ${template.Capital}<h2/>
    <h2>- Population: ${template.Population}<h2/>
    <h2>- Region: ${template.Region}<h2/>
    <p>FLAG:  <img src="${template.Flag}" alt="s flag" width="200" height="100"/><p/>
   
    `;
}
/////function

const neigh = async (borders) => {
    neighboringFlags.innerHTML = '';

    if (borders.length===0){
        neighboringFlags.innerHTML = '<p>No neighbous for this cuntry :(<p/>'
        return;
    }
    neighboringFlags.innerHTML = '<p><b>NEIGHBOURING COUNTRIES<b/><p/> '
    for (const border of borders){
        try{
            console.log(border)
            const res =  await fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            if (!res.ok){
                throw new Error('neighbouring country isnt found, check if array items are processed properlly')
            }
            const data = await res.json();

            // extract the flags lets goo

            const urlforflag = data[0]['flags']['png']
            neighboringFlags.innerHTML = neighboringFlags.innerHTML + `<img src="${urlforflag}" width = "200" height = "200"/> <br/>`
            
        }
        catch(error){
            console.error('couldnt fetch falgs for some reason uknown to god')
        }
    }
}






