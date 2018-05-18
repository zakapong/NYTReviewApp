
data = '';

var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";
url += '?' + $.param({
  'api-key': "aa6b434cdfd24541a23901a5043479de"
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(response) {
    displayMovie = "";
  data = response.results;
  var dataStore = localStorage.setItem('dataStore', JSON.stringify(data));
  for (i = 1; i < data.length; i++) {
    displayMovie += `<div id="reviewId" class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top"  alt="Thumbnail [100%x225]" src="` + data[i].multimedia.src +`" data-holder-rendered="true">
      <div class="card-body">
        <h2>` + data[i].display_title + `</h2>
        <p class="card-text">` + data[i].summary_short + `</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
          <a onclick="selectedMovieReview('` + i + `')" ><button type="button" class="btn btn-sm btn-outline-secondary">View</button></a>
          </div>
            <small class="text-muted"> Rating: `+ data[i].mpaa_rating + `</small>
          </div>
        </div>
      </div>
    </div>`;
  }

  $('#reviews').html(displayMovie); 

}).fail(function(err) {
  throw err;
});



function selectedMovieReview(reviewMovieId) {
  var reviewId = sessionStorage.setItem('reviewId', reviewMovieId);
  window.location = 'reviewDetail.html';
  return false;
}

function getMovieDetails(){
 
  var reviewId = sessionStorage.getItem('reviewId');
   var dataStore = JSON.parse(localStorage.getItem('dataStore'));

    var output = '';
    
    output += `<section class="jumbotron text-center">
      <div class="container">
		<h1 class="jumbotron-heading">` + dataStore[reviewId].display_title + `</h1>
		<p class="lead text-muted">` + dataStore[reviewId].summary_short + `</p>
        <p>
          <button  onclick="gotoMainPage()" id="go-to-main-button" class="btn btn-primary my-2">Go Back to Main Page</button >
        </p>
      </div>
    </section>`
    $('#review-detail').html(output); 
    
}


function gotoMainPage () {
	    document.getElementById("go-to-main-button").onclick = function () {
        window.location = "index.html";
    };
}




 