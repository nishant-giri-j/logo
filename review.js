let selectedRating = 0;
let reviews = JSON.parse(localStorage.getItem("reviews")) || []; // Load saved reviews or initialize as empty

// Function to fetch logos from localStorage
function fetchLogos() {
    return JSON.parse(localStorage.getItem("logos")) || [];
}

// Function to show suggestions dynamically
function showSuggestions(value) {
    const logos = fetchLogos(); // Always fetch the latest list
    const suggestionBox = document.getElementById("suggestions");
    suggestionBox.innerHTML = ""; // Clear existing suggestions

    if (value.length > 0) {
        const matches = logos.filter(logo =>
            logo.name.toLowerCase().includes(value.toLowerCase())
        );

        if (matches.length > 0) {
            suggestionBox.style.display = "block";
            matches.forEach(logo => {
                const div = document.createElement("div");
                div.textContent = logo.name;
                div.onclick = () => selectLogo(logo.name);
                suggestionBox.appendChild(div);
            });
        } else {
            suggestionBox.style.display = "block"; // Ensure the box is shown
            const noMatchDiv = document.createElement("div");
            noMatchDiv.textContent = "No Logo Found";
            noMatchDiv.style.color = "red"; // Highlight the message
            suggestionBox.appendChild(noMatchDiv);
        }
    } else {
        suggestionBox.style.display = "none";
    }
}

// Function to handle logo selection
function selectLogo(logoName) {
    document.getElementById("search-bar").value = logoName;
    document.getElementById("suggestions").style.display = "none";
}

// Search function triggered by the search button
function searchLogo() {
    const searchInput = document.getElementById("search-bar").value;
    showSuggestions(searchInput); // Call showSuggestions to display logos
}

// Star rating functionality
document.querySelectorAll(".star").forEach(star => {
    star.addEventListener("click", function () {
        selectedRating = parseInt(this.getAttribute("data-value"));
        highlightStars(selectedRating);
    });

    star.addEventListener("mouseover", function () {
        highlightStars(parseInt(this.getAttribute("data-value")));
    });

    star.addEventListener("mouseout", function () {
        highlightStars(selectedRating);
    });
});

function highlightStars(rating) {
    document.querySelectorAll(".star").forEach(star => {
        star.classList.toggle("active", parseInt(star.getAttribute("data-value")) <= rating);
    });
}

// Submit a new review
function submitReview() {
    const logo = document.getElementById("search-bar").value;
    const comment = document.getElementById("comment-box").value;

    // Check if logo exists in the list of logos
    const logos = fetchLogos();
    const logoExists = logos.some(logoItem => logoItem.name.toLowerCase() === logo.toLowerCase());

    if (!logoExists) {
        alert("The logo you entered does not exist. Please select a valid logo.");
        return;
    }

    if (!logo || !comment || selectedRating === 0) {
        alert("Please select a logo, write a comment, and provide a rating.");
        return;
    }

    // Add new review to the array
    const review = { logo, comment, rating: selectedRating };
    reviews.push(review);

    // Save the updated reviews to localStorage
    localStorage.setItem("reviews", JSON.stringify(reviews));

    // Render the reviews
    renderReviews();

    // Reset form
    resetForm();
}

// Render all reviews
function renderReviews() {
    const reviewsList = document.getElementById("reviews-list");
    reviewsList.innerHTML = "";

    reviews.forEach((review, index) => {
        const reviewItem = document.createElement("div");
        reviewItem.className = "review-item";
        reviewItem.innerHTML = `
            <p><strong>${review.logo}</strong> - ${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
            <p style="max-height: 60px; overflow: hidden; text-overflow: ellipsis;">${review.comment}</p>
            <button onclick="toggleReviewContent(event, ${index})">Show More</button>
            <button class="delete-btn" onclick="deleteReview(${index})">Delete</button>
        `;
        reviewsList.appendChild(reviewItem);
    });
}

// Toggle "Show More" and "Show Less" for long comments
function toggleReviewContent(event, index) {
    const reviewText = event.target.previousElementSibling;
    if (reviewText.style.maxHeight === "none") {
        reviewText.style.maxHeight = "60px";
        event.target.textContent = "Show More";
    } else {
        reviewText.style.maxHeight = "none";
        event.target.textContent = "Show Less";
    }
}

// Reset form after submitting
function resetForm() {
    document.getElementById("search-bar").value = "";
    document.getElementById("comment-box").value = "";
    selectedRating = 0;
    highlightStars(0);
}

// Delete a review
function deleteReview(index) {
    // Remove the review from the array
    reviews.splice(index, 1);

    // Save the updated reviews to localStorage
    localStorage.setItem("reviews", JSON.stringify(reviews));

    // Render the updated reviews
    renderReviews();
}

// Initialize dropdown and reviews on page load
document.addEventListener("DOMContentLoaded", () => {
    renderReviews();

    // Check for logo updates periodically
    setInterval(() => {
        const logos = fetchLogos();
        console.log("Updated logos:", logos); // For debugging
    }, 2000); // Adjust interval as needed
});
