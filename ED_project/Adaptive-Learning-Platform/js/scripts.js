document.addEventListener("DOMContentLoaded", function () {
    // Simulated AI Learning Path Data
    let aiLearningPaths = [
        "Complete your Math Quiz to unlock new content!",
        "Your next lesson in Science: Newton's Laws",
        "You have a practice test pending in Coding!"
    ];

    // Select a random AI suggestion
    document.getElementById("ai-learning-path").textContent = 
        aiLearningPaths[Math.floor(Math.random() * aiLearningPaths.length)];

    // Simulated Student Name (Replace with Backend Fetch)
    document.getElementById("studentName").textContent = "Alex";

    // Animate Progress Bar
    let progress = document.getElementById("learning-progress");
    let progressText = document.getElementById("progress-text");
    let progressValue = 45; // Example Progress
    progress.style.width = progressValue + "%";
    progressText.textContent = `Current Progress: ${progressValue}%`;
});

// Functions for Quick Actions
function startQuiz() {
    alert("Starting your AI Adaptive Quiz...");
    window.location.href = "quiz.html";
}

function viewProgress() {
    alert("Redirecting to your progress report...");
    window.location.href = "progress.html";
}

function askAITutor() {
    alert("AI Tutor is analyzing your queries...");
}













document.addEventListener("DOMContentLoaded", function () {
    // Simulated quiz questions
    let questions = [
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 3, hint: "It's known as the city of love!" },
        { question: "Solve: 2 + 2 × 2", options: ["4", "6", "8", "10"], answer: 2, hint: "Follow BODMAS rule." },
        { question: "Which is a prime number?", options: ["4", "6", "7", "9"], answer: 3, hint: "It has only two divisors: 1 and itself." }
    ];

    let currentQuestionIndex = 0;
    let timerElement = document.getElementById("timer");
    let feedbackElement = document.getElementById("feedback-text");
    let studySuggestionElement = document.getElementById("study-suggestion");

    function loadQuestion() {
        let questionObj = questions[currentQuestionIndex];
        document.getElementById("quiz-question").textContent = questionObj.question;
        document.querySelectorAll(".option-btn").forEach((btn, index) => {
            btn.textContent = questionObj.options[index];
        });
    }

    function selectOption(selected) {
        let correctAnswer = questions[currentQuestionIndex].answer;

        if (selected === correctAnswer) {
            feedbackElement.textContent = "✅ Correct! Well done.";
            studySuggestionElement.textContent = "";
        } else {
            feedbackElement.textContent = "❌ Incorrect. Try again!";
            studySuggestionElement.textContent = "Hint: " + questions[currentQuestionIndex].hint;
        }

        // Move to next question after a short delay
        setTimeout(() => {
            currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
            loadQuestion();
            feedbackElement.textContent = "Your answer analysis will appear here...";
            studySuggestionElement.textContent = "";
        }, 2000);
    }

    // Timer function
    let timeLeft = 30;
    function startTimer() {
        let timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                feedbackElement.textContent = "⏳ Time's up!";
            }
        }, 1000);
    }

    // Initialize Quiz
    loadQuestion();
    startTimer();

    // Expose function globally
    window.selectOption = selectOption;
});






document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Simulated progress data
    let progressData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        scores: [50, 65, 80, 90] // Simulated score progression
    };

    // 🔹 Weak areas detected by AI
    let weakAreas = [
        "Algebra - Need more practice",
        "Physics - Work on conceptual understanding",
        "Data Structures - Improve recursion skills"
    ];

    // 🔹 Display Weak Areas
    let weakTopicsList = document.getElementById("weak-topics");
    weakTopicsList.innerHTML = weakAreas.map(topic => `<li>${topic}</li>`).join("");

    // 🔹 Create Progress Chart
    let ctx = document.getElementById("progressChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: progressData.labels,
            datasets: [{
                label: "Performance Score",
                data: progressData.scores,
                backgroundColor: "rgba(0, 198, 255, 0.2)",
                borderColor: "#00c6ff",
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
});










document.addEventListener("DOMContentLoaded", function () {
    // 🔹 AI-Generated Study Material Suggestions
    let materials = [
        { topic: "Algebra", description: "Recommended Video Lecture & Practice Set.", link: "#" },
        { topic: "Physics", description: "Interactive Video & Notes.", link: "#" },
        { topic: "Data Structures", description: "Practice Sets & AI Quiz.", link: "#" }
    ];

    // 🔹 Live Search Functionality
    window.filterMaterials = function () {
        let searchQuery = document.getElementById("searchBar").value.toLowerCase();
        let materialCards = document.querySelectorAll(".material-card");

        materialCards.forEach(card => {
            let topic = card.getAttribute("data-topic").toLowerCase();
            card.style.display = topic.includes(searchQuery) ? "block" : "none";
        });
    };
});








// 🔹 AI Response Data (Simulated)
const aiResponses = {
    "what is machine learning?": "Machine Learning is a branch of AI that enables computers to learn from data without being explicitly programmed.",
    "explain neural networks": "Neural Networks are algorithms designed to recognize patterns, similar to the human brain's processing.",
    "how does AI work?": "AI works by analyzing data, learning from patterns, and making decisions or predictions based on the information."
};

// 🔹 Handle Sending User Message
function sendMessage() {
    let inputField = document.getElementById("userInput");
    let userMessage = inputField.value.trim().toLowerCase();

    if (userMessage === "") return;

    // 🔹 Add User Message to Chatbox
    let chatbox = document.getElementById("chatbox");
    chatbox.innerHTML += `<div class="user-message">${userMessage}</div>`;

    // 🔹 AI Response (Simulated)
    let botResponse = aiResponses[userMessage] || "I'm still learning! But you can check the Study Materials for detailed explanations.";
    chatbox.innerHTML += `<div class="bot-message">${botResponse}</div>`;

    // 🔹 Scroll to Latest Message
    chatbox.scrollTop = chatbox.scrollHeight;

    // 🔹 Clear Input Field
    inputField.value = "";
}

// 🔹 Voice Input (Speech-to-Text)
function startVoiceInput() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    
    recognition.onresult = function (event) {
        document.getElementById("userInput").value = event.results[0][0].transcript;
        sendMessage(); // Send recognized voice message
    };
    
    recognition.start();
}

// 🔹 AI Reads Answer (Text-to-Speech)
function speakResponse() {
    let chatbox = document.getElementById("chatbox");
    let messages = chatbox.getElementsByClassName("bot-message");
    if (messages.length > 0) {
        let lastResponse = messages[messages.length - 1].innerText;
        let speech = new SpeechSynthesisUtterance(lastResponse);
        speech.lang = "en-US";
        speech.rate = 1;
        window.speechSynthesis.speak(speech);
    }
}









// 🔹 Simulated AI Learning Path Suggestions
const learningPaths = [
    "Focus on Data Structures - Practice linked lists!",
    "Improve Algorithms - Solve graph problems!",
    "Enhance SQL skills - Work on database queries!",
];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("student-name").innerText = "John Doe"; // Simulated
    document.getElementById("learning-path").innerText = learningPaths[Math.floor(Math.random() * learningPaths.length)];

    // 🔹 AI Progress Insights
    setTimeout(() => {
        document.getElementById("analytics-report").innerText = "🔍 AI Insight: Your weak area is Graph Algorithms.";
    }, 2000);

    // 🔹 Update Profile
    document.getElementById("student-name-profile").innerText = "John Doe";
    document.getElementById("learning-style").innerText = "Prefers Video-Based Learning";
});

// 🔹 Simulated Actions
function startQuiz() {
    window.location.href = "quiz.html";
}

function viewProgress() {
    window.location.href = "progress.html";
}

function openTutor() {
    window.location.href = "tutor.html";
}

function editProfile() {
    alert("Profile editing feature coming soon!");
}












document.addEventListener("DOMContentLoaded", function () {
    // 🔹 Ensure Chart.js is loaded before running this
    if (typeof Chart === "undefined") {
        console.error("Chart.js is not loaded!");
        return;
    }

    // 🔹 Student Performance Data (Fake AI-generated Scores)
    const progressData = [75, 85, 60, 90, 70, 80, 95]; // Mock Scores
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // 🔹 Check if Canvas Exists
    let chartCanvas = document.getElementById("progressChart");
    if (!chartCanvas) {
        console.error("progressChart canvas is missing!");
        return;
    }

    // 🔹 Load the Chart
    let ctx = chartCanvas.getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Performance Score",
                data: progressData,
                borderColor: "#4caf50",
                backgroundColor: "rgba(76, 175, 80, 0.2)",
                borderWidth: 3,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        stepSize: 10
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: "white"
                    }
                }
            }
        }
    });
});





