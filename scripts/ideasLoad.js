window.onload = async (event) => {
    let index = timerStart % 40;
    for (let i = 1; i <= 5; i++) {
        try {
            let response = await fetch("https://jsonplaceholder.typicode.com/todos/" + (i + index));
            let json = await response.json();
            let translator = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=la&tl=ru&dt=t&q="
                + encodeURI(json["title"]));
            let text = await translator.json();
            let translatedText = await text[0][0][0]
            await new Promise(resolve => setTimeout(resolve, 2000));
            await (i === 5) ? addLastTask(translatedText) : addTask(translatedText);
        } catch (error) {
            sthBadHappened()
            break;
        }
    }
};

function addLastTask(text) {
    addTask(text);
    hideLoader();
}

function addTask(text) {
    let ch = document.getElementById("ideas-display").children[1].lastElementChild;
    ch.insertAdjacentHTML("beforebegin", "<tr><td>" + text + "</td></tr>");
}

function sthBadHappened(){
    let ch = document.getElementById("ideas-display").children[1].lastElementChild;
    ch.insertAdjacentHTML("afterend", "<tr><td>(Мысли не придумались, извините)</td></tr>");
    document.getElementById("ideas-display").children[1].lastElementChild.classList.add("error");
    hideLoader();
}

function hideLoader(){
    let loader = document.getElementsByClassName("loader").item(0);
    loader.parentElement.parentElement.classList.add("hidden");
}
