const blogModel=require ('../models/blogModel')
const commentModel= require('../models/commentModel')



exports.newComment = async (req,res)=>{
    try{
        const id = req.body.id
        const blog = await blogModel.findById(id)
        if(!blog){
            return res.status(401).json({
            message:"Blog not found"
        })
        }
        const comment = new commentModel(req.body);
        blog.comments.push(comment._id);
        comment.post = blog._id

        // save the changes into the database
       await blog.save()
       await comment.save()

       // send a response message
       res.status(201).json({
        message: "The comment has been added successfully",
        data: comment
       })

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
exports.getOne = async (req,res)=>{
    try {

        // get the id
        const id = req.params.id

        // find the post with the id
        const blog = await commentModel.findById(id)
        if (!blog) {
            return res.status(404).json({
                error:"blog not found"
            })
        }

        res.status(200).json({
            messaeg: "viewing comment",
            data:blog
        })
        
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}


exports.getAllComment = async(req,res)=>{
    try {

        // get all post available in the database
        const allPost = await commentModel.find().select(commentModel._id, commentModel.post,  commentModel.comments)
        if (!allPost) {
            return res.status(404).json({
                error:"no post found"
            })
        }

        // throw a success message
        res.status(200).json({
            message:`there are ${allPost.length} comments availabe`,
            data:allPost
        })
        
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

exports.updateComment = async(req,res)=>{
    try {

        // get the post id
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                error:'you need to pass id'
            })
        }
        

        // find the post with the id and update
        const updates = await commentModel.findByIdAndUpdate(id,req.body,{new:true})
        if (!updates) {
            return res.status(404).json({
                error:"post not found"
            })
        }

        res.status(200).json({
            message: "post updated successfuly",
            data: updates
        })
        
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

exports.deleteComment = async(req,res)=>{
    try {

        // get the post id
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                error:'you need to pass  id '
            })
        }

        // find the post with the id and delete
        const deletePost = await commentModel.findByIdAndDelete(id)
        if (!deletePost) {
            return res.status(400).json({
                error:"could not delete this comment"
            })
        }

        // throw a success message
        res.status(200).json({
            message: "comment deleted successfuly"
        })

        
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}