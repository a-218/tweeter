$(document).ready(function() {
  // --- our code goes here ---
  $('h2').on('click',function(event){
    console.log(event)
  });
  
  $('textarea').on('click',function(event){
    console.log(event)
  });

  $('textarea').on('input',function(){

    //finding the length of the entered text
    let count = $(this).val().length

    //calling on the parent and children to access the class text count.
    let counterTag = $(this).parent().children('.text-area').children('.text-count');

    // set the new value

    counterTag.html(140 - count);

    // get the new value
    let x = counterTag.html();
    
    //changing the number counter to red
    if (x < 0){
    
      counterTag.css('color', 'red');
    }
  
  });  

  $('.text-count').on('click', function(){

    console.log($(this).val());
    
  });
 
 
});