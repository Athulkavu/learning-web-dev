import axios from "axios";
import User from "../models/userModel.js";

const userController = {};

userController.getUserByUid = async (req, res) => {
  const { uid } = req.params;

  try {
    const userInDb = await User.findOne({ uid });

    if (userInDb) {
      return res.json({ message: 'Fetched from local', data: userInDb });
    }
    
    let userInRemote;
    try {
      userInRemote = await axios.get(`https://jsonplaceholder.typicode.com/users/${uid}`);
    } catch (err) {
      return res.status(404).json({ message: 'User not found either in local or remote' });
    }
    
    const { name, email, address: { city }} = userInRemote.data;

    let user = new User({ name, email, city, uid });

    user = await user.save();
    return res.json({ message: 'Fetched from remote', data: user });

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

export default userController;