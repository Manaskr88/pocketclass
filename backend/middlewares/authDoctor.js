import jwt from 'jsonwebtoken';


// doctor authentication middlware

const authDoctor = async (req, res, next) => {

    try {

        const { dtoken } = req.headers;

        if (!dtoken) {
            return res.json({ success: false, message: 'Not authorised' })
        }

        const decodeToken = jwt.verify(dtoken , process.env.JWT_SECRET)

       req.body.docId = decodeToken.id
       

        next();



    } catch (error) {

        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export default authDoctor
