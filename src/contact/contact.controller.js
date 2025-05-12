import Contact from "../../Model/contact.model.js";


export const addContact = async (req, res) => {
    try {
      const userId = req.userId;
      const { message } = req.body;
  
      const contact = new Contact({ userId, message });
      await contact.save();
  
      req.io.emit("new-contact", {
        message: "📩 رسالة جديدة من مستخدم",
        userId,
        contactId: contact._id,
      });
  
      res.status(200).json({ message: "Contact is PowerFul", success: true });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "حدث خطأ", success: false });
    }
  };
  
  

export const getContacts=async(req,res)=>{
    const contacts=await Contact.find().populate("userId","-password ")
    res.status(200).json({
        message:"aho all contacts",
        success:true,
        data:contacts
    })
}

export const deleteAllContacts=async(req,res)=>{
await Contact.deleteMany()
res.status(200).json({message:"Bye is Contact",success:true})
}

export const deleteContact=async(req,res)=>{
  try {
    const { id } = req.params;
  await Contact.findByIdAndDelete(id)
  res.status(200).json({message:"Contact Went Bye",success:true})
  } catch (error) {
  console.log(error)
  }
}