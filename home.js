// This function will handle the search and filter suggestions
function showSuggestions(value) {
    const suggestionBox = document.getElementById("suggestions");
    suggestionBox.innerHTML = "";  // Clear previous suggestions
    
    if (value.length > 0) {
        // Filter logos based on search input
        const matches = logos.filter(logo =>
            logo.name.toLowerCase().includes(value.toLowerCase()) // Match search input with logo names
        );
        
        if (matches.length > 0) {
            suggestionBox.style.display = "block"; // Show the suggestion box
            // Display matching logos in the dropdown
            matches.forEach(match => {
                const div = document.createElement("div");
                div.innerText = match.name; // Display the logo name
                div.onclick = () => highlightLogo(match.name);
                suggestionBox.appendChild(div);
            });
        } else {
            suggestionBox.style.display = "none"; // Hide the suggestion box if no match
        }
    } else {
        suggestionBox.style.display = "none"; // Hide the suggestion box if input is empty
    }
}

// This function will handle the highlight action when clicking a suggestion
function highlightLogo(logoName) {
    alert(`You selected: ${logoName}`);
    // You can implement further logic here (e.g., navigate to the logo's page)
    document.getElementById("suggestions").style.display = "none";
}
