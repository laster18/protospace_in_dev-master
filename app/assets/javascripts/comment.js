$(function(){

  function appendHTML(comment) {
    var html = `<div class="comment clearfix" data-id=${comment.id}>
                  <div class="comment-left">
                    <img src="${comment.user_avatar}" alt="profile_pohoto" class="media-object"
                    style="width: 70px; height: 70px;">
                  </div>
                  <div class="comment-right">
                    <div class="comment-right__user-name">
                      ${comment.user_name}
                    </div>
                    <div class="comment-right__text">
                      ${comment.content}
                    </div>
                  </div>
                </div>`
    $('.comments-body').append(html);
    $('.comment-title').text(`Comment(${comment.count})`);
  }

  $('#new_comment').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      appendHTML(data);
      $('.message').val('');
      $('.send-bottun').prop('disabled', false);
      $('.comments-body').animate({scrollTop: $('.comments-body')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('コメントを入力してください');
      $('.send-bottun').prop('disabled', false);
    })
  });

  var interval = setInterval(function(){
    if (location.href.match(/\/prototypes\/\d+\/comments/)) {
      var commentId = $('.comment:last').data('id');
      $.ajax({
        url: location.href,
        type: "GET",
        data: {
          id: commentId
        },
        dataType: 'json',
      })
      .always(function(comments){
        if (comments.length !== 0) {
          comments.forEach(function(comment){
            appendHTML(comment);
          });
          $('.comments-body').animate({scrollTop: $('.comments-body')[0].scrollHeight}, 'fast');
        }
      })
    } else {
      clearInterval(interval);
  }},5000);
});

