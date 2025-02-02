import jwt from 'jsonwebtoken'

const auth = () => {
    return (req, res, next) => {
        try {
            const { token } = req.headers;
            const decode = jwt.verify(token, 'HalaMadi');
            if (decode.role != 'admin') {
                return res.status(400).json({ message: 'Not authorized' })
            }
            next();
        } catch (error) {
            return res.status(500).json({ message: 'Server Error', error })
        }
    }
}
export default auth