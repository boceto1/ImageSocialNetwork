$('#btnLike').click(function(e){
    e.preventDefault();
    const imgID = $(this).data('id');

    $.post('/images/' + imgID + '/like')
      .done(data => {
        $('.likes-count').text(data.likes);
      });

});
