let container = document.querySelector('.calendar-container');
let calendarW = container && container.querySelector('.calendar');
let monthName = [
    'Январь', 'Февраль', 'Март',
    'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь',
    'Октябрь', 'Ноябрь', 'Декабрь'
];
let notes = getNotes();

if (calendarW) {
    let calendarConfig = {
        title: '',
        cells: [],
    };

    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    let daysInMonth = monthDays(date);
    let currentDay = date.getDate();
    let beforeMonthDays = new Date(date.getFullYear(), month).getDay();
    let daysBeforeMoth = monthDays(new Date(date.getFullYear(), month - 1));

    beforeMonthDays = (beforeMonthDays ? beforeMonthDays : 7) - 1;
    calendarConfig.title = `${monthName[month]} ${year}`;

    for (let i = 0; i < beforeMonthDays; i++) {
        let day = daysBeforeMoth - i;
        let dayConfig = {
            day: day,
            date: new Date(year, month, 0 - i),
            current: currentDay === i,
        };
        dayConfig.notes = getNotesCell(dayConfig);
        calendarConfig.cells.unshift(dayConfig);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        let dayConfig = {
            day: i,
            current: currentDay === i,
            date: new Date(year, month, i),
        };
        dayConfig.notes = getNotesCell(dayConfig);
        calendarConfig.cells.push(dayConfig);
    }

    if (calendarConfig.cells.length % 7 !== 0) {
        let steps = 7 - calendarConfig.cells.length % 7;
        for (let i = 0; i < steps; i++) {
            let dayConfig = {
                day: i + 1,
                date: new Date(year, month + 1, i + 1),
                current: currentDay === i,
            };
            dayConfig.notes = getNotesCell(dayConfig);

            calendarConfig.cells.push(dayConfig);
        }
    }

    showTable(calendarConfig);
    console.log(calendarConfig);

    function showTable(config) {
        let table = document.createElement('table');
        addClass(table, 'table-calendar');

        let tr = document.createElement('tr');
        for (
            let counter = 0,
                length = config.cells.length;
            counter < length; counter++
        ) {
            let cell = config.cells[counter];
            if (counter % 7 === 0) {
                table.appendChild(tr);
                tr = document.createElement('tr');
            }

            let td = document.createElement('td');
            cell.current && addClass(td, 'current');
            td.innerHTML = getCellHtml(cell);

            tr.appendChild(td);
        }
        table.appendChild(tr);
        calendarW.appendChild(table);
    }

    function getCellHtml(cell) {
        let list = cell && cell.notes && cell.notes.reduce((a, b) => a += `<li></li>`, '');

        return `<div class="day">${cell.day}</div><ul class="notesContainer">${list || ''}</ul>`;
    }

    function monthDays(date) {
        let d = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return d.getDate();
    }

    function addClass(target, className) {
        target && className && target.classList.add(className);
    }

    function removeClass(target, className) {
        target && className && target.classList.remove(className);
    }

    function getNotesCell(cell) {
        return notes.filter((note) => {
            let date = note.date.split('-');
            let newDate = new Date(date[0], date[1] - 1, date[2]);
            return newDate.toString() === cell.date.toString();
        })

    }
}
