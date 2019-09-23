$(function() {
 var search_user_list = $("#user-search-result");
 var add_user_list = $(".chat-group-users.js-add-user");
    
      function appendUserId(users_id) {
        $('.chat-group-user.clearfix.js-chat-member').each(function(){
          var user_id = $(this).attr('id');
          users_id.push(user_id);
        });
        return users_id;
      }
    


    $(".chat-group-form__input").on("keyup", function() {
      var input = $(".search__query").val();
      var users_id = [];
      appendUserId(users_id);

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input, group_users_id: users_id },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
          if (users.length !== 0) {
            users.forEach(function(user){
              appendUser(user);
            });
          }
          else {
            appendErrorMessageToHTML("一致するユーザーが見つかりません");
          }
      })
    });
  });