window.onload = (event) => {
    let loadTime = (Date.now() - timerStart)/1000;
    document.getElementsByTagName("footer").item(0).innerHTML += "<p>Время загрузки страницы " + loadTime + " сек</p>";
};