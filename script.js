const API_KEY = 'rGT7ERivZiKV_BRLrY50fKvgrZATU4I6VviqSAo3IeY';  // Add your Unsplash API key here
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';

// Function to search for images from Unsplash
async function searchImages(query) {
    const response = await fetch(`${UNSPLASH_URL}?query=${query}&client_id=${API_KEY}`);
    const data = await response.json();

    if (data && data.results) {
        return data.results.map(image => image.urls.small);  // Get small images from the search result
    } else {
        console.error("No images found or API error.");
        return [];
    }
}

// Function to generate the theme
async function generateTheme() {
    const bgColor = document.getElementById("bgColor").value;
    const btnColor = document.getElementById("btnColor").value;
    const imageQuery = document.getElementById("imageQuery").value;

    // Display background color change (Just an example)
    document.body.style.backgroundColor = bgColor;

    // Change button color dynamically
    document.querySelector("button").style.backgroundColor = btnColor;

    // Search for images using the Unsplash API
    if (imageQuery) {
        const images = await searchImages(imageQuery);
        displayImages(images);
    }
}

// Function to display the images on the page
function displayImages(images) {
    const container = document.getElementById("image-container");
    container.innerHTML = ''; // Clear previous images

    images.forEach(imageUrl => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = "Search Image";
        container.appendChild(imgElement);
    });
}
