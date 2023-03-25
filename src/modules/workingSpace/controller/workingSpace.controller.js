import { asyncHandler } from "../../../services/asyncHandler.js";
import {create, find, findById } from "../../../../Database/DBMethods.js";
import { roomModel } from "../../../../Database/model/room.model.js";
import { bookingModel } from "../../../../Database/model/booking.model.js";
import cloudinary from "../../../services/cloudinary.js";
import { workSpaceModel } from "../../../../Database/model/workSpace.model.js";

// workingspace/room/booking

export const getWsRooms=asyncHandler(async(req,res,next)=>{
    const cursor = await workingSpaceModel.find().cursor();
    let allWorkspaces=[]
    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    let room=await find({model:roomModel,condition:{workspaceId:doc._id}})
    let newObj= doc.toObject()  // doc heya kol ws 3ndi 7wltaha l newObj 3shan hea json , wl newObj da b2a el array bta3 el room el 7b3to lel ws
    newObj.room=room
    allWorkspaces.push(newObj);
    }
    res.json({message:"Done",allWorkspaces})
})



// get a list of ws from db
export const getWorkSpaces=asyncHandler(async(req,res,next)=>{
    let workSpace=await find({model:workSpaceModel})
    res.status(200).json({message:"Done",workSpace})

})





export const getBookingHistoryToWs=asyncHandler(async(req,res,next)=>{
    let{workspaceId}=req.params
    const History=await find({model:bookingModel,'room.workingSpace':workspaceId})
    res.status(200).json({message:"Done",History})
})
    
export const feedback=asyncHandler( async (req, res, next) => {
    const workspaceId = req.params.id;
    const feedback = req.body.feedback;
  
    
      const workspace = await workSpaceModel.findById(workspaceId);
  
      workspace.feedback.push(feedback);
      await workspace.save();
  
      res.status(200).json(workspace);
    
  }); //3amel function 3ashan el feedback yet3amal men ay user w yet3amalo save fel model automatic
  // mesh e7na elly no7oto w e7na bene3mel create lel workspace










