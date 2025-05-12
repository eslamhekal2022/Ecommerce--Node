// models/Review.js
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional
  },
  { timestamps: true }
);

export default mongoose.model('Review', reviewSchema);
export const ReviewUsers = mongoose.model('Review', reviewSchema);
