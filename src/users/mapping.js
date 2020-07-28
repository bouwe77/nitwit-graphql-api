export default function mapToUserSchema(userModel) {
  if (!userModel) return null;

  return {
    id: userModel._id,
    username: userModel.username,
  };
}
