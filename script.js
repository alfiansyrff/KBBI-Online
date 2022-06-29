const getBtn = document.querySelector(".btn");
const resultContainer = document.querySelector(".result-container");
getBtn.addEventListener("click", async function() {
    try {
        const inputKata = document.querySelector(".input-keyword");
        const toFind = await getData(inputKata.value);
        getKata(toFind);
        
        // updateArti(toFind["arti"]);
    } catch (err) {
        alert('Tidak Ditemukan Kata Tersebut');
    }
})

function getData(kata) {
    return fetch("https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=" + kata)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json()
        })
};

function getKata(response) {
    let container = '';
    const arti = response["arti"];
    container += showKata(response["lema"]);
    if (arti.length > 1) {
        response["arti"].forEach(e => container += showArti(e));
    } else {
        container += showArti(response["arti"]);
    }
    resultContainer.innerHTML = container;    

};


function showKata(kata) {
    return `<div class="container-md">
    <div class="row kata-container text-justify">
        <h2>${kata}</h2>
    </div>
</div>`
};

function showArti(arti) {
    return ` <div class="container-md">
    <div class="row arti-container mx-5 text-justify text-secondary">
        <div class="col-md">
            <h5> - ${arti}<h5>
        </div>
    </div>
</div> ` 
};