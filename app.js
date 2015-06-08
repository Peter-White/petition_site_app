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
  url: 'http://localhost:3000/signers',
  success: function(signers) {
    $.each(signers, function(i, signer) {
      // $signers.append('<li>'+ signer.first_name +' '+ signer.last_name +'</li>');
      $signers.append('<li data-id="' + signer.id + '">' + signer.first_name + ' ' + signer.last_name + '</li>');
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
      $signers.append('<li data-id="' + newSigner.id + '">' + newSigner.first_name +' '+ newSigner.last_name +'</li>');
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
    url: 'http://localhost:3000/signers-count',
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
      url: 'http://localhost:3000/signers/' + id,
      type: 'GET',
    }).done(function(response){
      $("#printquote").text(response.quote)
    });
  });
});
