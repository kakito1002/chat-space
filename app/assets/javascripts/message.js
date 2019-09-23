$(document).on('turbolinks:load', function(){
    function buildHTML(message){
      var content = message.content ? `${ message.content }` : "";
      var img = message.image ? `<img src= ${ message.image }>` : "";
      var html =  `<div class="message" data-id=${message.id}>
                    <div class="upper-info">
                      <p class="upper-info__user-name">
                        ${message.user_name}
                      </p>
                      <p class="upper-info__date">
                        ${message.date}
                      </p>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${content}
                      </p>
                      <img class="lower-message__image">
                        ${img}
                      </img>
                    </div>
                  </div>`
      return html;
    }

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var message = new FormData(this);;
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: message,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('#message_content').val(''); 
        scrollBottom();
        //スクロール
        function scrollBottom(){
          var target = $('.message').last();
          var position = target.offset().top + $('.messages').scrollTop();
          $('.messages').animate({
            scrollTop: position
          }, 300, 'swing');
        }
      })
      .always(function(){
        $('.submit-btn').prop('disabled', false); //キャンセルコード
      })
      .fail(function(){
        alert('エラーが発生しました');
      })
    })
});


