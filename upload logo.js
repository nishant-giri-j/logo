document.getElementById("upload-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const logoFile = document.getElementById("logo-input").files[0];
    const logoName = document.getElementById("logo-name").value.trim();
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (!logoFile || !logoName) {
        alert("Please select a logo and enter a name.");
        return;
    }

    if (logoFile.size > MAX_FILE_SIZE) {
        alert("File is too large. Please upload a file smaller than 5MB.");
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {
        try {
            let logos = JSON.parse(localStorage.getItem("logos")) || [];
            logos.push({ name: logoName, url: reader.result });
            localStorage.setItem("logos", JSON.stringify(logos));

            alert("Logo uploaded successfully!");
            displayLogos(); // Show updated grid
            document.getElementById("upload-form").reset();

        } catch (error) {
            console.error("Error saving logo to localStorage:", error);
            alert("There was an error saving the logo. Please try again.");
        }
    };

    reader.onerror = function (error) {
        console.error("Error reading the file:", error);
        alert("There was an error reading the file. Please try again.");
    };

    reader.readAsDataURL(logoFile);
});

function displayLogos() {
    const gallery = document.getElementById("logo-gallery");
    gallery.innerHTML = "";

    const logos = JSON.parse(localStorage.getItem("logos")) || [];

    logos.forEach(logo => {
        const img = document.createElement("img");
        img.src = logo.url;
        img.alt = logo.name;
        img.style.width = "100%";
        img.style.borderRadius = "10px";
        img.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        img.style.objectFit = "cover";

        const wrapper = document.createElement("div");
        wrapper.style.width = "100%";
        wrapper.appendChild(img);

        gallery.appendChild(wrapper);
    });

    // Apply grid styling
    gallery.style.display = "grid";
    gallery.style.gridTemplateColumns = "repeat(auto-fill, minmax(150px, 1fr))";
    gallery.style.gap = "20px";
    gallery.style.marginTop = "20px";
}

// Show logos on page load
window.onload = displayLogos;
