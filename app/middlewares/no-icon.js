module.exports = function() {
  return function(req, res, next) {
    if (req.url === '/favicon.ico') {
      // No favicon middleware
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });

      res.end('');
    } else {
      next();
    }
  };
};
