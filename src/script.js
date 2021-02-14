const li = document.getElementsByClassName("item");
const text_input = document.getElementById("input_text")
const ul = document.getElementById("list")
const infos = document.getElementById("infos")

const isChecked = (whichLi) => {
    for (let i= 0; i< whichLi.length; i++) {
        whichLi[i].addEventListener("click", () => {
            if (whichLi[i].className == "item checked") {
                whichLi[i].className = "item";
            }
            else {
                whichLi[i].className = "item checked";
            }
        })
    }
}
isChecked(li)

let id=0
const add = () => {
    if (!text_input.value) {
        text_input.placeholder = "Rentrer une valeur";
        text_input.style.backgroundColor = "rgba(255, 20, 0, 0.207)";
    }
    else {
        text_input.style.backgroundColor = "white";
        const newLi = document.createElement("li");
        newLi.className = "item";
        newLi.innerHTML = `${text_input.value}`;
        ul.appendChild(newLi)
        newLi.addEventListener("click", ()=>{
            if (newLi.className == "item checked") {
                newLi.className = "item";
            }
            else {
                newLi.className = "item checked";
            }
        })
    }
    text_input.value = "";
}

const delAll = () => {

}
