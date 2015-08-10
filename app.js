$(function (){

  var $signers = $('#signers');
  var $first_name = $('#first_name');
  var $last_name = $('#last_name');
  var $age = $('#age');
  var $address = $('#address');
  var $email = $('#email');
  var $quote = $('#quote');
  var $count = $('#counter');
  var $print_quote = $('#printquote');

var reset = function() {
  $('#signers').val('');
  $('#first_name').val('');
  $('#last_name').val('');
  $('#age').val('');
  $('#address').val('');
  $('#email').val('');
  $('#quote').val('');
  $('#counter').val('');
  $('#printquote').val('');
};


$.ajax({
  type: 'GET',
  url: 'https://pacific-tundra-1729.herokuapp.com/signers/',
  success: function(signers) {
    $.each(signers, function(i, signer) {
      // $signers.append('<li>'+ signer.first_name +' '+ signer.last_name +'</li>');
      $signers.append('<h2 data-id="' + signer.id + '">' + signer.first_name + ' ' + signer.last_name + '</h2>');
      $signers.append('<p data-id="' + signer.id + '">' + signer.quote + '</p>');
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
    url: 'https://pacific-tundra-1729.herokuapp.com/signers/',
    data: signer,
    success: function(newSigner) {
      $signers.append('<h2 data-id="' + signer.id + '">' + signer.first_name + ' ' + signer.last_name + '</h2>');
      $signers.append('<p data-id="' + signer.id + '">' + signer.quote + '</p>');
      alert('Thank you for caring');
      reset();
      getCount();
    },
    error: function() {
      alert('I\'m sorry but your submission information is invalid');
    }
    });
  });

var getCount = function(){
    $.ajax({
    type: 'GET',
    url: 'https://pacific-tundra-1729.herokuapp.com/signers-count',
    success: function(count) {
      $count.text(count.count);
     }
    });
}
$('#counter').show(function (){
  getCount();
});

  $("#signers").on('click', 'li', function(event){
    var id = $(this).data('id');
    $.ajax({
      url: 'https://pacific-tundra-1729.herokuapp.com/signers/' + id,
      type: 'GET',
    }).done(function(response){
      $("#printquote").text(response.quote)
    });
  });
});
