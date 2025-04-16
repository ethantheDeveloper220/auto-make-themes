document.addEventListener("DOMContentLoaded", function () {
  // Handle form submission for theme generation
  const themeForm = document.getElementById("theme-form");
  const outputCss = document.getElementById("output-css");

  themeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const bgUrl = document.getElementById("bg-url").value || "";
    const mainColor = document.getElementById("main-color").value;
    const textColor = document.getElementById("text-color").value;
    const btnColor = document.getElementById("btn-color").value;

    let cssOutput = `/* ==UserStyle==
@name         Custom Theme
@version      1.0
@namespace    ?
==/UserStyle== */

@-moz-document domain("www.nitrotype.com") {
  body {
    background-color: ${mainColor};
    color: ${textColor};
    background: url(${bgUrl}) no-repeat center center fixed;
    background-size: cover;
  }

  .btn--primary {
    background-color: ${btnColor};
    color: ${textColor};
  }

  .theme--pDefault .profile-title,
  .theme--pDefault .profile-levelNum {
    color: ${mainColor};
  }

  /* Add more customizations here */
}
`;

    outputCss.value = cssOutput;

    // Call AI for improvement suggestions
    getAICSSSuggestions(mainColor, textColor, btnColor).then(suggestions => {
      displayAISuggestions(suggestions);
    });
  });

  // Handle image selection for background
  const imageGrid = document.querySelector(".image-grid");

  imageGrid.addEventListener("click", function (e) {
    if (e.target.tagName === "IMG") {
      const selectedImageUrl = e.target.src;
      document.getElementById("bg-url").value = selectedImageUrl;
    }
  });

  // Handle feature request submission
  const requestForm = document.getElementById("request-form");
  const requestList = document.getElementById("request-list");

  requestForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const requestText = document.getElementById("request-text").value;

    if (requestText.trim()) {
      const li = document.createElement("li");
      li.textContent = requestText;
      requestList.appendChild(li);

      // Clear the request input
      document.getElementById("request-text").value = "";
    }
  });

  // Function to simulate AI suggestions (replace this with actual AI API in a real app)
  async function getAICSSSuggestions(mainColor, textColor, btnColor) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate AI suggestion based on user input (In a real case, this would come from an AI API)
        const suggestions = [
          `Try using a softer shade of ${mainColor} to make the page less harsh on the eyes.`,
          `Consider changing the button color to a lighter shade of ${btnColor} for better contrast.`,
          `How about adding a gradient to the background for a modern look?`,
          `Adjusting the text color to something with more contrast against ${mainColor} could improve readability.`,
        ];

        resolve(suggestions);
      }, 1000);
    });
  }

  // Function to display AI suggestions
  function displayAISuggestions(suggestions) {
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.classList.add('ai-suggestions');
    suggestionsContainer.innerHTML = '<h3>AI Suggestions:</h3>';

    suggestions.forEach((suggestion) => {
      const suggestionItem = document.createElement('p');
      suggestionItem.textContent = suggestion;
      suggestionsContainer.appendChild(suggestionItem);
    });

    // Add suggestions to the output section
    document.querySelector('.output-section').appendChild(suggestionsContainer);
  }
});
