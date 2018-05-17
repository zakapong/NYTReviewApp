

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
  console.log(data);

  displayMovie = `<div class="col-md-4">
  <div class="card mb-4 box-shadow">
    <img class="card-img-top"  alt="Thumbnail [100%x225]" style="height: 225px; width: 100%; display: block;" src="` + data[1].multimedia.src +`" data-holder-rendered="true">
    <div class="card-body">
      <h2>` + data[1].display_title + `</h2>
      <p class="card-text">` + data[1].summary_short + `</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
        </div>
        <small class="text-muted"> Rating: `+ data[1].mpaa_rating + `</small>
      </div>
    </div>
  </div>
</div>`;
  $('#reviews').html(displayMovie); 

}).fail(function(err) {
  throw err;
});