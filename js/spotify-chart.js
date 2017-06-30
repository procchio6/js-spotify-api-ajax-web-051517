var url = "https://api.spotify.com/v1/artists/43ZHCT0cAZBISjO8DG9PnE/top-tracks?country=SE";

var dataSetProperties = {
  fillColor: 'rgba(220,220,220,0.5)',
  strokeColor: 'rgba(220,220,220,0.8)',
  highlightFill: 'rgba(220,220,220,0.75)',
  highlightStroke: 'rgba(220,220,220,1)'
};

$(function() {
  getAccessToken(getSpotifyTracks);
});

function getAccessToken(callback) {
  $.ajax({
    url: 'https://accounts.spotify.com/api/token',
    type: 'post',
    data: {
        grant_type: 'client_credentials'
    },
    headers: {
        Authorization: 'Basic ZjBkMmE4ZTU4NTZjNDRhOWFhMjRmMzk5YjJkMzE4OTQ6MjdhOTM1ODEyMTRhNGU4NjlmMGVjMjU0NzU5OTBkYzA=',
        "Content-Type":'application/x-www-form-urlencoded'
    },
    success: function (data) {
      callback(data.access_token, success);
    },
    error: function (error) {
      console.log(error);
      console.log("Something went wrong");
    }
});
}

// write functions to pass spec tests here outside the jQuery doc ready
// then call function within doc ready to get them to work
// and display the chart correctly in index.html

function extractTop10Tracks(tracks) {
  return tracks.slice(0, 10)
}

function extractPopularity(tracks) {
  return tracks.map(function (track) {
    return track.popularity
  })
}

function extractNames(tracks) {
  return tracks.map(function (track) {
    return track.name
  })
}

function chartData(labels, inputData) {
  // use the dataSetProperties variable defined above if it helps
  return {
    labels: labels,
    datasets: [{
      data:inputData,
      fillColor: 'rgba(220,220,220,0.5)',
      strokeColor: 'rgba(220,220,220,0.8)',
      highlightFill: 'rgba(220,220,220,0.75)',
      highlightStroke: 'rgba(220,220,220,1)'
    }]
  }
}

function getSpotifyTracks(access_token, callback){
  // your ajax call here, on success it should call on the
  // parameter it's passed (it's a function), and pass it's
  // parameter the data it received

  // use the url variable defined above if it helps
  $.ajax({
    url: url,
    type: 'GET',
    headers: {
        Authorization: 'Bearer ' + access_token
    },
    success: callback,
    error: function (error) {
      console.log(error);
      console.log("Something went wrong");
    }
});
}

function success(parsedJSON) {
  // this function will make a new bar chart, refer to this url:
  // http://www.chartjs.org/docs/#bar-chart
  // you will need to call on:
  //  1. extractTop20Tracks - pass it tracks
  //  2. extractNames -  pass it the result of #1
  //  3. extractPopularity - pass it the result of #1
  //  4. chartData - pass it results of #2 and #3
  //  5. make a variable `ctx` and select the canvas with the id of spotify-chart
  //     * also make sure to specify 2d context
  //  6. make a new bar chart!
  var tracks = extractTop10Tracks(parsedJSON.tracks)
  var trackNames = extractNames(tracks)
  var trackPopularity = extractPopularity(tracks)
  var data = chartData(trackNames, trackPopularity)

  var ctx = document.getElementById("spotify-chart").getContext('2d');
  var myChart = new Chart(ctx).Bar(data)
}
