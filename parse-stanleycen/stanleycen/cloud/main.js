Parse.Cloud.define("sendEmail", function(request, response) {
  Parse.Config.get().then(function(config) {
    var sendgrid = require("sendgrid");
    sendgrid.initialize(config.get('SENDGRID_USERNAME'), config.get('SENDGRID_PASSWORD'));

    var name = request.params.name;
    var email = request.params.email;
    var subject = request.params.subject;
    var message = request.params.message;

    var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!regex.test(email)) {
      console.log("invalid email address", email);
      response.error('nope');
      return;
    }

    sendgrid.sendEmail({
     to: config.get('EMAIL_RECIPIENT'),
     from: email,
     fromname: name,
     subject: subject,
     text: "Name: "+name+"\n\nEmail: "+email+"\n\nSubject:\n"+subject+"\n\nMessage:\n\n"+message
     }, {
       success: function(httpResponse) {
         console.log(httpResponse);
         response.success("ok");
      },
       error: function(httpResponse) {
         console.error(httpResponse);
         response.error("nope");
      }
    });
  });
});