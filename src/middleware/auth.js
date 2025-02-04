import jwt from 'jsonwebtoken'

const auth = () => {
    return (req, res, next) => {
            const { token } = req.headers;
            const decode = jwt.verify(token, 'HalaMadi');
            if (decode.role != 'admin') {
                return res.status(400).json({ message: 'Not authorized' })
            }
            req.id=decode.id;
            next();
    }
}
export default auth