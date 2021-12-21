import express from "express";
import { home, auth, user, contact,notification, message, groupChat } from "./../controllers/index";
import { authValid, userValid, contactValid, messageVal, groupChatVal } from "./../validation/index";
import passport from "passport";
import initPassportLocal from "./../controllers/passportController/local";
import initPassportFacebook from "./../controllers/passportController/facebook";
import initPassportGoogle from "./../controllers/passportController/google";


//init all passport
initPassportLocal();
initPassportFacebook();
initPassportGoogle();

let router = express.Router();

//Ham xu ly router cho app
let initRouters = (app) => {

  router.get("/login-register", auth.checkLoggedOut, auth.getLoginRegister);
  router.post("/register", auth.checkLoggedOut, authValid.register, auth.postRegister);
  router.get("/verify/:token", auth.checkLoggedOut, auth.verifyAccount);

  router.post("/login", auth.checkLoggedOut, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login-register",
    successFlash: true,
    failureFlash: true,
  }));

  // router.get("/auth/facebook", auth.checkLoggedOut, passport.authenticate("facebook", { scope: ["email"] }));
  // router.get("/auth/facebook/callback", auth.checkLoggedOut, passport.authenticate("facebook", {
  //   successRedirect: "/",
  //   failureRedirect: "/login-register",
  // }));

  // router.get("/auth/google", auth.checkLoggedOut, passport.authenticate("google", { scope: ["email"] }));
  // router.get("/auth/google/callback", auth.checkLoggedOut, passport.authenticate("google", {
  //   successRedirect: "/",
  //   failureRedirect: "/login-register",
  // }));

  router.get("/", auth.checkLoggedIn, home.getHome);
  router.get("/logout", auth.checkLoggedIn, auth.getLogout);
  router.put ("/user/update-avatar", auth.checkLoggedIn, user.updateAvatar);
  router.put ("/user/update-info", auth.checkLoggedIn, userValid.updateInfo, user.updateInfo);
  router.put ("/user/update-password", auth.checkLoggedIn, userValid.updatePassword, user.updatePassword);
  
  router.get ("/contact/find-users/:keyword", auth.checkLoggedIn, contactValid.findUsersContact,  contact.findUsersContact);
  router.post ("/contact/add-new", auth.checkLoggedIn, contact.addNew);
  router.delete ("/contact/remove-contact", auth.checkLoggedIn, contact.removeContact);
  router.delete ("/contact/remove-request-contact-sent", auth.checkLoggedIn, contact.removeRequestContactSent);
  router.delete ("/contact/remove-request-contact-received", auth.checkLoggedIn, contact.removeRequestContactReceived);
  router.put ("/contact/approve-request-contact-received", auth.checkLoggedIn, contact.approveRequestContactReceived);
  router.get ("/contact/search-friends/:keyword", auth.checkLoggedIn, contactValid.searchFriends,  contact.searchFriends);
  

  router.put ("/notification/mark-all-as-read", auth.checkLoggedIn, notification.markAllAsRead);

  router.post("/message/add-new-text-emoji", auth.checkLoggedIn, message.addNewTextEmoji);
  
  router.post("/message/add-new-image", auth.checkLoggedIn, message.addNewImage);

  router.post("/message/add-new-attachment", auth.checkLoggedIn, message.addNewAttachment);

  router.post("/groupChat/add-new", auth.checkLoggedIn,groupChatVal.addNewGroup, groupChat.addNewGroup);


  return app.use("/", router);
};

module.exports = initRouters;
