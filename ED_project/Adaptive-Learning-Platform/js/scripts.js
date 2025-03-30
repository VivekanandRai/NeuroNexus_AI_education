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
    let score = 0;
    let userAnswers = [];
    let totalQuestions = 0;

    // 📌 Function to save quiz results in history
    function saveQuizResult() {
        let quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
    
        quizHistory.push({
            class: selectedClass,
            difficulty: selectedDifficulty,
            score: score,
            total: totalQuestions,
            timestamp: new Date().toISOString()
        });
    
        localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
    }
    
    // Progress Tracking
    function updateProgress() {
        const attempted = userAnswers.filter(a => a !== null).length;
        document.getElementById("attempted-count").textContent = attempted;
        document.getElementById("remaining-count").textContent = totalQuestions - attempted;
        document.getElementById("question-number").textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
    }
    
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
        document.getElementById("progress-header").classList.remove("hidden");
    
        questions = quizData[selectedClass][selectedDifficulty];
        if (!questions) {
            alert("No questions found!");
            return;
        }
    
        totalQuestions = questions.length;
        userAnswers = new Array(totalQuestions).fill(null);
        updateProgress();
        loadQuestion();
    }
    
    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            showReviewPage();
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
        updateProgress();
    }
    
    // Timer
    function updateTimer() {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            userAnswers[currentQuestionIndex] = null; // Mark as unanswered
            nextQuestion();
        } else {
            document.getElementById("timer").innerText = timeLeft;
            timeLeft--;
        }
    }
    
    // Check Answer
    function checkAnswer(choice) {
        clearInterval(timerInterval);
        
        let correctAnswer = questions[currentQuestionIndex].answer;
        if (choice === correctAnswer) {
            score++; // Increment score if correct
        }
    
        userAnswers[currentQuestionIndex] = choice; // Store user's answer
        updateProgress();
        nextQuestion();
    }
    
    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
            loadQuestion();
        } else {
            showReviewPage();
        }
    }
    
    // Review Page Functions
    function showReviewPage() {
        clearInterval(timerInterval);
        
        const reviewContainer = document.getElementById("answers-review");
        reviewContainer.innerHTML = "";
        
        questions.forEach((q, index) => {
            const div = document.createElement("div");
            const userAnswer = userAnswers[index];
            const answerText = userAnswer !== null ? q.options[userAnswer] : "Not answered";
            const isCorrect = userAnswer === q.answer;
    
            div.innerHTML = `
                <strong>Q${index + 1}:</strong> ${q.question}<br>
                <span class="user-answer ${isCorrect ? 'correct' : 'incorrect'}">
                    Your Answer: ${answerText}
                </span><br>
            `;
            reviewContainer.appendChild(div);
        });
    
        document.getElementById("quiz-container").classList.add("hidden");
        document.getElementById("progress-header").classList.add("hidden");
        document.getElementById("review-page").classList.remove("hidden");
    }
    
    function submitQuiz() {
        saveQuizResult(); // ✅ Save history before redirecting

        const answersData = questions.map((q, index) => ({
            question: q.question,
            correctAnswer: q.options[q.answer], // Correct answer
            userAnswer: userAnswers[index] // User's given answer
        }));
    
        const encodedAnswers = encodeURIComponent(JSON.stringify(answersData));
    
        window.location.href = `progress.html?score=${score}&total=${totalQuestions}&answers=${encodedAnswers}`;
    }
    
    // Event Listeners
    document.getElementById("option1").addEventListener("click", () => checkAnswer(0));
    document.getElementById("option2").addEventListener("click", () => checkAnswer(1));
    document.getElementById("option3").addEventListener("click", () => checkAnswer(2));
    document.getElementById("option4").addEventListener("click", () => checkAnswer(3));
    
    window.setClass = setClass;
    window.setDifficulty = setDifficulty;
    window.submitQuiz = submitQuiz;
});

// document.addEventListener("DOMContentLoaded", function () {
//     let quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];
//     const historyContainer = document.getElementById("quiz-history");

//     if (quizHistory.length === 0) {
//         historyContainer.innerHTML = "<p>No quiz history available.</p>";
//         return;
//     }

//     quizHistory.forEach((quiz, index) => {
//         let div = document.createElement("div");
//         div.classList.add("history-item");
//         div.innerHTML = `
//             <strong>Attempt ${index + 1}:</strong> <br>
//             Class: ${quiz.class} <br>
//             Difficulty: ${quiz.difficulty} <br>
//             Score: ${quiz.score} / ${quiz.total} <br>
//             Date: ${new Date(quiz.timestamp).toLocaleString()}
//             <hr>
//         `;
//         historyContainer.appendChild(div);
//     });
// });







document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const score = parseInt(urlParams.get('score')) || 0;
    const total = parseInt(urlParams.get('total')) || 0;
    const correctAnswersData = JSON.parse(urlParams.get('answers') || "[]");

    const scoreText = document.getElementById("score-text");
    const totalQuestions = document.getElementById("total-questions");
    const performanceMessage = document.getElementById("performance-message");
    const weakTopics = document.getElementById("weak-topics");
    const badgeContainer = document.getElementById("badge-container");
    const reviewSection = document.querySelector(".answers-review");
    const reviewContainer = document.getElementById("answers-review");
    const progressChart = document.getElementById("progressChart");

    if (scoreText && totalQuestions) {
        scoreText.textContent = score;
        totalQuestions.textContent = total;
    }

    if (performanceMessage) {
        performanceMessage.innerHTML =
            score === total ? "🎉 Excellent! You got all answers correct!"
            : score >= total * 0.7 ? "👏 Great job! Keep practicing!"
            : score >= total * 0.5 ? "🙂 Good effort! Try to improve!"
            : "😕 Needs improvement. Review the topics!";
    }

    if (progressChart && typeof Chart !== 'undefined') {
        const ctx = progressChart.getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Correct', 'Incorrect'],
                datasets: [{
                    data: [score, total - score],
                    backgroundColor: ['#4CAF50', '#FF5733'],
                }]
            }
        });
    } else {
        console.warn("Chart.js is not loaded or canvas element missing!");
    }

    if (weakTopics) {
        weakTopics.innerHTML = (total - score > total * 0.3)
            ? "<li>Focus on key concepts and try again!</li>"
            : "<li>Great job! No major weak areas detected.</li>";
    }

    if (badgeContainer) {
        badgeContainer.innerHTML =
            score === total ? "<span class='badge'>🏅 Perfect Score!</span>"
            : score >= total * 0.7 ? "<span class='badge'>🔥 High Scorer!</span>"
            : score >= total * 0.5 ? "<span class='badge'>👍 Good Effort!</span>"
            : "<span class='badge'>📚 Keep Practicing!</span>";
    }

    // ✅ Answer Review Section with Selected Option Name
    if (reviewSection && reviewContainer) {
        if (total > 0) {
            reviewSection.style.display = "block";
            reviewContainer.innerHTML = "";

            correctAnswersData.forEach((item, index) => {
                if (!item.question || !item.correctAnswer) return;

                const isCorrect = String(item.userAnswer).trim().toLowerCase() === String(item.correctAnswer).trim().toLowerCase();

                const div = document.createElement("div");
                div.classList.add("answer-item", isCorrect ? "correct" : "incorrect");

                const selectedOptionText = item.selectedOptionText ? `(${item.selectedOptionText})` : "";

                div.innerHTML = `
                    <p><strong>Q${index + 1}:</strong> ${item.question}</p>
                    <p class="correct-answer">✅ Correct Answer: ${item.correctAnswer}</p>
                    <p class="user-answer ${isCorrect ? 'correct-text' : 'incorrect-text'}">
                        📝 Your Answer: ${item.userAnswer} ${selectedOptionText}
                    </p>
                `;

                reviewContainer.appendChild(div);
            });
        } else {
            reviewSection.style.display = "none";
        }
    }
});







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





