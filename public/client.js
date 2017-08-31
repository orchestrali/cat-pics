// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html


$(function() {
  console.log('hello world :o');
  var clicked = [];
  var tiles = $('.tile').length;
  console.log(tiles);

  
  
  $('.trigger.n2, .trigger.n3, .trigger.n4').hover(function() {
    //on mouse enter, translate kittenpics 2+:
    $(this).next().css('transform', 'translateX(-298px)');
    
  }, function() {
    var tilenum = $('.tile').index($(this).parents('.tile'));
    var catnum = $(this).siblings('.wrapper').index($(this).next()) + 1;
    var ofnum = $(this).siblings('.wrapper').length;
    //on mouse leave, if cat picture hovered over is not in clicked array translate it back to its 0 position
    if ($.inArray('tile' + tilenum + 'cat' + catnum, clicked) === -1) {
    $(this).next().css('transform', 'translateX(0px)');
  }
  });
  
  
  
  $('.trigger').on('click', kittenclick);
  //document.querySelector('.trigger').addEventListener('touchstart', kittentouch);
  
  
  
  function kittenclick() {
    var tilenum = $('.tile').index($(this).parents('.tile'));
    console.log(tilenum);
    var catnum = $(this).siblings('.wrapper').index($(this).next()) + 1;
    var ofnum = $(this).siblings('.wrapper').length;
    
    
    for (var i = 0; i < clicked.length; ++i) {
      if (clicked[i] === 'tile' + tilenum) {
        //if cat clicked is in a tile already in clicked array, 
        //find the cat number already in the array and translate it back to its 0 position
        let catnuma = clicked[i+1].charAt(clicked[i+1].length - 1);
        console.log('cat' + catnuma);
        console.log($(this).siblings('.wrapper:eq(' + (catnuma - 1) + ')'));
        $(this).siblings('.wrapper:eq(' + (catnuma - 1) + ')').css('transform', 'translateX(0px)');
        //then remove the previously clicked cat from the clicked array:
        clicked.splice(i, 2);
      }
    }
  
    //$(this).siblings('.wrapper:eq(1)').css('border', '4px solid red');
    if (catnum >= 2) {
      //when cat 2+ is clicked, translate it (for touchscreens, no mouseover) and add it to clicked array
      $(this).next().css('transform', 'translateX(-298px)');
      clicked.push('tile' + tilenum);
      clicked.push('tile' + tilenum + 'cat' + catnum);
    }
    console.log(clicked);
  }
  
/*  $.get('/dreams', function(dreams) {
    dreams.forEach(function(dream) {
      $('<li></li>').text(dream).appendTo('ul#dreams');
    });
  });

  $('form').submit(function(event) {
    event.preventDefault();
    var dream = $('input').val();
    $.post('/dreams?' + $.param({dream: dream}), function() {
      $('<li></li>').text(dream).appendTo('ul#dreams');
      $('input').val('');
      $('input').focus();
    });
  });
  
    function getvars() {
    let tilenum = $('.tile').index($(this).parents('.tile'));
    //console.log(tilenum);
    for (var i = 1; i < 5; ++i) {
      if ($(this).next().hasClass('of' + i)) {
        ofclass = i;
      }
      if ($(this).next().hasClass('n' + i)) {
        nclass = i;
      }
    }
    
  }
  
*/

});
