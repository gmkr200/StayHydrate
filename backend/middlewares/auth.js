const isAuthorized = async (req, res, next) => {

    let token = req.cookies.jwt

    if (token) {
        next();
    } else {
        res.status(401).json({ message: 'You are not authorized and no token. Please Login' });
    }
}

module.exports = { isAuthorized }