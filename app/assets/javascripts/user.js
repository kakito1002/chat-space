$(function() {
    $(".user-search-field").on("keyup", function() {
      var input = $(".user-search-field").val();
      
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input, group_users_id: users_id },
        dataType: 'json'
      })
  
      .done(function(users) {
        $("#user-search-result").empty();
        if (users.length !== 0 && input.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else if (input.length == 0) {
          $("#user-search-result").find('.chat-group-user.clearfix').remove();
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