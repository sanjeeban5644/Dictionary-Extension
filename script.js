const button = document.querySelector('.button');

button.addEventListener('click',(e)=>{
    e.preventDefault();
    const word = document.querySelector('.input').value;
    search(word);
})

async function search(word){
    const response = await fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${word}?key=29cf3e5d-82fa-40ac-84bc-b7a4366e9423`);
    if(!response.ok){
        throw new Error('Network error');
    }
    const data = await response.json();
    console.log(data[0]?.shortdef);
    console.log(data[0]);
    const meaning = document.querySelector('.meaning');
    //meaning.innerHTML=(`<h3> ${data[0].shortdef} </h3>`);
    if (data && data.length > 0 && data[0].shortdef) {
        meaning.innerHTML = `<h3> ${data[0].shortdef}</h3>`;
    } else {
        meaning.innerHTML = "<h3>Meaning not found</h3>";
    }
    

    const synonymsArray = data[0]?.meta?.syns;
    
    let selectedSynonyms = [];

    if(synonymsArray && synonymsArray.length>0){
        const totalSynonyms = Math.min(synonymsArray[0].length,4);
        selectedSynonyms = synonymsArray[0].slice(0,totalSynonyms);

        let synonymList = 'Synonyms are: ';
        let index = 0;
        selectedSynonyms.forEach((synonym,index)=>{
            
            if (index == totalSynonyms-1) {
                synonymList += `<span>&nbsp;${synonym}.</span>`;
            } else {
                synonymList += `<span>&nbsp;${synonym},</span>`;
            }
            index+=1;
        })

        const synonymListFinal = document.querySelector('.synonymList');
        synonymListFinal.innerHTML = synonymList;

    }else{
        synonymList += `<h4>No synonyms available</h4>`;
    }

    
}

