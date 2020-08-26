export default function mapToUserSchema(userModel) {
  if (!userModel) return null;

  return {
    id: userModel._id,
    username: userModel.username,
    followerCount: userModel.followerCount ?? 0,
    followingCount: userModel.followingCount ?? 0,
  };
}
