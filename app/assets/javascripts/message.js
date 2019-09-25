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
        contentType: false,
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        //メッセージのリセット
        $('#new_message')[0].reset(); 
        //画面のスクロール
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      })
      .always(function(){
        $('.submit-btn').prop('disabled', false); //キャンセルコード
      })
      .fail(function(){
        alert('エラーが発生しました');
      })
    })

    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      last_message_id = $('.message:last').data('id')
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "groups/group_id/api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        console.log('success');
      })
      .fail(function() {
        console.log('error');
      });
    };
});


