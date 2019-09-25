class Api::MessagesController < AoolicationController
    def index
        group = Group.find(params[group_id])
        last_message_id = params[:id].to_i
        @message = group.message.includes(:user).where("id > #{last_messages_id}")
    end
end