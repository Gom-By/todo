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

const infosChange = () => {
    if (li.length <1) {
        infos.innerHTML = "<p>Enter something to do</p>"
    }
    else {
        infos.innerHTML = "<p>You have some task !</p>"
    }
}

let todos = []

window.onload = () => {
    const inStore = localStorage.getItem("TODO")
    if (inStore) {
        const inStoreJson = JSON.parse(inStore)
        inStoreJson.forEach(element => {
            todos.push(element)
            const newLiStore = document.createElement("li");
            newLiStore.className = element.checked;
            newLiStore.innerHTML = `${element.value}`;
            ul.appendChild(newLiStore)
        })
        isChecked(li)
    }
    infosChange()
}

const store = () => {
    localStorage.setItem("TODO", JSON.stringify(todos))
}

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

        const todo = {
            "id": id,
            "value": text_input.value,
            "checked": newLi.className,
        }
        todos.push(todo);
        store()
    }
    id += 1
    text_input.value = "";
    infosChange()
}

const clearAll = () => {
    const allLi = document.querySelectorAll("li");
    allLi.forEach(element => {
        ul.removeChild(element);
    });
    localStorage.removeItem("TODO");
    todos = []
    id = 0
    infosChange()
}
