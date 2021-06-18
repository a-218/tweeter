/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {

  const renderTweets = function (tweets) {
    //define teh tweet container following the index html as a tweet container
    $('.tweet-container').empty() ;

    const tweetContainer = $('.tweet-container');

    // loops through tweets

    tweets.forEach(tweet => {
      tweetContainer.prepend(createTweetElement(tweet));
    });

  }


  const createTweetElement = function (tweet) {
    //taking in the tweet data and pass into template literal into the html format/
    
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    let html = `
  
                <!-- <section class="tweet-containers"> -->
              <article>
                <div class='header'>
                    <p class="icon"> <img src = ${escape(tweet.user.avatars)} </p>
                    <p class='name'> ${escape(tweet.user.name)}</p>
                    <p class='tweet-handle'>${escape(tweet.user.handle)}</p><!-- include header-->
                </div>

                <h3 class='tweet'>${escape(tweet.content.text)}</h3>
                <span class ='line'></span>

                <footer class='foot'>
                    <div>
                        <span class="time-ago" >${timeago.format(escape(tweet.created_at))}</span>
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

  const loadTweets = function () {

    $.ajax({   

      url: '/tweets', //acutal server route 
      method: 'GET',
      data: { format: 'json' },
      dataType: "json",
      success: function (data) {
        //if request if made successfully then the response represent the data
        //render and output the data
        renderTweets(data);

      }
    })
  }
  loadTweets();


  $("form").on("submit", function (event) {  //form submission--- $this referring to the form
    event.preventDefault();
    console.log("the default event result has been prevented");
    $('.error').hide();
    $('.error-2').hide();
    const formData = $(this).serialize()

    ////Validation Error check here
    let form = formData.replace("text=", "");

    if (form.length === 0) {
      $('.error').show();
      return;
    }

    if (form.length > 140) {
      $('.error-2').show();
      return;
    }


    ///posting teh tweetts
    $.ajax({   //ajax sending serialize data to the tweets route on the actual website.

      url: '/tweets', //acutal server route 
      method: 'POST',
      data: formData,
    })
    .then(
        function (latestTweet) {
          
          loadTweets();
    


        });

        //change the text box to empty and number back to 140 after submit
        $('#tweet-text').val('')
        $('.text-count').text('140')
  });



});



