export default function mapToUserSchema(userModel) {
  if (!userModel) return null;

  return {
    id: userModel._id,
    username: userModel.username,
    name: userModel.name,
    bio: userModel.bio ?? "",
    followerCount: userModel.followerCount ?? 0,
    followingCount: userModel.followingCount ?? 0,
  };
}
