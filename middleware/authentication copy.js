const jwt= require('jsonwebtoken')
function authenticateUser(req, res, next) {
const bearerHeader = req.headers['authorization'];
if (typeof bearerHeader !== 'undefined') {
const bearerToken = bearerHeader.split(' ')[1];
req.token = bearerToken;
jwt.verify(req.token, 'your-secret-key', (err, data) => {
if (err) {
res.send(err.message);
} else {
next();
}
});

} else {
res.sendStatus(403);
}
}
module.exports = authenticateUser ;