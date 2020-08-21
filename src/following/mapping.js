export default function mapToFollowerSchema(followerModel) {
  if (!followerModel) return null;

  return {
    id: followerModel._id,
    userId: followerModel.userId,
    followerUserId: followerModel.followerUserId,
  };
}
