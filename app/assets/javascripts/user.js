$(function() {

    function appendUser(user) {
        var html = `<div class="chat-group-user clearfix">
                       <p class="chat-group-user__name">${ user.name }</p>
                       <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</div>
                    </div>`
        search_user_list.append(html);
    }

    $(".chat-group-form__input").on("keyup", function() {
      var input = $(".chat-group-form__input.user-search-field").val();
      
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input, group_users_id: users_id },
        dataType: 'json'
      })
  
      .done(function(users) {
        $(".user-search-result").empty();
        if (users.length !== 0 && input.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else if (input.length == 0) {
          $(".user-search-result").find('.chat-group-user.clearfix').remove();
        }
        else {
          appendErrorMessageToHTML("一致するユーザーが見つかりません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
   });
});