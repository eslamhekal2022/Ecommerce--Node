// models/contactModel.js
import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  message: { type: String, required: true },
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
