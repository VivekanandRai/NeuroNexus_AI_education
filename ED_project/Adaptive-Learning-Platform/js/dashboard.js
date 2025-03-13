document.addEventListener("DOMContentLoaded", function () {
    // Ensure Chart.js is loaded
    if (typeof Chart === "undefined") {
        console.error("Chart.js is not loaded!");
        return;
    }

    // Get the canvas element
    let chartCanvas = document.getElementById("progressChart");
    if (!chartCanvas) {
        console.error("Canvas element #progressChart not found!");
        return;
    }

    // Get the context for drawing
    let ctx = chartCanvas.getContext("2d");

    // Sample AI-generated student performance data
    const progressData = [75, 85, 60, 90, 70, 80, 95]; 
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Create the chart
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

    console.log("📊 Performance Chart Loaded Successfully!");
});
