import ReviewUsers from "../../Model/ReviewUsers.js";

export const AddReview=async(req,res)=>{
  try {
const {userId}=req
    const { comment, rating } = req.body;
    if (!userId || !comment || !rating) {
      return res.status(400).json({ message: ' All Fields Is Empty' });
    }

    const newReview = new ReviewUsers({ userId, comment, rating });
    await newReview.save();

    res.status(201).json({newReview,success:true});
  } catch (error) {
    res.status(500).json({ message: 'حدث خطأ داخلي', error });
  }
};

export const getAllReview=async(req,res)=>{
  const allReviews=await ReviewUsers.find().populate("userId","-password")
  res.status(200).json({message:"this is kosmok",data:allReviews,success:true})

}

export const deleteAllReview=async(req,res)=>{
try {
  const deleteOk= await ReviewUsers.deleteMany()
  res.status(200).json({message:"allReviewBey",deleteOk})
} catch (error) {
  console.log(error)
}
}

export const deleteReview=async(req,res)=>{
try {
  const { id } = req.params;

  const deletedReview = await ReviewUsers.findByIdAndDelete(id)
  
  if (!deletedReview) {
    return res.status(404).json({ message: "i don't found Review" });
  }
  res.status(200).json({message:"Review is Bying",success:true})
} catch (error) {
 console.log(error) 
}

}