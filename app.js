$(function (){

  var $signers = $('#signers');
  var $first_name = $('#first_name');
  var $last_name = $('#last_name');
  var $age = $('#age');
  var $address = $('#address');
  var $email = $('#email');
  var $quote = $('#quote');
  var $count = $('#counter');

$.ajax({
  type: 'GET',
  url: 'http://localhost:3000/signers',
  success: function(signers) {
    $.each(signers, function(i, signer) {
      // $signers.append('<li>'+ signer.first_name +' '+ signer.last_name +'</li>');
      $signers.append('<li><a href="http://localhost:3000/signers/' + signer.id + '">' + signer.first_name + ' ' + signer.last_name + '</a></li>');
  });
},
  error: function() {
    alert('error loading signers');
  }
});

$('#submit').on('click', function() {
  var signer = {signer:{
    first_name: $first_name.val(),
    last_name: $last_name.val(),
    age: $age.val(),
    address: $address.val(),
    email: $email.val(),
    quote: $quote.val(),
  }};

  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/signers',
    data: signer,
    success: function(newSigner) {
      $signers.append('<li>'+ newSigner.first_name +' '+ newSigner.last_name +'</li>');
      alert('Thank you for caring');
    },
    error: function() {
      alert('I\'m sorry but your submission information is invalid');
    }
    });
  });

  $('#counter').show(function (){

    $.ajax({
    type: 'GET',
    url: 'http://localhost:3000/signers-count',
    success: function(count) {
      $count.text(count.count);
    }
    });
  });

// $('#signers li a').on('click', function(e) {
// e.preventDefault();
//   });
});
