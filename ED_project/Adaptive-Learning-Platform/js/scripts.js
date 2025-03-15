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
    const quizData = {
        "Class 10": {
            "Easy": [
                { question: "What is the SI unit of force?", options: ["Newton", "Joule", "Pascal", "Watt"], answer: 0 },
                { question: "Which gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 2 },
                { question: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Chennai", "Kolkata"], answer: 1 }
            ],
            "Medium": [
                { question: "What is the atomic number of Carbon?", options: ["4", "6", "8", "10"], answer: 1 },
                { question: "What is Newton’s Second Law of Motion?", options: ["F=ma", "E=mc^2", "V=IR", "PV=nRT"], answer: 0 }
            ],
            "Hard": [
                { question: "Solve: x² - 4x + 4 = 0", options: ["x=2", "x=4", "x=-2", "x=0"], answer: 0 },
                { question: "Who wrote 'A Brief History of Time'?", options: ["Einstein", "Hawking", "Galileo", "Darwin"], answer: 1 }
            ]
        },

        "Class 11": {
            "Easy": [
                { question: "Who is known as the father of physics?", options: ["Newton", "Einstein", "Galileo", "Tesla"], answer: 0 },
                { question: "What is the chemical symbol for Sodium?", options: ["Na", "So", "Sa", "Sn"], answer: 0 },
                { question: "Which of the following is a noble gas?", options: ["Oxygen", "Helium", "Nitrogen", "Carbon"], answer: 1 }
            ],
            "Medium": [
                { question: "What is Hooke's Law?", options: ["F = kx", "P = IV", "E = mc^2", "V = IR"], answer: 0 },
                { question: "Which of the following is an example of a scalar quantity?", options: ["Velocity", "Force", "Temperature", "Acceleration"], answer: 2 }
            ],
            "Hard": [
                { question: "What is the derivative of sin(x)?", options: ["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"], answer: 0 },
                { question: "Which fundamental force is responsible for holding the nucleus together?", options: ["Gravitational", "Electromagnetic", "Strong Nuclear", "Weak Nuclear"], answer: 2 }
            ]
        },

        "Class 12": {
            "Easy": [
                { question: "Which type of chemical bond involves the sharing of electrons?", options: ["Ionic", "Covalent", "Metallic", "Hydrogen"], answer: 1 },
                { question: "What is the pH value of pure water?", options: ["5", "7", "9", "11"], answer: 1 },
                { question: "Who discovered the electron?", options: ["Newton", "Thomson", "Rutherford", "Bohr"], answer: 1 }
            ],
            "Medium": [
                { question: "What is Kirchhoff’s Voltage Law (KVL)?", options: ["Sum of voltages in a closed loop is zero", "Sum of currents at a junction is zero", "V=IR", "F=ma"], answer: 0 },
                { question: "What is Planck’s constant approximately equal to?", options: ["6.626 x 10⁻³⁴ J·s", "3.0 x 10⁸ m/s", "9.81 m/s²", "1.6 x 10⁻¹⁹ C"], answer: 0 }
            ],
            "Hard": [
                { question: "Solve: ∫(3x²) dx", options: ["x³ + C", "3x + C", "x³/3 + C", "3x² + C"], answer: 0 },
                { question: "Which scientist developed the theory of relativity?", options: ["Newton", "Einstein", "Galileo", "Tesla"], answer: 1 }
            ]
        }
    };

    let selectedClass = null;
    let selectedDifficulty = null;
    let currentQuestionIndex = 0;
    let questions = [];
    let timeLeft = 30;
    let timerInterval;

    // Step 1: Choose Class
    function setClass(classLevel) {
        selectedClass = `Class ${classLevel}`;
        document.getElementById("class-selection").style.display = "none";
        document.getElementById("difficulty-selection").style.display = "block";
    }

    // Step 2: Choose Difficulty
    function setDifficulty(difficulty) {
        selectedDifficulty = difficulty;
        document.getElementById("difficulty-selection").style.display = "none";
        document.getElementById("quiz-container").style.display = "block";

        questions = quizData[selectedClass][selectedDifficulty];
        if (!questions) {
            alert("No questions found!");
            return;
        }

        loadQuestion();
    }

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            // Redirect to performance page after last question
            window.location.href = `progress.html?score=${score}&total=${questions.length}`;
            return;
        }

        let q = questions[currentQuestionIndex];

        document.getElementById("quiz-question").innerText = q.question;
        document.getElementById("option1").innerText = q.options[0];
        document.getElementById("option2").innerText = q.options[1];
        document.getElementById("option3").innerText = q.options[2];
        document.getElementById("option4").innerText = q.options[3];

        timeLeft = 30;
        clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);
    }

    // Timer
    function updateTimer() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
            nextQuestion();
        } else {
            document.getElementById("timer").innerText = timeLeft;
            timeLeft--;
        }
    }

    let score = 0; // Initialize Score

    // Check Answer
    function checkAnswer(choice) {
        let correctAnswer = questions[currentQuestionIndex].answer;
        let feedback = document.getElementById("feedback-text");

        if (choice === correctAnswer) {
            feedback.innerText = "✅ Correct!";
            score++; // Increment score when correct
        } else {
            feedback.innerText = "❌ Wrong!";
        }
        nextQuestion();
    }

    function nextQuestion() {
        currentQuestionIndex++;
        loadQuestion();
    }

    document.getElementById("option1").addEventListener("click", () => checkAnswer(0));
    document.getElementById("option2").addEventListener("click", () => checkAnswer(1));
    document.getElementById("option3").addEventListener("click", () => checkAnswer(2));
    document.getElementById("option4").addEventListener("click", () => checkAnswer(3));

    window.setClass = setClass;
    window.setDifficulty = setDifficulty;
});







document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const score = parseInt(urlParams.get("score")) || 0;
    const total = parseInt(urlParams.get("total")) || 1;

    // Display score
    document.getElementById("score-text").innerText = score;
    document.getElementById("total-questions").innerText = total;

    // Calculate performance
    const percentage = (score / total) * 100;
    let performanceMessage = "Keep improving! 💪";

    if (percentage >= 80) {
        performanceMessage = "Excellent Work! 🎉";
    } else if (percentage >= 50) {
        performanceMessage = "Good job! Keep practicing! ✅";
    } else {
        performanceMessage = "You need more practice! 📚";
    }

    document.getElementById("performance-message").innerText = performanceMessage;

    // Store performance in localStorage for tracking
    let quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    quizHistory.push({ score, total, percentage });
    localStorage.setItem("quizHistory", JSON.stringify(quizHistory));

    // Update weak areas
    const weakTopics = document.getElementById("weak-topics");
    weakTopics.innerHTML = "";
    
    if (percentage < 50) {
        weakTopics.innerHTML = `<li>Focus on revising key concepts 📖</li>`;
    } else if (percentage < 80) {
        weakTopics.innerHTML = `<li>Review past mistakes for better accuracy! 🎯</li>`;
    } else {
        weakTopics.innerHTML = `<li>You're doing great! Aim for perfection! 🚀</li>`;
    }

    // Display progress graph
    displayProgressChart(quizHistory);

    // Unlock achievements
    unlockAchievements(percentage);
});

// Function to display progress chart
function displayProgressChart(history) {
    const ctx = document.getElementById("progressChart").getContext("2d");
    const labels = history.map((_, index) => `Quiz ${index + 1}`);
    const scores = history.map((entry) => entry.percentage);

    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Performance (%)",
                data: scores,
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
}

// Function to unlock achievements
function unlockAchievements(percentage) {
    const badgeContainer = document.getElementById("badge-container");
    badgeContainer.innerHTML = ""; // Clear previous badges

    if (percentage >= 80) {
        badgeContainer.innerHTML += `<div class="badge">Quiz Master 🏅</div>`;
    }
    if (percentage >= 50) {
        badgeContainer.innerHTML += `<div class="badge">Smart Learner 📚</div>`;
    }
    if (percentage < 50) {
        badgeContainer.innerHTML += `<div class="badge">Keep Practicing! 💪</div>`;
    }
}









document.addEventListener("DOMContentLoaded", function () {
    
    document.body.classList.add("loaded");

    // Make material cards visible
    document.querySelectorAll('.material-card').forEach(card => {
        card.classList.add('visible');
    });
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
    "what is machine learning": "Machine Learning is a branch of AI that enables computers to learn from data without being explicitly programmed.",
    "explain neural networks": "Neural Networks are algorithms designed to recognize patterns, similar to the human brain's processing.",
    "how does AI work": "AI works by analyzing data, learning from patterns, and making decisions or predictions based on the information.",
    "what is deep learning": "Deep Learning is a subset of Machine Learning that uses neural networks with multiple layers to analyze complex data.",
    "what is supervised learning": "Supervised Learning is a type of Machine Learning where the model is trained on labeled data.",
    "what is unsupervised learning": "Unsupervised Learning is a type of Machine Learning where the model finds patterns in data without labeled outputs.",
    "what is reinforcement learning": "Reinforcement Learning is a type of Machine Learning where an agent learns by interacting with its environment and receiving rewards.",
    "what is an algorithm": "An algorithm is a step-by-step set of rules or instructions designed to solve a problem.",
    "what is data science": "Data Science is an interdisciplinary field that uses statistical and computational techniques to analyze and interpret data.",
    "what is the Turing Test": "The Turing Test is a method used to evaluate a machine's ability to exhibit intelligent behavior equivalent to a human.",
    "what is the difference between AI and Machine Learning": "AI is a broader concept involving machines that simulate human intelligence, while Machine Learning is a subset of AI focused on learning from data.",
    "what is big data": "Big Data refers to large volumes of structured and unstructured data that require advanced processing techniques to analyze.",
    "what is a chatbot": "A chatbot is a computer program designed to simulate human conversation using AI and Natural Language Processing.",
    "what is computer vision": "Computer Vision is a field of AI that enables machines to interpret and make decisions based on visual data.",
    "what is natural language processing (NLP)": "NLP is a branch of AI that allows computers to understand, interpret, and generate human language.",
    "what is cloud computing": "Cloud Computing is the delivery of computing services, including storage, databases, and software, over the internet.",
    "what is blockchain technology": "Blockchain is a decentralized digital ledger that records transactions securely and transparently.",
    "what is cybersecurity": "Cybersecurity is the practice of protecting systems, networks, and data from cyber threats and attacks."
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






