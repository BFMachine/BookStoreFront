import jwt from "jsonwebtoken";

export default function isExpTokenValid(token) {

    if (!token)
        return false;

    try {
        let decodedToken = jwt.decode(token, {complete: true}); 
        let dateExpToken = new Date(decodedToken.payload.exp);

        if (dateExpToken < new Date())
            return false;
        return true;

    } catch (err) {
        console.error("Error in Token valid check");
        return false;
    }
}
