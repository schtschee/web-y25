printTable();

function parseDate(s) {
    if(s === "" || s === null)
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

    let tasks = JSON.parse(localStorage.getItem("tasks"))

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
        let deadline = new Date(row[3])
        if(deadline >= start && deadline <= end ) {
            if(filter === "Все задачи" || row[2] === filter) {
                if (last === null || deadline.getDate() !== last.getDate()) {
                    let day = deadline.getDate();
                    if (day < 10) {
                        day = "0" + day.toString();
                    }
                    let month = deadline.getMonth() + 1;
                    if (month < 10) {
                        month = "0" + month.toString();
                    }
                    htmlBody += "<tr><td colSpan='5' class='tasks-date'>" + day + "." + month + "</td></tr>"
                    last = deadline
                }
                htmlBody += "<tr>";
                for (let j = 0; j < headers.length; j++) {
                    if (chosenHeaders[j]) {
                        if (j === 3) {
                            let deadline = new Date(row[j])
                            let mins = deadline.getMinutes();
                            if (mins < 10) {
                                mins = "0" + mins.toString();
                            }
                            htmlBody += "<td>" + deadline.getHours() + ":" + mins + "</td>";
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
    return false;
}
