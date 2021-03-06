import mapToPostSchema from "../posts/mapping";
import TimelinePost from "./model";

export const createTimelineFunctions = (user) => ({
  getTimeline: (limit) => getTimeline(user, limit),
});

async function getTimeline(user, skip, limit) {
  if (!user) throw new Error("Unauthorized");

  if (!limit) limit = 100;
  if (!skip) skip = 0;

  const data = await TimelinePost.find({ timelineUserId: user.id })
    .sort({
      timestamp: "desc",
    })
    .skip(skip)
    .limit(limit);

  const timeline = data.map(mapToPostSchema);

  return timeline;
}
