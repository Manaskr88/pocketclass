import jwt from 'jsonwebtoken';


// admin authentication

const authAdmin = async (req, res, next) => {

    try {

        const { atoken } = req.headers;

        if (!atoken) {
            return res.json({ success: false, message: 'Not authorised' })
        }

        const decodeToken = jwt.verify(atoken, process.env.JWT_SECRET)

        if (decodeToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {

            return res.json({ success: false, message: 'Not authorised' })

        }

        next();



    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export default authAdmin