const APP = require('./app/server');
const PORT = process.env.PORT || 8080;
const IP_BIND = process.env.IP || '0.0.0.0';

APP.listen(PORT, IP_BIND, () => console.log(`Server running on http://${IP_BIND}:${PORT}/`));
