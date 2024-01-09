const express = require('express')
const blogRouter = require('./routers/blogRouter')
const commentRouter= require('./routers/commentRouter')

require('./config/config')
const port = process.env.port

const app = express()

app.use(express.json())
app.use("/api/v1",blogRouter)
app.use("/api/v1",commentRouter)

app.listen(port,()=>{
    console.log(`server is listening on port:${port}`)
})
