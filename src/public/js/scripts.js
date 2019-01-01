$('#btnLike').click(function(e){
    e.preventDefault();
    const imgID = $(this).data('id');

    $.post('/images/' + imgID + '/like')
      .done(data => {
        $('.likes-count').text(data.likes);
      });

});

$('#postComment').hide();
$('#btn-toggle-comment').click(e =>{
    $('#postComment').slideToggle();
})

$('#btnDelete').click(function(e){
  e.preventDefault();
  let $this = $(this);
  const response= confirm('Are you sure you want to delete this image?')

  if(response){
    let imageId = $this.data('id');
    
    $.ajax({
      url:`/images/${imageId}`,
      type:'DELETE'
    })
    .done(result=>{
      console.log(result);
      $(location).attr('href', '/')
    })
  }
})
