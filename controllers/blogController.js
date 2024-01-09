const blogModel = require("../models/blogModel")

exports.createdPost = async(req,res)=>{
    try{
        const {title,desc}= req.body
        const newPost = await blogModel.create({
            title,
            desc
        })
        res.status(201).json({
            message:'blog not successsfully',
            data:newPost
        })

    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
exports.getOne=async (req,res)=>{
    try{
        const id = req.params.id
        const blog = await blogModel.findById(id).populate('comments')
        if(!blog){
            return res.status(404).json({
                message:'blog not found'
            })
        }
        res.status(200).json({
            message: 'viewing blog post',
            blog
        })
    }catch(error){
        res.status(500).json({
            message : error.message
        })
    }
}


exports.getAllPost = async(req,res)=>{
    try {

        // get all post available in the database
        const allPost = await blogModel.find().select(blogModel._id, blogModel.title, blogModel.desc, blogModel.comments).populate("comments")
        if (!allPost) {
            return res.status(404).json({
                error:"no post found"
            })
        }

        // throw a success message
        res.status(200).json({
            message:`there are ${allPost.length} post availabe`,
            data:allPost
        })
        
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

exports.updatePost = async(req,res)=>{
    try {

        // get the post id
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                error:'you need to pass id '
            })
        }
        
        // get the new update from the body
        const {title,desc} = req.body

        const data = {
            title:title,
            desc:desc
        }

        // find the post with the id and update
        const updates = await blogModel.findByIdAndUpdate(id,data,{new:true})
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

exports.deletePost = async(req,res)=>{
    try {

        // get the post id
        const id = req.params.id
        if(!id){
            return res.status(400).json({
                error:'you need to pass id '
            })
        }

        // find the post with the id and delete
        const deletePost = await blogModel.findByIdAndDelete(id)
        if (!deletePost) {
            return res.status(400).json({
                error:"could not delete this post"
            })
        }

        // delete the post comment
        await commentModel.deleteMany({post:id})

        // throw a success message
        res.status(200).json({
            message: "post deleted successfuly"
        })

        
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}