/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

$(document).ready(function () {
  const renderTweets = function (tweets) {
    //define teh tweet container following the index html as a tweet container
    const tweetContainer = $('.tweet-container')
    // loops through tweets
    tweets.forEach(tweet => {
      tweetContainer.append(createTweetElement(tweet));
    });

  }


  const createTweetElement = function (tweet) {
    //taking in the tweet data and pass into template literal into the html format/

    let html = `
  
                <!-- <section class="tweet-containers"> -->
              <article>
                <div class='header'>
                    <p class="icon"> <img src = ${tweet.user.avatars} </p>
                    <p class='name'> ${tweet.user.name}</p>
                    <p class='tweet-handle'>${tweet.user.handle}</p><!-- include header-->
                </div>

                <h3 class='tweet'>${tweet.content.text}</h3>
                <span class ='line'></span>

                <footer class='foot'>
                    <div>
                        <span class="time-ago" >${timeago.format(tweet.created_at)}</span>
                    </div>

                <div class='tweet-icons'>
                    <i class="fas fa-flag"></i>
                    <i class="fas fa-retweet"></i>
                    <i class="fas fa-heart"></i>
                </div>
                </footer>
                <!-- </section> -->
              </article>
           
  `
    return html;
  }



  const loadTweets = function (){ 

    $.ajax({   //ajax sending serialize data to the tweets route on the actual website.
      url: '/tweets', //acutal server route 
      method: 'GET',
      data:{
        format: 'json'
      },
      dataType: "json",
      success: function(data){
        //if request if made successfully then the response represent the data

        //$( "#result" ).empty().append( response );
        console.log('response from the GET', data);
        renderTweets(data);
        //return data;
    }
    })
  }
  loadTweets();

  //renderTweets(data);



  $("form").on("submit", function (event) {  //form submission--- $this referring to the form
    event.preventDefault();
    console.log("the default event result has been prevented");
    //const $button = $('.tweet-button'); 
    const formData = $( this ).serialize() 

    
    $.ajax({   //ajax sending serialize data to the tweets route on the actual website.
        url: '/tweets', //acutal server route 
        method: 'POST',
        data: formData
      })
      .then(
        function () {
        console.log('Success:', formData);
      });
  });
});



