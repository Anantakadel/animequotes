let quotes = [];
let currentIndex = 0;

document.getElementById('fetchQuotes').addEventListener('click', function() {
    const animeName = document.getElementById('animeName').value.trim();
    
    if (!animeName) {
        alert('Please enter an anime name.');
        return;
    }

    // Show loading message and hide navigation buttons
    document.getElementById('loading').style.display = 'block';
    document.getElementById('quotes').innerHTML = ''; // Clear previous quotes
    document.getElementById('navigationButtons').classList.add('hidden');

    // Fetch quotes for the anime
    fetch(`https://anime-quotes5.p.rapidapi.com/api.php?anime=${encodeURIComponent(animeName)}`, {
        method: 'GET',
        headers: {
            'x-rapidapi-host': 'anime-quotes5.p.rapidapi.com',
            'x-rapidapi-key': 'a0b67d1d95msh86ebe72a6bca11cp190a2ejsnf4cdc2582dfd' // Replace with your valid key
        }
    })
    .then(response => response.json())
    .then(data => {
        // Hide loading message
        document.getElementById('loading').style.display = 'none';

        if (data.length === 0) {
            document.getElementById('quotes').innerText = 'No quotes found for this anime.';
            return;
        }

        // Store the quotes and reset the index
        quotes = data;
        currentIndex = 0;

        // Display the first quote
        displayQuote(currentIndex);

        // Show navigation buttons
        document.getElementById('navigationButtons').classList.remove('hidden');
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('quotes').innerText = 'Failed to fetch quotes. Please try again later.';
    });
});

document.getElementById('nextQuote').addEventListener('click', function() {
    if (currentIndex < quotes.length - 1) {
        currentIndex++;
        displayQuote(currentIndex);
    }
});

document.getElementById('prevQuote').addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        displayQuote(currentIndex);
    }
});

function displayQuote(index) {
    const quoteObj = quotes[index];
    const quoteText = `"${quoteObj.quote}" - ${quoteObj.character}`;
    document.getElementById('quotes').innerText = quoteText;
}
