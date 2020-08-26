export default function mapToPostSchema(postModel) {
  if (!postModel) return null;

  return {
    id: postModel._id,
    text: postModel.text,
    authorUserId: postModel.authorUserId,
  };
}
