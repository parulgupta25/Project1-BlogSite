const jwt = require('jsonwebtoken')

const authorAuth = (req, res, next) => {
    try {
        let token = req.headers('x-api-key')
        if (!token) {
            res.status(403).send({ status: false, message: 'Missing authentication token in request' })
        }

        const decoded = jwt.verify(token, "Project-1")

        if (!decoded) {
            res.status(403).send({ status: false, message: 'Invalid authentication token in request' })
            return
        }
        req.authorId = decoded.authorId

        next()
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = authorAuth