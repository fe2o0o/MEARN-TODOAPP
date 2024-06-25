import jwt from 'jsonwebtoken'

export const auth = (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res
            .status(401)
            .json({ status: "faild", message: "auAuthorized" });
    }
    jwt.verify(token, `${process.env.SECRET_KEY}`, (err, decode) => {
        if (err) {
            return res
                .status(401)
                .json({ status: "faild", message: "in vaild token" });
        }

        req.userId = decode._id;
        next()
    });
}