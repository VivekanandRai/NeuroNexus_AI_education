// Function to load quiz history from localStorage
function loadQuizHistory() {
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = ""; // Clear existing content

    let quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];

    if (quizHistory.length === 0) {
        historyList.innerHTML = "<p>No quizzes attempted yet.</p>";
        return;
    }

    quizHistory.forEach((quiz, index) => {
        let quizEntry = document.createElement("div");
        quizEntry.classList.add("quiz-entry");
        quizEntry.innerHTML = `
            <p><strong>Quiz ${index + 1}</strong></p>
            <p>Score: ${quiz.score} / ${quiz.total}</p>
            <p>Date: ${new Date(quiz.timestamp).toLocaleString()}</p>
        `;
        historyList.appendChild(quizEntry);
    });
}

// Function to clear history
document.getElementById("clear-history").addEventListener("click", () => {
    localStorage.removeItem("quizHistory");
    loadQuizHistory(); // Refresh list
});

// Load quiz history on page load
window.onload = loadQuizHistory;
