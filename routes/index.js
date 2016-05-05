function getClientIp(req) {

  var ipAddress;
  // Amazon EC2 / Heroku workaround to get real client IP
  var forwardedIpsStr = req.header('x-forwarded-for');
  if (forwardedIpsStr) {

    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // Ensure getting client IP address still works in
    // development environment
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};

/*
 * GET home page.
 */

exports.index = function(req, res) {
  res.render('home', { layout: 'home' });
};

exports.faq = function(req, res) {
  res.render('faq', { layout: 'second' });
};

exports.success = function(req, res) {
  var name = req.body.os0;
  var to_email = req.body.os1;
  var from_email = req.body.os2;
  var message = req.body.custom;
  console.log("Message from Paypal");
  console.log(name + " " + to_email + " " + from_email + " " + message);
  res.render('success', { layout: 'second' });

};
