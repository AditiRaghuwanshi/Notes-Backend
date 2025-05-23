import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userSchema = new Schema({
    fullName: {
       type: String
    },
    Email: {
       type: String
    },
    Password: {
        type: String
    },
    createdOn: {
        type: Date, 
        default: new Date().getTime()
    },
})

const User = mongoose.model("User", userSchema);
export default User;