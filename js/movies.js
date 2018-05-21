$(document).ready(function () {
	loadData();
});

var displayMovie = '';

function getNewYorkTimesApiUrl(isTextSearch, term)  {
  var url = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?api-key=aa6b434cdfd24541a23901a5043479de";
  return isTextSearch ? url + '&query=' + term : url;
}

function loadData () {

  $.ajax({
    url: getNewYorkTimesApiUrl(false),
    method: 'GET',
  }).done(function(response) {
    var data = response.results;
    var dataStore = localStorage.setItem('dataStore', JSON.stringify(data));
    displayData(data);

    $('#reviews').html(displayMovie);
    // Clear the content of displayMovie to avoid duplicates data. 
    displayMovie = '';

  }).fail(function(err) {
    throw err;
  });
}


function displayData(infoToDisplay) {
  for (i = 0; i < infoToDisplay.length; i++) {
    displayMovie += `<div id="reviewId" class="col-md-4">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top"  alt="Thumbnail [100%x225]" src="` + infoToDisplay[i].multimedia.src +`" data-holder-rendered="true">
      <div class="card-body">
        <h2>` + infoToDisplay[i].display_title + `</h2>
        <p class="card-text">` + infoToDisplay[i].headline + `</p>
        <div class="d-flex justify-content-between align-items-center">
          <div class="btn-group">
          <a onclick="selectedMovieReview('` + i + `')" ><button type="button" class="btn btn-sm btn-outline-secondary">View</button></a>
          </div>
            <small class="text-muted"> Rating: `+ infoToDisplay[i].mpaa_rating + `</small>
          </div>
        </div>
      </div>
    </div>`;
  }
}

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


function searchText() {
  var term = document.getElementById("searchTerm").value

  $.ajax({
    url: getNewYorkTimesApiUrl(true, term),
    method: 'GET',
  }).done(function(response) {
    var updatedInfo = response.results;
    displayData(updatedInfo);
    document.getElementById("reviews").innerHTML = '';

  $('#reviews').html(displayMovie);

  }).fail(function(err) {
    throw err;
  });
}

function gotoMainPage () {	  
  window.location = "index.html";
}