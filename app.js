function getRecommendations() {
    const preferences = document.getElementById("preferences").value.split(",").map(p => p.trim());

    fetch("/generate-recommendation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ preferences })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const recommendationsDiv = document.getElementById("recommendations");
            recommendationsDiv.innerHTML = "<h2>Recommendations:</h2>";
            recommendationsDiv.innerHTML += "<ul>" + data.recommendations.map(rec => `<li>${rec}</li>`).join('') + "</ul>";
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById("recommendations").innerHTML = "<p>There was an error retrieving recommendations.</p>";
        });
}
