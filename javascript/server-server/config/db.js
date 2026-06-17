import mongoose from "mongoose"

const configureDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(db.connection.name)
  } catch (err) {
    console.log('Error connecting to DB:', err);
  }
}

export default configureDB;