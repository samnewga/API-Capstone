window.onload = function(){
  $('#search').click(showResults)
}


function showResults(){
  let searchTerm = document.querySelector('input[name="searchTerm"]').value

  let url1 = wikipediaURL + searchTerm;

  let outputWiki = document.querySelector('#outputWiki');

  let outputYoutube = document.querySelector('#outputYoutube');
  
  outputWiki.innerHTML = "<h2>Search Term " + searchTerm + "</h2>";
  outputYoutube.innerHTML = "<h2>Videos of " + searchTerm + "</h2>";

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
      let desc = response.items[x].snippet.description;
      let thumb = response.items[x].snippet.thumbnails.default.url;
      let videoID = response.items[x].id.videoId;
      outputYoutube.innerHTML += '<div class="panel"><div class="wrap"><div class="content">' + title + '</div><a href="https://youtu.be/' + videoID + '" target="_blank"><img src="' + thumb + '" alt="' + title + '"></a></div></div>'
    }

  })

}



/*
  fetch(url1)
  .then(response=>response.json())
  .then(response=>{
    const pages = response["query"]["pages"];
    const result = Object.values(pages)[0];
    console.log(result)
    outputWikip.innerHTML += '<div class="panel"><div class="wrap"><div class="content">' + title + '</div><a href="https://youtu.be/' + videoID + '" target="_blank"><img src="' + thumb + '" alt="' + title + '"></a></div></div>'
  })
*/

/*
function ajaxJS(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parse(xhr.responseText))
        }
    }
    xhr.open('GET', url, true)
    xhr.send();
}
*/

/*
  ajaxJS(url2,function(response){

    for(let x in response.items){
          console.log(response.items[x])
          let title = response.items[x].snippet.title;
          let desc = response.items[x].snippet.description;
          let thumb = response.items[x].snippet.thumbnails.default.url;
          output.innerHTML += '<div class="dataOutput">'+title+'<br>'+desc+'<br>'+thumb+'</div>';
    }
    
  })
}
*/

/*
ajaxJS(url1, function (response) {
                console.log(response)
                for (var x in response) {
                    var holder = typeof response[x] == 'string' ? response[x] : response[x][0];
                    outputWiki.innerHTML += '<div class="dataOutput">' + holder + '</div>';
                }
            })

*/