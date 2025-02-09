function previewImage() {
    const fileInput = document.getElementById("fileInput");
    const imagePreview = document.getElementById("uploadedImage");

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        imagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
}

function preprocessImage() {
    // For demonstration, this function can be extended to resize, crop, or mask the image
    const imagePreview = document.getElementById("uploadedImage");
    const processedImage = document.getElementById("processedImage");

    processedImage.src = imagePreview.src;  // For now, just show the same image
    processedImage.style.display = "block";
}

function predict() {
    const fileInput = document.getElementById("fileInput");
    if (!fileInput.files[0]) {
        alert("Please upload an image first.");
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    document.getElementById("loading").style.display = "block"; // Show loading animation

    fetch('/predict', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("loading").style.display = "none"; // Hide loading animation
        document.getElementById("predictionResult").innerText = `Prediction: ${data.predicted_label}`;

        // Display detailed result based on prediction
        const resultContainer = document.getElementById("detailedResult");
        resultContainer.innerHTML = `
            <h3>Prediction Details:</h3>
            <p>Class: ${data.predicted_label}</p>
            <p>Confidence: 90% (example confidence)</p>
            <p>Symptoms & Next Steps: (Based on model's output)</p>
        `;
    })
    .catch(error => {
        document.getElementById("loading").style.display = "none";
        alert('An error occurred while making the prediction.');
    });
}

function submitFeedback() {
    const feedback = document.getElementById("feedbackText").value;
    alert("Feedback submitted: " + feedback);
}
