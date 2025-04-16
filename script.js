const API_KEY = 'rGT7ERivZiKV_BRLrY50fKvgrZATU4I6VviqSAo3IeY';  // Unsplash API Key
const UNSPLASH_URL = 'https://api.unsplash.com/search/photos';

// Function to search for images from Unsplash
async function searchImages(query) {
    try {
        const response = await fetch(`${UNSPLASH_URL}?query=${query}&client_id=${API_KEY}`);
        const data = await response.json();

        if (data && data.results) {
            return data.results.map(image => image.urls.small);  // Get small image URLs
        } else {
            console.error("No images found or API error.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching images:", error);
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
        displayImages(images);  // Display found images
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
        imgElement.onclick = () => addImageToCSS(imageUrl);  // When an image is clicked, it will be added to the theme
        container.appendChild(imgElement);
    });
}

// Function to add selected image to the theme and generate the CSS code
function addImageToCSS(imageUrl) {
    const bgColor = document.getElementById("bgColor").value;
    const btnColor = document.getElementById("btnColor").value;

    // Create the CSS code with the selected image
    const generatedCSS = `
        body {
            background-color: ${bgColor};
            background-image: url('${imageUrl}');
            background-size: cover;
        }

        button {
            background-color: ${btnColor};
            color: white;
        }
    `;

    // Display the generated CSS code in the console or a text area
    console.log("Generated CSS:\n", generatedCSS);
    
    // Optional: Display the generated CSS on the webpage for the user
    document.getElementById("generatedCSS").textContent = generatedCSS;
}

