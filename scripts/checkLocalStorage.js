if (localStorage.getItem("tasks") === null){
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

    let j = JSON.stringify(tasks)
    localStorage.setItem("tasks", j)
}