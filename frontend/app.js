function getRecommendations() {
    const preferences = document.getElementById("preferences").value.split(",").map(p => p.trim());
    fetch("http://127.0.0.1:5000/generate-recommendation", {
        method: "POST",  // Ange metoden som POST
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ preferences })
    })
        .then(response => response.json())
        .then(data => {
            const recommendationsDiv = document.getElementById("recommendations");
            recommendationsDiv.innerHTML = "<h2>Recommendations:</h2>";
            recommendationsDiv.innerHTML += "<ul>" + data.recommendations.map(rec => `<li>${rec}</li>`).join('') + "</ul>";
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
