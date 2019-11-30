let events;
let year = new Date().getFullYear();
let month = new Date().getMonth();

addEventListener('load', () => {
    let req = new XMLHttpRequest();
    req.addEventListener('load', () => {
        events = JSON.parse(req.responseText);
        showMonth();
    });
    req.open('GET', 'http://localhost/calendar/');
    req.send();

    document.getElementById('back').addEventListener('click', () => {
        month--;
        showMonth();
    });
    document.getElementById('next').addEventListener('click', () => {
        month++;
        showMonth();
    });
    document.getElementById('backToToday').addEventListener('click', () => {
        month = new Date().getMonth();
        showMonth();
    });
    document.getElementById('close').addEventListener('click', () => {
        document.getElementById('eventInfo').className = 'hidden';
    });
});

function showMonth() {    
    let months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
    let date = new Date(year, month, 1);
    let monthName = `${months[date.getMonth()]} ${date.getFullYear()}`;

    document.getElementById('monthName').textContent = monthName;
    document.title = `Calendar - ${monthName}`;

    let monthGrid = document.getElementById('month');
    
    while (monthGrid.firstChild) {
        monthGrid.removeChild(monthGrid.firstChild);
    }

    for (const weekday of ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']) {
        let header = document.createElement('div');

        header.textContent = weekday;
        header.classList.add('header');

        monthGrid.appendChild(header);
    }

    for (let i = new Date(year, month, 1).getDay() - 1; i >= 0; i--) {
        let day = document.createElement('div');

        day.classList.add('day', 'dayNotInMonth');
        day.textContent = new Date(year, month, 0).getDate() - i;

        monthGrid.appendChild(day);
    }

    let lastDayInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < lastDayInMonth; i++) {
        let day = document.createElement('div');

        day.classList.add('day', 'dayInMonth');
        day.textContent = i + 1;

        if (month === new Date().getMonth() && i + 1 === new Date().getDate()) {
            day.id = 'today';
        }

        monthGrid.appendChild(day);
    }

    for (let i = 0; i < 6 - new Date(year, month, lastDayInMonth).getDay(); i++) {
        let day = document.createElement('div');

        day.classList.add('day', 'dayNotInMonth');
        day.textContent = i + 1;

        monthGrid.appendChild(day);
    }

    showEvents();
}

function showEvents() {
    for (let event of events) {
        event = event[0];
        let dateOfEvent = new Date(event.startDate);
        let displayedDate = new Date(year, month, 1);

        if (dateOfEvent.getMonth() === displayedDate.getMonth() && dateOfEvent.getFullYear() == displayedDate.getFullYear()) {
            let eventDiv = document.createElement('div');

            eventDiv.classList.add('event');
            eventDiv.textContent = event.subject;

            eventDiv.addEventListener('click', () => {
                openEventInfo(event);
            });

            document.getElementsByClassName('dayInMonth')[dateOfEvent.getDate() - 1].appendChild(eventDiv);
        }
    }
}

function openEventInfo(event) {
    document.getElementById('subject').textContent = event.subject;
    document.getElementById('startDate').textContent = `Start Date: ${event.startDate}`;
    document.getElementById('startTime').textContent = `Start Time: ${event.startTime}`;
    document.getElementById('endDate').textContent = `End Date: ${event.endDate}`;
    document.getElementById('endTime').textContent = `End Time: ${event.endTime}`;
    document.getElementById('allDay').textContent = `All Day: ${event.allDay}`;
    document.getElementById('private').textContent = `Private: ${event.private}`;

    document.getElementById('eventInfo').className = '';
}