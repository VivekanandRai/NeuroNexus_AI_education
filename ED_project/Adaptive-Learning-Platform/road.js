document.addEventListener("DOMContentLoaded", loadTimetable);

function addEntry() {
    let subject = document.getElementById("subject").value;
    let startTime = document.getElementById("start-time").value;
    let endTime = document.getElementById("end-time").value;

    if (!subject || !startTime || !endTime) {
        alert("Please fill all fields!");
        return;
    }

    let table = document.querySelector("#timetable tbody");
    
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${subject}</td>
        <td>${startTime}</td>
        <td>${endTime}</td>
        <td><button class="delete-btn" onclick="deleteEntry(this)">Delete</button></td>
    `;

    table.appendChild(row);
    saveTimetable();
}

function deleteEntry(button) {
    button.parentElement.parentElement.remove();
    saveTimetable();
}

function saveTimetable() {
    let timetable = [];
    document.querySelectorAll("#timetable tbody tr").forEach(row => {
        let cols = row.children;
        timetable.push({
            subject: cols[0].innerText,
            startTime: cols[1].innerText,
            endTime: cols[2].innerText
        });
    });
    localStorage.setItem("timetable", JSON.stringify(timetable));
}

function loadTimetable() {
    let savedTimetable = localStorage.getItem("timetable");
    if (!savedTimetable) return;

    let table = document.querySelector("#timetable tbody");
    JSON.parse(savedTimetable).forEach(entry => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${entry.subject}</td>
            <td>${entry.startTime}</td>
            <td>${entry.endTime}</td>
            <td><button class="delete-btn" onclick="deleteEntry(this)">Delete</button></td>
        `;
        table.appendChild(row);
    });
}
