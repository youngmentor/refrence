const router = require("express").Router()
const {newComment, getOne, updateComment, getAllComment, deleteComment} = require("../controllers/commentController")

router.post("/comment",newComment)
router.get("/getone-comment/:id",getOne)
router.put("/update_comment/:id",updateComment)
router.get("/getall_comment",getAllComment)
router.delete("/delete_comment/:id",deleteComment)

module.exports = router