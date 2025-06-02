document.getElementById("addButton").addEventListener("click", function () {
    let inputField = document.getElementById("pairInput");
    let selectBox = document.getElementById("pairList");

    let inputValue = document.getElementById("pairInput").value.trim();

    if (inputValue === "") {
        document.getElementById("errorMessage").innerText = "Поле не може бути порожнім!";
        return;
    }

    let parts = inputValue.split("=");

    if (parts.length !== 2) {
        document.getElementById("errorMessage").innerText = "Неправильний формат! Використовуйте Name=Value.";
        return;
    }

    let name = parts[0].trim();
    let value = parts[1].trim();

    if (name === "" || value === "") {
        document.getElementById("errorMessage").innerText ="Ім'я та значення не можуть бути порожніми!";
        return;
    }
    let errorMessage = document.getElementById("errorMessage");
    errorMessage.innerText = "";

    let option = document.createElement("option");
    option.text = name + " = " + value;
    selectBox.add(option);

    inputField.value = "";
});

document.getElementById("sortByName").addEventListener("click", function () {
    sortList(0);
});

document.getElementById("sortByValue").addEventListener("click", function () {
    sortList(1);
});

document.getElementById("deleteButton").addEventListener("click", function () {
    let selectBox = document.getElementById("pairList");
    for (let i = selectBox.options.length - 1; i >= 0; i--) {
        if (selectBox.options[i].selected) {
            selectBox.options[i].remove();
        }
    }
});

function sortList(index) {
    let selectBox = document.getElementById("pairList");
    let items = [];

    for (let i = 0; i < selectBox.options.length; i++) {
        let text = selectBox.options[i].text.split("=");
        items.push({ name: text[0], value: text[1] });
    }

    items.sort(function (a, b) {
        if (index === 0) {
            return a.name > b.name ? 1 : -1;
        } else {
            return a.value > b.value ? 1 : -1;
        }
    });

    selectBox.innerHTML = "";
    items.forEach(item => {
        let option = document.createElement("option");
        option.text = item.name + " = " + item.value;
        selectBox.add(option);
    });
}

