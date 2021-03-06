// https://notherweb.github.io/search

$(document).ready(function(w) {
  $("#get-started").click(function (_this) {
    $("html, body").animate({
      scrollTop: 900+"px"
    }, 190);
  });
  $("#search-area").hide();
});
function searching1(_this) {
  if ($("#search").val()) {
    let results = "";
    var url = "https://en.wikipedia.org/w/api.php";


    var params = {
      action: "query",
      list: "search",
      srsearch: $("#search").val(),
      format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key) {
      url += "&" + key + "=" + params[key];
    });

    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      $("#search-area").show();
      for (var i = 0; i < response.query.search.length; i++) {
        results += '<tr><td style="min-width:120px"><h6>'+response.query.search[i].title+'</h6></td><td><h6>'+response.query.search[i].snippet+'....<br><a href= "http://en.wikipedia.org/wiki?curid='+response.query.search[i].pageid+'" target="_parent"> Read more </a></h6></td> </tr>'+"<br><br>";
      }
      document.getElementById('results').innerHTML = results;
    })
    .catch(function(error) {
      // console.log(error);
    });
  } else {
    $("#search").val("website");
    searching1();
  }
}
function searching2(_this) {
  if ($("#search").val()) {
    let results = "";
    var url = "https://api.stackexchange.com/search/advanced?site=stackoverflow.com&q="+$("#search").val();

    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      $("#search-area").show();
      for (var i = 0; i < response.items.length; i++) {
        let answer = response.items[i].answer_count;
        let view = response.items[i].view_count;
        let tags = "";
        for (var k = 0; k < response.items[i].tags.length; k++) {
          tags += '<span class="badge bg-danger" style="margin-right: 10px;">'+response.items[i].tags[k]+'</span>';
        }
        results += '<tr><td style="min-width:120px"><h6><img style="width: 30px; height: 30px; border-radius:100rem; background: #eee;" src="'+response.items[i].owner.profile_image+'"/><br>'+response.items[i].owner.display_name+'<br><a href= "'+response.items[i].link+'" target="_parent"> Read more </a></h6></td> <td style="max-width: 170px;"><h6 style="overflow: scroll; width: 100%; height: auto">'+response.items[i].title+'<br><i class="fa fa-comments"></i> '+answer+'<i style="padding-left:20px"></i>'+'<i class="fa fa-eye"></i> '+view+'<br>'+tags+'</h6></td></tr>'+"<br><br>";
      }
      document.getElementById('results').innerHTML = results;
    })
    .catch(function(error) {
      // console.log(error);
    });
  } else {
    $("#search").val("What is web development?");
    searching2();
  }
}
function menus(_this) {
  $("html, body").animate({
    scrollTop: 0
  }, 190);
}