/* // Function to fetch the JSON file and process the data
function fetchGamesAndCreateElements() {
    // Fetch the JSON file
    fetch('games.json')
      .then(response => response.json())
      .then(games => {
        // Get the container where the games will be inserted
        const container = document.getElementById('unstable');
        
        // Iterate over the games array
        games.forEach(game => {
          // Create the outer div
          const div = document.createElement('div');
          div.className = 'next';
          
          // Create the anchor element
          const anchor = document.createElement('a');
          anchor.href = game.url;
          
          // Create the image element
          const img = document.createElement('img');
          img.src = game.image;
          img.setAttribute('data-text', game.title || '');
          img.width =  125;
          img.height =  125;
          img.setAttribute('game', '');
          
          // Append the image to the anchor
          anchor.appendChild(img);
          
          // Append the anchor to the div
          div.appendChild(anchor);
          
          // Append the div to the container
          container.appendChild(div);
        });
      })
      .catch(error => console.error('Error fetching games:', error));
  }
  
  // Call the function to start the process
  fetchGamesAndCreateElements();
  
  */