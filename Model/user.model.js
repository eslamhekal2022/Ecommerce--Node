import  mongoose  from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin',"moderator"],
    default: 'admin',
  },
  image: {
    type: String,
    default: '',
  },
},{timestamps: true});




export const userModel = mongoose.model('User', UserSchema);
