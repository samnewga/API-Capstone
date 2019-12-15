window.onload = function(){
  $('#search').click(showResults)
}

function showResults(){
  let searchTerm = document.querySelector('input[name="searchTerm"]').value

  let url1 = wikipediaURL + searchTerm;

  let output = document.querySelector('#output');
  output.innerHTML ='<h2>Search Term '+searchTerm+'<h2>';

  ajaxJS(url1,function(response){

    for(let x in response){
      let holder = typeof response[x] == 'string' ? response[x]:response[x][0];
      output.innerHTML +='<div class="dataOutput">'+holder+'</div>';
    }
    
  })

  let url2 = youtubeURL + searchTerm + maxResults;

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