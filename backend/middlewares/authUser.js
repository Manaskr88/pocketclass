import jwt from 'jsonwebtoken';


// user authentication

const authUser = async (req, res, next) => {

    try {

        const { token } = req.headers;

        if (!token) {
            return res.json({ success: false, message: 'Not authorised' })
        }

        const decodeToken = jwt.verify(token, process.env.JWT_SECRET)

       req.body.userId = decodeToken.id
       

        next();



    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export default authUser
