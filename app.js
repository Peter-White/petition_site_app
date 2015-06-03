$(function (){

  var $signers = $('#signers');
  var $first_name = $('#first_name');
  var $last_name = $('#last_name');
  var $age = $('#age');
  var $address = $('#address');
  var $email = $('#email');
  var $quote = $('#quote');

  $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/signers',
    success: function(signers) {
      $.each(signers, function(i, signer) {
        $signers.append('<li>first name: '+ signer.first_name +', last name: '+ signer.last_name +'</li>');
    });
  },
  error: function() {
    alert('error loading signers');
  }
});

  $('#submit').on('click', function() {

    var signer = {
      first_name: $first_name.val(),
      last_name: $last_name.val(),
      age: $age.val(),
      address: $address.val(),
      email: $email.val(),
      quote: $quote.val(),
    };

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/signers',
      data: signer,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(newSigner) {
        $signers.append('<li>first name: '+ newSigner.first_name +', last name: '+ newSigner.last_name +'</li>');
      },
      error: function() {
        alert('error saving signers');
      }
      });
    });

  });
