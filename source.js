// Youtube API key
const apiKey = 'AIzaSyCUsiD4hbQy7GNtf6V2CCeGiw0zHbluJxs'

// Wikipedia search enpoint url with origin to fix return error
const wikipediaURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&redirects=1&titles='

// Youtube API end point
const youtubeURL = 'https://www.googleapis.com/youtube/v3/search/?part=snippet&key='+ apiKey +'&q='

// Youtube maximum search results
const maxResults = '&maxResults=8'
