const li = document.getElementsByClassName("item");
const text_input = document.getElementById("input_text")
const ul = document.getElementById("list")
const infos = document.getElementById("infos")

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
                console.log(element.checked);
            })
            ul.appendChild(newLiStore)
        })
    }
    else {
        console.log("local storage is empty.");
    }
    infosChange()
}

let id=0
const add = () => {
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
        
        // chercher les valeurs dans le local storage
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
                    console.log(element.checked);
                })
                ul.appendChild(newLiStore)
            })
        }
        else {
            console.log("le nouveau todo n'a pas put s'enregistrer");
        }
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
