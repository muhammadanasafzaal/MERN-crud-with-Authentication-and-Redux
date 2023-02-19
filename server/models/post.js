import mongoose from 'mongoose';

let PostSchema = new mongoose.Schema(
    {
        p_id: Number,
        title: String,
        category: String,
        image:{
            type:String,
        }
    },
    { timestamps: true },
);

//overriding our id with object id of mongodb object
// PostSchema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

const Post = mongoose.model("Post", PostSchema);
export default Post;