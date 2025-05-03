const { MongoClient } = require('mongodb')
const uri = 'mongodb+srv://karthik10:shuQ02Kumxr7g5SJ@cluster0.1yvkxkp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(uri)


client.connect()
  .then(() => console.log('Connected Successfuly'))
  .catch((err) => console.log(err.message))