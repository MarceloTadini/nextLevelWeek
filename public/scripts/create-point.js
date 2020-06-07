function populateUFs(){
    
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then(states => {


        for(const state of states){

        ufSelect.innerHTML += `<option value= "${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[ indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value> Selecione a cidade </option>"
    citySelect.disabled = true 

    fetch(url)
    .then( res => res.json())
    .then(cities => {

        for(const city of cities){

        citySelect.innerHTML += `<option value= "${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false
    })

}



document.querySelector("select[name=uf]")
    .addEventListener("change", getCities)

 //Itens de coleta
 
 const itemsToCollect = document.querySelectorAll(".items-grid li") //Pegando todos os Li's

 for(const item of itemsToCollect){
     item.addEventListener("click", handleSelectedItem)
 }

 const collectedItems = document.querySelector("input[name=items]")

 let selectedItems = []

 function handleSelectedItem(event){
    //Add ou remover classes no Js

    const itemLi = event.target
    
    itemLi.classList.toggle("selected") //Add ou remove
    
    const itemId = itemLi.dataset.id

    
    //Verificar se tem itens selecionados e retonar o valor

    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId 
        return itemFound
    })

    //Se estiver selecionado, desmarcar
    
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent 
        })

        selectedItems = filteredItems
    } 
    //Senão, add para a seleção
    else{
        selectedItems.push(itemId)
    }
    //Atualizar o campo esondido com os itens selecionados

    collectedItems.value = selectedItems
     
 }

