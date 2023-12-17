printTable();

function parseDate(s) {
    if(s==="")
        return null;
    let b = s.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
}

function createTable() {
    localStorage.setItem("start_date", document.getElementById("start_date").value);
    localStorage.setItem("end_date", document.getElementById("end_date").value);
    localStorage.setItem("header0", document.getElementById("checkbox_name").checked);
    localStorage.setItem("header1", document.getElementById("checkbox_description").checked);
    localStorage.setItem("header2", document.getElementById("checkbox_category").checked);
    localStorage.setItem("header3", document.getElementById("checkbox_deadline").checked);
    localStorage.setItem("header4", document.getElementById("checkbox_status").checked);
    let filter = document.getElementById("categoryFilter");
    localStorage.setItem("categoryFilter", filter.options[filter.selectedIndex].text);
    printTable();
    return false;
}

function printTable(){
    document.getElementById("table-display").innerHTML = "";

    let headers = ["Задача", "Подробности", "Категория", "Дедлайн", "Статус"]

    let tasks = [["Зарядка", "", "На спорте", new Date(2023, 11, 31, 9, 0, 0), "Отменено"],
        ["Написать эссе", "Дз по английскому", "Учеба", new Date(2023, 11, 31, 13, 59, 0), "В процессе"],
        ["Встреча с друзьями", "Ужин в маке", "Соц контакты", new Date(2023, 11, 31, 18, 0, 0), "В планах"],
        ["Зарядка", "", "На спорте", new Date(2024, 0, 1, 9, 0, 0), "В планах"],
        ["Лаба графика", "Разобраться c ImageView.getHistogram", "Учеба", new Date(2024, 0, 1, 17, 59, 0), "В планах"],
        ["Купить продукты", "Молоко хлеб сосиски", "Дом", new Date(2024, 0, 1, 23, 59, 0), "В планах"],
        ["Отоспаться", "", "Дом", new Date(2024, 0, 3, 14, 0, 0), "В планах"],
        ["Театр", "", "Соц контакты", new Date(2024, 0, 5, 11, 0, 0), "В планах"],
        ["В гости к бабушке", "Чур я за рулем", "Соц контакты", new Date(2024, 0, 5, 18, 30, 0), "В планах"],
        ["Зарядка", "", "На спорте", new Date(2024, 0, 6, 9, 0, 0), "В планах"],
        ["Экзамен физра", "Надо подкачаться", "Учеба", new Date(2024, 0, 7, 10, 0, 0), "Отменено"]]

    let start = parseDate(localStorage.getItem("start_date"))
    if(start === null)
        start = new Date(2023, 11, 31, 9, 0, 0);

    let end = parseDate(localStorage.getItem("end_date"))
    if(end === null)
        end = new Date(2024, 0, 8, 0, 0, 0);

    let filter = localStorage.getItem("categoryFilter");
    if(filter === null)
        filter = "Все задачи";

    let chosenHeaders = [false, false, false, false, false];
    let htmlHeader = "<thead><tr>";
    for(let i = 0; i<headers.length; i++) {
        if (localStorage.getItem("header" + i) === "true" || localStorage.getItem("header" + i) === null) {
            htmlHeader += "<th>" + headers[i] + "</th>"
            chosenHeaders[i] = true;
        }
    }
    htmlHeader += "<tr></thead>";

    let last = null;
    let htmlBody = "<tbody>";
    for (let i = 0; i < tasks.length; i++) {
        let row = tasks[i];
        if(row[3] >= start && row[3] <= end ) {
            if(filter === "Все задачи" || row[2] === filter) {
                if (last === null || row[3].getDate() !== last.getDate()) {
                    let day = row[3].getDate();
                    if (day < 10) {
                        day = "0" + day.toString();
                    }
                    let month = row[3].getMonth() + 1;
                    if (month < 10) {
                        month = "0" + month.toString();
                    }
                    htmlBody += "<tr><td colSpan='5' class='tasks-date'>" + day + "." + month + "</td></tr>"
                    last = row[3]
                }
                htmlBody += "<tr>";
                for (let j = 0; j < headers.length; j++) {
                    if (chosenHeaders[j]) {
                        if (j === 3) {
                            htmlBody += "<td>" + row[j].getHours() + ":" + row[j].getMinutes() + "</td>";
                        } else {
                            htmlBody += "<td>" + row[j] + "</td>";
                        }
                    }
                }
                htmlBody += "</tr>";
            }
        }
    }
    htmlBody += "</tbody>";

    document.getElementById("table-display").innerHTML += htmlHeader + htmlBody;
}
