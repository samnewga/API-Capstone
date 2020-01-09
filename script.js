window.onload = function(){
  $('.search-form').submit(showResults);
}


function showResults(e) {
  e.preventDefault();

  let searchTerm = document.querySelector('input[class="search-box-input"]').value

  let url1 = wikipediaURL + searchTerm;

  let outputWiki = document.querySelector('#outputWiki');

  let outputYoutube = document.querySelector('#outputYoutube');
  
  outputWiki.innerHTML = `<h2 class="dataOutput">Search Term "${searchTerm}"</h2>`;

  outputYoutube.innerHTML = `<h2 class="dataOutput">Videos of "${searchTerm}"</h2>`;

  fetch(url1)
  .then(response=>response.json())
  .then(response=>{
    const pages = response["query"]["pages"];
    const result = Object.values(pages)[0];

    console.log(result);
    outputWiki.innerHTML += '<div class="dataOutput">' + result.extract + '</div>';
  })


  let url2 = youtubeURL + searchTerm + maxResults;

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

function shortenTitle(title) {
  let newTitle = title.substring(0,35)

  return `${newTitle}...`;

}