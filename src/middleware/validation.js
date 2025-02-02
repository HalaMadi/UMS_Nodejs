
const validation = (schema) => {
    return (req, res, next) => {

        const validate = schema.validate(req.body, { abortEarly: false })
        if (validate.error) {
            return res.status(400).json({ message: 'Validation error', error: validate.error.details })
        } else {
            next();
        }
    }
}
export default validation