
/** Controller */
import Users from '../model/user'

// get : https://employee-crud-flax.vercel.app/api/users
export async function getUsers(req, res){
    try {
        const users = await Users.find({})

        if(!users) return res.status(404).json( { error: "Data not Found"})
        res.status(200).json(users)
    } catch (error) {
        res.status(404).json( { error : "Error While Fetching Data"})
    }
}

// get : https://employee-crud-flax.vercel.app/api/users/1
export async function getUser(req, res){
    try {
        const { id } = req.query;

        if(id){
            const user = await Users.findById(id);
            res.status(200).json(user)
        }
        res.status(404).json({ error : "User not Selected...!"});
    } catch (error) {
        res.status(404).json({ error: "Cannot get the User...!"})
    }
}

// post : https://employee-crud-flax.vercel.app/api/users
export async function postUser(req, res){
    try {
        const formData = req.body;
        if(!formData) return res.status(404).json( { error: "Form Data Not Provided...!"});
        Users.create( formData, function(err, data){
            return res.status(200).json(data)
        })
    } catch (error) {
        return res.status(404).json({ error })
    }
}

// put : https://employee-crud-flax.vercel.app/api/users/1
export async function putUser(req, res){
    try {
        const { id } = req.query;
        const formData = req.body;

        if(id && formData){
            const user = await Users.findByIdAndUpdate(id, formData);
            res.status(200).json(user)
        }
        res.status(404).json( { error: "User Not Selected...!"})
    } catch (error) {
        res.status(404).json({ error: "Error While Updating the Data...!"})
    }
}

// delete : https://employee-crud-flax.vercel.app/api/users/1
export async function deleteUser(req, res){
    try {
        const { id } = req.query;

        if(id){
            const user = await Users.findByIdAndDelete(id)
            return res.status(200).json(user)
        }

        res.status(404).json({ error: "User Not Selected...!"})

    } catch (error) {
        res.status(404).json({ error: "Error While Deleting the User...!"})
    }
}