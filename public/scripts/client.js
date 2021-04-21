/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function(tweets) {
  //deletes the existing tweet so that only the new tweet will be posted.
  $('#tweets-container').empty();
  //loops through tweets
  for (const tweet of tweets) {
    //calls createTweetElement for each tweets
    const newTweet = createTweetElement(tweet);
    //takes return value and appends it to the tweets container
    $('#tweets-container').prepend(newTweet);
  }
};

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  let $tweet = `
  <article>
    <header>
      <div>
        <img src="${tweet.user.avatars}"/>
        <h5>${tweet.user.name}</h5>
      </div>
      <p>${tweet.user.handle}</p>
    </header>
    <p>${escape(tweet.content.text)}</p>
    <footer>
      <span class="need_to_be_rendered" datetime="${tweet.created_at}"></span>
      <div class=icons-in-tweet>
        <i class="fas fa-flag"></i>
        <div>
          <i class="fas fa-retweet"></i>
        </div>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
`;
  return $tweet;
};

const loadTweets = function() {
  const submitButton = $('button');
  $.ajax('/tweets', { method: 'GET' })
    .then(function(moreTweet) {
      renderTweets(moreTweet);
      timeago.render(document.querySelectorAll('.need_to_be_rendered'));
    })
    .catch((e) => console.log(("error: ", e)));
};

const submitTweets = function() {

  $("#tweet-input").on('submit', function(event) {
    event.preventDefault();
    if ($('#tweet-text').val() === "") {
      alert("Text is empty.");
    } else if ($('#tweet-text').val().length > 141) {
      alert("Your text exceeds 140 characters.");
    } else {
      $.ajax('/tweets', { method: 'POST', data: $(this).serialize() })
        .then(() => {
          location.reload();
          loadTweets();
        })
        .catch((error) => console.log("error: " , error));
    }
  });
};

$(document).ready(function() {
  submitTweets();
  loadTweets();
});
