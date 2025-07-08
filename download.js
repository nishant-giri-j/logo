window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const logoUrl = urlParams.get('logoUrl');

    if (logoUrl) {
        const downloadLink = document.getElementById("download-link");
        downloadLink.href = logoUrl;
        downloadLink.style.display = "block"; // Show the download link
    } else {
        alert("No logo found to download.");
    }
}
