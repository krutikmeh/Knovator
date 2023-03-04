const db = require("../model");
const User = db.user;
const Post = db.post;
const ObjectId = require('mongodb').ObjectId;

exports.getAll =async (req, res) => {
   try {
     await User.find({}).then(getData=>{
        console.log('getData', getData);
        res.send({
            status: 200,
            data: getData
        })
     })
   } catch (error) {
    console.log('error while getting==', error);
   }
}

exports.createPost = async(req, res) => {
    try {
        console.log('req.user==', req.user)
        Post.create({title: req.body.title,
            body: req.body.body,
            active: req.body.active,
            created_by: req.user.username,
            geolocation: req.body.geolocation
        }).then((newPost)=>{
            console.log('Post created==');
            return res.status(200).json({
                message: 'Post created successfully!',
                data: newPost
            });
        }).catch((error)=>{
            console.log('Error while creating', error);
        })
    } catch (error) {
        console.log('Error in createPost route', error);
    }
}

exports.getPost = async(req, res) => {
    try {
        Post.find({}).then((getData)=>{
            console.log('Post GetAll==');
            return res.status(200).json({
                message: 'Retreived Post successfully!',
                data: getData
            });
        }).catch((error)=>{
            console.log('Error while getting', error);
        })
    } catch (error) {
        console.log('Error in getPost route', error);
    }
}

exports.getPostByLatLong = async(req, res) => {
    try {
        let query = {
            geolocation: [req.params.longitude, req.params.latitude]
        }
        let finalQuery = query.geolocation;
        Post.findOne({'geolocation.coordinates':finalQuery}).then((getPost)=>{
            if(getPost){
            console.log('Post by longitude and latitude==', getPost);
            return res.status(200).json({
                message: 'Post retreived successfully!',
                data: getPost
            });
        }else{
            return res.status(400).json({
                message: 'No data found!',
            }); 
        }
        }).catch((error)=>{
            console.log('Error while getPostByLatLong', error);
        })
    } catch (error) {
        console.log('Error in getPostByLatLong route', error);
    }
}

exports.updatePost = async(req, res) => {
    try {
        let id = (req.params.id);
        let bodyData = req.body;
        console.log('id-', id);
        await Post.findByIdAndUpdate({_id: ObjectId(id), bodyData}).then((updatedPost)=>{
            console.log('Post updated==', updatedPost);
            return res.status(200).json({
                message: 'Post updated successfully!',
                data: updatedPost
            });
        }).catch((error)=>{
            console.log('Error while update', error);
        })
    } catch (error) {
        console.log('Error in updatePost route', error);
    }
}

exports.deletePost = async(req, res) => {
    try {
        let id = req.params.id;
        console.log('id-', id);
        await Post.findByIdAndDelete({_id: ObjectId(id)}).then((deletePost)=>{
            console.log('Post deleted==');
            return res.status(200).json({
                message: 'Post deleted successfully!',
                data: deletePost
            });
        }).catch((error)=>{
            console.log('Error while delete', error);
        })
    } catch (error) {
        console.log('Error in deletePost route', error);
    }
}

exports.getCount = async(req, res) => {
    try {
        // console.log('id-', id);
        await Post.aggregate([{
            // "$group": {
            //   _id: "$id",
            //   active: {
            //     $sum: {
            //       $cond: [
            //         "$True",
            //         1,
            //         0
            //       ]
            //     }
            //   },
            //   active: {
            //     $sum: {
            //       $cond: [
            //         "$False",
            //         0,
            //         1
            //       ]
            //     }
            //   }
            // }
            $group : { _id : '$active', count : {$sum : 1}}
        }]).then((getCount)=>{
            console.log('getCount==');
            return res.status(200).json({
                message: 'Count of Active and Inactive',
                data: getCount
            });
        }).catch((error)=>{
            console.log('Error while retrieving count', error);
        })
    } catch (error) {
        console.log('Error in getCount route', error);
    }
}