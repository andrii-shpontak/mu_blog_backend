import PostModel from '../models/Post.js';

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();

    const tags = posts
      .map((item) => item.tags)
      .flat()
      .slice(0, 5);

    res.json(tags);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed getting posts',
    });
  }
};

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
    ).populate('user');

    if (!onePost) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    res.json(onePost);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed getting one article(Catch)',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await PostModel.findByIdAndDelete({
      _id: postId,
    });

    if (!deletedPost) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    res.json({
      message: 'Post deleted',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed removing the article',
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

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      },
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Failed updat',
    });
  }
};
