// Runs the showResults function when an event is found on the search form
window.onload = function(){
  $('.search-form').submit(showResults);
}

// Function that shows the results of the APIs
function showResults(e) {
  e.preventDefault();
  
  // Gets the value of searchTerm
  let searchTerm = document.querySelector('input[class="search-box-input"]').value
  
   // Get the first element of the document with the id of outputWiki
  let outputWiki = document.querySelector('#outputWiki');
  
  // Get the first element of the document with the id of outputYoutube
  let outputYoutube = document.querySelector('#outputYoutube');
  
  // Runs the capitalization function on the search term
  let fixedTerm = capitalization(searchTerm);
  
  // Puts together the wikipedia endpoint with the search term
  let url1 = wikipediaURL + searchTerm;

  // Changes the HTML content of outputWiki with a string and search term
  outputWiki.innerHTML = `<h2 class="dataOutput">Search Term "${searchTerm}"</h2>`;

  // Changes the HTML content of outputYoutube with a string and search term
  outputYoutube.innerHTML = `<h2 class="dataOutput">Videos of "${searchTerm}"</h2>`;

  // Fetches a JSON response from the Wikipedia API
 fetch(url1)
  .then(response=>response.json())
  .then(response=>{
    const pages = response["query"]["pages"];
    const result = Object.values(pages)[0];

    if(result.extract === undefined){
      console.log(result);
      outputWiki.innerHTML += '<div class="dataOutput"> Invalid search term or no Wikipedia page found.</div>';  
    }

    else{
    console.log(result);
    outputWiki.innerHTML += '<div class="dataOutput">' + result.extract + '</div>';
    }
  });

  // Combines the youtube end point url with the search term and the set maximum results
  let url2 = youtubeURL + searchTerm + maxResults;

  // Fetches a JSON response from the Youtube API
  fetch(url2)
  .then(response=>response.json())
  .then(response=>{
    for(let x in response.items){
      console.log(response.items[x])
      let title = response.items[x].snippet.title;
      console.log(response.items[x].snippet);
      let thumb = response.items[x].snippet.thumbnails.high.url;

      console.log(thumb);
      
      const newTitle = shortenTitle(title);

      let videoID = response.items[x].id.videoId;
      outputYoutube.innerHTML += '<div class="panel"><div class="wrap"><div class="content">' + newTitle + '</div><a href="https://youtu.be/' + videoID + '" target="_blank"><img src="' + thumb + '" alt="' + title + '"></a></div></div>'
    }

  });

}

// Shortens the youtube video titles 
function shortenTitle(title) {
  let newTitle = title.substring(0,35)

  return `${newTitle}...`;
  }

// Capitalizes the search term for a better wikipedia search result
function capitalization(searchTerm){
  searchTerm = searchTerm.toLowerCase();
  const tokens = searchTerm.split(" ");
  const result = [];

  for (let i = 0; i < tokens.length; i++){
    let currentToken = tokens[i];
    let capitalized = capitalizeWord(currentToken);
    result.push(capitalized);
  
  }
  
  return result.join(" ");
};

// Capitalizes the tokens which are the words within the search term string
function capitalizeWord(token){
  const initial = token.charAt(0).toUpperCase();
  const remainder = token.substr(1, token.length);

  return `${initial}${remainder}`;
};
