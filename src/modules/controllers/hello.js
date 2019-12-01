const hello = ({
}) => {
    return async (req, res ,next) => {
        try {
            return res.status(200).json('message: hello');
        } catch (error) {
            return res.status(400).json('message: error');
        }
    }
}

module.exports = { hello };