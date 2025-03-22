import Video from "../models/video.js";
import Comment from "../models/comment.js";
import Like from "../models/like.js";
import User from "../models/user.js";

const resolvers = {
  Query: {
    // fetchAllVideos
    getAllVideos: async () => await Video.find(),

    //fetch single video by Id
    getVideoById: async (_, { id }) => await Video.findById(id)
  },
  Mutation: {
    addVideo: async (_, { title, type, genre, url, posterUrl }) => {
      const newVideo = new Video({ title, type, genre, url, posterUrl });
      return await newVideo.save();
    },
    deleteVideo: async (_, { id }) => {
      try {
        const video = await Video.findById(id);
        if (!video) {
          throw new Error("Video not found");
        }
        return await Video.findByIdAndDelete(id);
      } catch (error) {
        throw new Error(error.message);
      }
    },
    likeVideo: async (_, { input }) => {
      const { videoId, userId } = input;
      const video = await Video.findById(videoId);
      if (!video) throw new Error("Video Not Found");

      const existingLike = await Like.findOne({ videoId, userId });
      if (existingLike) {
        throw new Error("User already liked this video");
      }
      const newLike = new Like({ videoId, userId });
      await newLike.save();
      video.likes = (video.likes || 0) + 1;
      video.likesBy.push(newLike);
      return await video.save();
    },
    addComment: async (_, { input }) => {
      const { videoId, userId, text } = input;
      const video = await Video.findById(videoId);
      if (!video) throw new Error("Video Not Found");

      const newComment = new Comment({ videoId, userId, text });
      await newComment.save();
      video.comments.push({
        ...newComment._doc,
        createdAt: new Date().toISOString()
      });
      return await video.save();
    },
    register: async (_, { name, email, password }) => {

      const existing = await User.findOne({ email });

      if (existing) throw new Error("User already exists");

      const hashed = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, password: hashed });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {

        expiresIn: "7d"

      });

      return { token, user };

    },
    login: async (_, { email, password }) => {

      const user = await User.findOne({ email });

      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) throw new Error("Invalid password");

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {

        expiresIn: "7d"

      });

      return { token, user };

    }
  }
}

export default resolvers;
