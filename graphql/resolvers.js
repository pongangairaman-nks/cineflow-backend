import Video from "../models/video.js";
import Comment from "../models/comment.js";
import Like from "../models/like.js";

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
    }
  }
};

export default resolvers;
