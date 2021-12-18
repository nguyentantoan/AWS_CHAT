import mongoose from "mongoose";

let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
  senderId: String,
  receiverId:String, 
  type: String,
  isRead: { type: Boolean, default: false },
  createdAt: { type: Number, default: Date.now },
});

NotificationSchema.statics = {
  createNew(item) {
    return this.create(item);
  },

  removeRequestContactSentNotification(senderId, receiverId, type) {
    return this.deleteOne({
      $and:[
        {"senderId": senderId},
        {"receiverId": receiverId},
        {"type": type}
      ]
    }).exec();
  },

  getByUserIdAndLimit(userId, limit) {
    return this.find({
      "receiverId": userId
    }).sort({"createdAt": -1}).limit(limit).exec();
  },


  countNotifUnread(userId) {
    return this.count({
      $and:[
        {"receiverId": userId},
        {"isRead":false}
      ]
    }).exec();
  },


  markAllAsRead(userId, targetUsers){
    return this.updateMany({
      $and:[
        {"receiverId": userId},
        {"senderId": {$in: targetUsers}},
      ]
    }, {"isRead": true}).exec();
  }

};

const NOTIFICATION_TYPE = {
  ADD_CONTACT: "add_contact",
  APPROVE_CONTACT: "approve_contact",
};

const NOTIFICATION_CONTENTS = {
  getContent: (notificationType, isRead ,userId, username,userAvatar) => { 
    if(notificationType === NOTIFICATION_TYPE.ADD_CONTACT){
      if(!isRead){
        return  ` <div class="notif-readed-false" data-uid="${userId}">
                <img class="avatar-small" src="images/users/${userAvatar}" alt="">
                <strong>${username}</strong> đã gửi cho bạn một lời mời kết bạn!
                </div>`;
      }
      return  ` <div data-uid="${userId}">
      <img class="avatar-small" src="images/users/${userAvatar}" alt="">
      <strong>${username}</strong> đã gửi cho bạn một lời mời kết bạn!
      </div>`;
    }

    if(notificationType === NOTIFICATION_TYPE.APPROVE_CONTACT){
      if(!isRead){
        return  ` <div class="notif-readed-false" data-uid="${userId}">
                <img class="avatar-small" src="images/users/${userAvatar}" alt="">
                <strong>${username}</strong> đã chấp nhận lời mời kết bạn
                </div>`;
      }
      return  ` <div data-uid="${userId}">
      <img class="avatar-small" src="images/users/${userAvatar}" alt="">
      <strong>${username}</strong> đã chấp nhận lời mời kết bạn
      </div>`;
    }
    return "No matching with any notification type";
  }
};


module.exports = {
  model:mongoose.model("notification", NotificationSchema),
  types: NOTIFICATION_TYPE,
  contents: NOTIFICATION_CONTENTS,
};
