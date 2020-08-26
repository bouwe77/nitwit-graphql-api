export function mapToFollowerSchema(followerModel, following) {
  if (!followerModel) return null;

  return {
    id: followerModel._id,
    userId: following ? followerModel.followingUserId : followerModel.userId,
  };
}

export function mapToFollowUnfollowResult(success) {
  return { success };
}
