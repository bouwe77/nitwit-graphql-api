export default function mapToUserSchema(userModel) {
  if (!userModel) return null;

  return {
    username: userModel.username,
  };
}
