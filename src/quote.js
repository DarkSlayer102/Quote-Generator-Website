function initializeQuoteApp() {
    // Select all input elements (presumably category selection buttons or fields)
    const categoryInputs = document.querySelectorAll('input');

    // Base URL for the Quotes API
    const apiUrl = 'https://api.api-ninjas.com/v1/quotes?category='; 
    const apiKey = "YOUR API KEY"; // API key for authentication

    // Clear existing content in the quote and author sections
    document.querySelector('.author').innerHTML = '';
    document.querySelector('.quote').innerHTML = '';

    // Function to fetch data from the API based on the selected category
    async function fetchData(category) {
        /**
         * Fetch data such as author and quote from the API
         * based on the selected category.
         */
        try {
            // Make a fetch request with the provided API key and category
            const response = await fetch(apiUrl + category, {
                headers: {
                    "X-Api-Key": apiKey
                }
            });

            // Parse the response into JSON format
            const data = await response.json();

            // Loop through each input to match the selected category
            for (let i = 0; i < categoryInputs.length; i++) {
                if (categoryInputs[i].value.toLowerCase() == data[0]["category"]) {
                    // If the input's value matches the category, update the UI
                    console.log(data); // Log data for debugging purposes

                    // Function to update the DOM with fetched quote and author
                    function convertingStaticValueToActualValue() {
                        // Assign fetched author and quote to the respective elements
                        document.querySelector('.author').innerHTML = "Author: " + data[0]['author'];
                        document.querySelector('.quote').innerHTML = "<strong>Quote:</strong> " + data[0]['quote'];
                    }
                    
                    // Call the function to update the UI
                    convertingStaticValueToActualValue();
                }
            }
        } catch (error) {
            // Handle errors that occur during the API call
            const errorElement = document.getElementById('error');
            errorElement.innerHTML = 'Apologies for the inconvenience caused. Please bear with us while we resolve the issue.';
            errorElement.style.fontFamily = 'Helvetica'; // Set font style
            errorElement.style.fontSize = '40px'; // Set font size
            errorElement.style.color = 'darkred'; // Set font color
            console.error('Error occurred: ' + errorElement.innerHTML); // Log error details
        }
    }

    // Function to link each category input with a click event listener
    linkingCategory = () => {
        for (let i = 0; i < categoryInputs.length; i++) {
            // Add a click event listener to fetch data based on the clicked category
            categoryInputs[i].addEventListener('click', () => {
                fetchData(categoryInputs[i].value.toLowerCase());
            });
        }
    }

    // Call the function to link category inputs to fetch functionality
    linkingCategory();
}

// Initialize the quote application
initializeQuoteApp();
