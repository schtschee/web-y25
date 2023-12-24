let paths = document.location.pathname.split('/')
let page = paths[paths.length - 1];
let curNav = document.getElementById('to_two_days');
let start = new Date(2023, 11, 31, 0, 0, 0, 0);
let end = new Date(2024, 0, 1, 0, 0, 0, 0);
if (page === "index.html") {
    $(function () { //самовыполняющаяся функция для настройки календарика для ввода периода и селекта категорий.
        $('input[id="due_date"]').daterangepicker({
            singleDatePicker: true,
            timePicker: true,
            timePicker24Hour: true,
            drops: "auto",
            locale: {
                format: "DD.MM.YYYY HH:mm"
            }
        });
        $('#category').select2({
            width: "element",
            placeholder: "Выберите категорию"
        })
    });
    end.setDate(end.getDate() + 1);
    tableFromLocalStorage(start, end, [], [true, true, true, true, true], "table-display");
} else if (page === "today.html") {
    $(function () { //самовыполняющаяся функция для настройки календарика для ввода периода и селекта категорий.
        $('input[id="due_date"]').daterangepicker({
            singleDatePicker: true,
            timePicker: true,
            timePicker24Hour: true,
            drops: "auto",
            locale: {
                format: "DD.MM.YYYY HH:mm"
            }
        });
        $('#category').select2({
            width: "element",
            placeholder: "Выберите категорию"
        })
    });
    curNav = document.getElementById('to_day');
    tableFromLocalStorage(start, end,
        [], [true, true, true, true, true], "table-display");
} else if (page === "week.html") {
    $(function () { //самовыполняющаяся функция для настройки календарика для ввода периода и селекта категорий.
        $('input[id="due_date"]').daterangepicker({
            singleDatePicker: true,
            timePicker: true,
            timePicker24Hour: true,
            drops: "auto",
            locale: {
                format: "DD.MM.YYYY HH:mm"
            }
        });
        $('#category').select2({
            width: "element",
            placeholder: "Выберите категорию"
        })
    });
    curNav = document.getElementById('to_week');
    let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let daysRu = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
    for (let i = 0; i < 7; i++) {
        start.setDate(start.getDate() + 1);
        end.setDate(end.getDate() + 1);
        let index = start.getDay();
        tableFromLocalStorage(start, end, [], [true, false, false, false, true], days[index], false);
        let day = start.getDate();
        if (day < 10) {
            day = "0" + day.toString();
        }
        let month = start.getMonth() + 1;
        if (month < 10) {
            month = "0" + month.toString();
        }
        document.getElementById(days[index]).children[0].innerHTML =
            "<tr><th>" + daysRu[index] + "</th><th>" + day + "." + month + "</th></tr>";
    }

} else if (page === "custom.html") {
    $(function () { //самовыполняющаяся функция для настройки календарика для ввода периода и селекта категорий.
        $('input[id="dates"]').daterangepicker({
            timePicker: true,
            timePicker24Hour: true,
            startDate: "31.12.2023 00:00",
            endDate: "02.01.2024 00:00",
            drops: "auto",
            locale: {
                format: "DD.MM.YYYY HH:mm"
            }
        });
        $('#categoryFilter').select2({
            width: "element",
            placeholder: "Выберите категории"
        })
    });
    curNav = document.getElementById('to_custom');
    printTable();
}
curNav.classList.add("current-mode")

function parseDate(s) {
    if (s === "" || s === null)
        return null;
    let months = {
        "Jan": 0,
        "Feb": 1,
        "Mar": 2,
        "Apr": 3,
        "May": 4,
        "Jun": 5,
        "Jul": 6,
        "Aug": 7,
        "Sep": 8,
        "Oct": 9,
        "Nov": 10,
        "Dec": 11
    }
    let b = s.split(" ");
    let t = b[4].split(":");
    return new Date(b[3], months[b[1]], b[2], t[0], t[1], t[2]);
}

function createTable() {
    let startDate = $('#dates').data('daterangepicker').startDate._d; //вытаскиваем из daterangepicker начальную и конечные даты периода в формате Date
    let endDate = $('#dates').data('daterangepicker').endDate._d;
    localStorage.setItem("start_date", startDate);
    localStorage.setItem("end_date", endDate);
    localStorage.setItem("header0", document.getElementById("checkbox_name").checked);
    localStorage.setItem("header1", document.getElementById("checkbox_description").checked);
    localStorage.setItem("header2", document.getElementById("checkbox_category").checked);
    localStorage.setItem("header3", document.getElementById("checkbox_deadline").checked);
    localStorage.setItem("header4", document.getElementById("checkbox_status").checked);
    let filter = document.getElementById("categoryFilter");
    let categories = [];
    for (const option of filter.options) {
        if (option.selected) {
            categories.push(option.text);
        }
    }
    localStorage.setItem("categoryFilter", JSON.stringify(categories));
    printTable();
    return false;
}

function printTable() {
    document.getElementById("table-display").innerHTML = "";
    let start = parseDate(localStorage.getItem("start_date"))
    if (start === null)
        start = new Date(2023, 11, 31, 9, 0, 0);

    let end = parseDate(localStorage.getItem("end_date"))
    if (end === null)
        end = new Date(2024, 0, 8, 0, 0, 0);

    let categories = JSON.parse(localStorage.getItem("categoryFilter"));
    if(categories === null){
        categories = [];
    }

    let elementId = "table-display";
    let chosenHeaders = [false, false, false, false, false];
    for (let i = 0; i < chosenHeaders.length; i++) {
        if (localStorage.getItem("header" + i) === "true" || localStorage.getItem("header" + i) === null) {
            chosenHeaders[i] = true;
        }
    }
    tableFromLocalStorage(start, end, categories, chosenHeaders, elementId);
    return false;
}

function tableFromLocalStorage(start, end, categories, chosenHeaders, elementId, addDateFlag = true) {
    document.getElementById(elementId).innerHTML = "";

    let headers = ["Задача", "Подробности", "Категория", "Дедлайн", "Статус"];

    let tasks = JSON.parse(localStorage.getItem("tasks")).sort(function(a, b) { return new Date(a[3]) - new Date(b[3]); });

    let htmlHeader = "<thead><tr>";
    for (let i = 0; i < headers.length; i++) {
        if (chosenHeaders[i]) {
            htmlHeader += "<th>" + headers[i] + "</th>";
        }
    }
    htmlHeader += "<tr></thead>";

    let last = null;
    let htmlBody = "<tbody>";
    for (let i = 0; i < tasks.length; i++) {
        let row = tasks[i];
        let deadline = new Date(row[3])
        if (deadline >= start && deadline <= end) {
            if (categories.length === 0 || categories.includes(row[2])) {
                if (addDateFlag && (last === null || deadline.getDate() !== last.getDate())) {
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

    document.getElementById(elementId).innerHTML += htmlHeader + htmlBody;
    return false;
}

function addNewTask(){
    let dueDate = $('#due_date').data('daterangepicker').startDate._d; //вытаскиваем из daterangepicker дедлайн в формате Date
    let task = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let category = $('#category').find(':selected').text();

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.push([task, description, category, dueDate, "В планах"])
    localStorage.setItem("tasks", JSON.stringify(tasks));
    alert("Ваша задача добавлена в LocalStorage, поздравляю👍");
}
