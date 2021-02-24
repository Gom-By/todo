// ne pas supprimer
const li = document.getElementsByClassName("item");
const text_input = document.getElementById("input_text")
const ul = document.getElementById("list")
const infos = document.getElementById("infos")

let todos = []
let id=0

// change les infos
const infosChange = () => {
    if (li.length <1) {
        infos.innerHTML = "<p>Enter something to do</p>"
    }
    else {
        infos.innerHTML = "<p>You have some task !</p>"
    }
}


// cherche un element a l'id spécifique dans le local storage
const searchInStorage = (indexOfElement, className = "item") => {
    const inStore = localStorage.getItem("TODO")
    const inStoreJson = JSON.parse(inStore)
    delete inStoreJson[indexOfElement].checked
    inStoreJson[indexOfElement].checked = className
    return inStoreJson[indexOfElement]
}

// récupére les élèments du local storage les ajoute a todos []
// et les affiches dans le dom
const storeToDom = (onOnload) => {
    const inStore = localStorage.getItem("TODO")
    if (inStore) {
        const inStoreJson = JSON.parse(inStore)
        inStoreJson.forEach(element => {
            const newLiStore = document.createElement("li");
            newLiStore.className = element.checked;
            newLiStore.id = element.id;
            newLiStore.innerHTML = `${element.value}`;
            newLiStore.addEventListener("click", () => {
                if (newLiStore.className == "item") {
                    newLiStore.className = "item checked"
                }
                else {
                    newLiStore.className = "item"
                }

                let index = newLiStore.id
                inStoreJson[index].checked = newLiStore.className
                const newInStore = searchInStorage(index, inStoreJson[index].checked)
                todos.splice(newInStore.id, 1, newInStore)
                localStorage.setItem("TODO", JSON.stringify(todos))

            })
            ul.appendChild(newLiStore)
        })
    }
    else {
        console.log("local storage is empty.");
    }
    infosChange()
}

// ajoute un todo dans le local storage et dans todos
const add = () => {
    // check si le nouveau todo à une valeur
    if (!text_input.value) {
        text_input.placeholder = "Rentrer une valeur";
        text_input.style.backgroundColor = "rgba(255, 20, 0, 0.207)";
    }
    else {
        text_input.style.backgroundColor = "white";

        // création du todo dans le local storage
        const todo = {
            "id": id,
            "value": text_input.value,
            "checked": "item",
        }
        todos.push(todo);
        localStorage.setItem("TODO", JSON.stringify(todos))
        
        // changement du DOM par rapport au local storage
        // suppression du DOM
        const allLi = document.querySelectorAll("li");
        allLi.forEach(element => {
            ul.removeChild(element);
        });

        // chercher les valeurs dans le local storage et afficher
        storeToDom()
    }
    id += 1
    text_input.value = "";
    infosChange()
}

// supprime le local storage et todos [] et le DOM
const clearAll = () => {
    // DOM
    const allLi = document.querySelectorAll("li");
    allLi.forEach(element => {
        ul.removeChild(element);
    });
    // local storage 
    localStorage.removeItem("TODO");
    // todos
    todos = []
    id = 0
    infosChange()
}

// a l'ouverture : doit prendre les elements du storage et les afficher
// y ajouter en même temps l'eventListener et l'ajouter à todos []
window.onload = () => {
    storeToDom()
    const inStoreJson = JSON.parse(localStorage.getItem("TODO"))
    inStoreJson.forEach(element => {
        todos.push(element)
        id += 1
    })
    localStorage.setItem("TODO", JSON.stringify(todos))
}