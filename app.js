$(function (){

  var $signers = $('#signers');
  var $first_name = $('#first_name');
  var $last_name = $('#last_name');
  var $age = $('#age');
  var $street = $('#street');
  var $city = $('#city');
  var $zip = $('#zip');
  var $email = $('#email');
  var $quote = $('#quote');
  var $count = $('#footer');

var reset = function() {
  $('#signers').val('');
  $('#first_name').val('');
  $('#last_name').val('');
  $('#age').val('');
  $('#street').val('');
  $('#city').val('');
  $('#zip').val('');
  $('#email').val('');
  $('#quote').val('');
  $('#counter').val('');
};


$.ajax({
  type: 'GET',
  url: 'http://localhost:3000/signers/',
  success: function(signers) {
    $.each(signers, function(i, signer) {
      $signers.append('<h2 data-id="' + signer.id + '">' + signer.first_name + ' ' + signer.last_name + '</h2>');
      $signers.append('<p data-id="' + signer.id + '">' + signer.quote + '</p>');
  });
},
  error: function() {
    alert('error loading signers');
  },
});

$('#submit').on('click', function() {
  var signer = {signer:{
    first_name: $first_name.val(),
    last_name: $last_name.val(),
    age: $age.val(),
    street: $street.val(),
    city: $city.val(),
    zip: $zip.val(),
    email: $email.val(),
    quote: $quote.val(),
  }};

  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/signers/',
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
    url: 'http://localhost:3000/signers-count',
    success: function(count) {
      $count.text(count.count + " Contributers");
     }
    });
}
$('#footer').show(function () {
  getCount();
});
});
