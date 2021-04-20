$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const maxCharLength = 140;
    //Stores the length of the textarea tag using this keyword
    const textLength = $(this).val().length;
    //Stores the information about the output element in object form
    const counter = $(this).siblings().children().next();
    const remainingChars = maxCharLength - textLength;

    //re-writes the available characters left for each tweet.
    counter.text(remainingChars);
    
    charCountChecker(remainingChars, counter);
  })
});

//Function that will add the class or delete the class depending on the amount of characters left for each tweet
const charCountChecker = (remainingChars, counter) => {
  if (remainingChars < 0) {
    counter.addClass('changeToRed');
  } else{
    counter.removeClass('changeToRed');
  }
  return;
}