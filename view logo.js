window.onload = function () {
    const searchParams = new URLSearchParams(window.location.search);
    const searchQuery = searchParams.get('search') || '';  // Get the search query from URL
    const container = document.getElementById("logos-container");

    // Retrieve the list of logos from localStorage
    const logos = JSON.parse(localStorage.getItem("logos")) || [];

    // If there's a search query, filter logos by the query
    const filteredLogos = logos.filter(logo => logo.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (filteredLogos.length === 0 && searchQuery) {
        // If no logos match the search, display a 'No results found' message
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No search results found';
        container.appendChild(noResultsMessage);
    } else {
        // Display each logo if there are matching results or all logos if no search query
        filteredLogos.length === 0 ? displayAllLogos() : displayLogos(filteredLogos);
    }

    // Remove the search query from the URL to show the normal logo page after refresh
    if (searchQuery) {
        history.replaceState(null, '', 'view%20logo.html');  // This removes the search query from the URL
    }
};

// Function to display all logos
function displayAllLogos() {
    const logos = JSON.parse(localStorage.getItem("logos")) || [];
    const container = document.getElementById("logos-container");

    logos.forEach((logo, index) => {
        const logoItem = document.createElement("div");
        logoItem.className = "logo-item";

        const img = document.createElement("img");
        img.src = logo.url;
        img.alt = logo.name;

        const name = document.createElement("p");
        name.textContent = logo.name;

        // Add zoom functionality
        img.addEventListener("click", function () {
            openModal(logo.url, index);  // Just pass the logo index, not the name
        });

        logoItem.appendChild(img);
        logoItem.appendChild(name);
        container.appendChild(logoItem);
    });
}

// Function to display filtered logos based on search query
function displayLogos(filteredLogos) {
    const container = document.getElementById("logos-container");

    filteredLogos.forEach((logo, index) => {
        const logoItem = document.createElement("div");
        logoItem.className = "logo-item";

        const img = document.createElement("img");
        img.src = logo.url;
        img.alt = logo.name;

        const name = document.createElement("p");
        name.textContent = logo.name;

        // Add zoom functionality
        img.addEventListener("click", function () {
            openModal(logo.url, index);  // Just pass the logo index, not the name
        });

        logoItem.appendChild(img);
        logoItem.appendChild(name);
        container.appendChild(logoItem);
    });
}

// Modal functionality
function openModal(imageUrl, index) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const modalCaption = document.getElementById("modal-caption");
    const downloadButton = document.getElementById("download-button");

    modal.style.display = "flex";
    modalImage.src = imageUrl;
    modalCaption.textContent = "";  // Do not show name in the modal
    currentLogoIndex = index; // Store the index of the currently viewed logo

    // Set the download link to the logo's URL
    downloadButton.setAttribute("href", `download.html?logoUrl=${encodeURIComponent(imageUrl)}`);
}

// Close modal
function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    currentLogoIndex = null; // Reset current logo index
}

// Delete the current logo
function deleteLogo() {
    if (currentLogoIndex !== null) {
        const logos = JSON.parse(localStorage.getItem("logos")) || [];

        // Remove the logo at the current index
        logos.splice(currentLogoIndex, 1);

        // Save the updated array back to localStorage
        localStorage.setItem("logos", JSON.stringify(logos));

        // Close the modal and refresh the page
        closeModal();
        alert("Logo deleted successfully!");
        window.location.reload(); // Reload the page to reflect changes
    }
}
// Modal functionality
function openModal(imageUrl, index) {
    const modal = document.getElementById("modal");
    const modalImage = document.getElementById("modal-image");
    const modalCaption = document.getElementById("modal-caption");
    const downloadButton = document.getElementById("download-button");

    modal.style.display = "flex";
    modalImage.src = imageUrl;
    modalCaption.textContent = "";  // Do not show name in the modal
    currentLogoIndex = index; // Store the index of the currently viewed logo

    // Set the download link to the logo's URL
    downloadButton.setAttribute("href", `download.html?logoUrl=${encodeURIComponent(imageUrl)}`);
}

