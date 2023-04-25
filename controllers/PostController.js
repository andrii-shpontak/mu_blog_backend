import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed getting posts',
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const onePost = await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
    );
    res.json(onePost);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed getting one article(Catch)',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed post',
    });
  }
};
