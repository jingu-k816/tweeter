/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  //loops through tweets
  for(const tweet of tweets){
    //calls createTweetElement for each tweets
    const newTweet = createTweetElement(tweet);
    //takes return value and appends it to the tweets container
    $('#tweets-container').append(newTweet);
  }
}

const createTweetElement = function(tweet) {

  let $tweet = `
  <article>
    <header>
      <div>
        <h5>${tweet.user.name}</h5>
      </div>
      <p>${tweet.user.handle}</p>
    </header>
    <p>${tweet.content.text}</p>
    <footer>
      <span class="need_to_be_rendered" datetime="${tweet.created_at}">${moment(tweet.created_at).fromNow()}</span>
      <div class=icons-in-tweet>
        <i class="fas fa-flag"></i>
        <div>
          <i class="fas fa-retweet"></i>
        </div>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>
`
  return $tweet;
}

$(document).ready(function() {
  renderTweets(data);
  $("#tweet-input").on('submit', function(event){
    event.preventDefault();
    $.ajax('/tweets/', { method: 'POST', data: $(this).serialize() })
    .then(() => {console.log($(this).serialize())})
    .catch((error) => console.log("error: " , error))
  });
  timeago.render(document.querySelectorAll('.need_to_be_rendered'));
});
