import mapToTimelineSchema from "./mapping";
import TimelinePost from "./model";

export const createTimelineFunctions = (user) => ({
  getTimeline: (limit) => getTimeline(user, limit),
});

async function getTimeline(user, limit) {
  if (!user) throw new Error("Unauthorized");

  const data = await TimelinePost.find({ timelineUserId: user.id }).sort({
    timestamp: "desc",
  });

  if (!limit) limit = data.length;

  const timeline = data.slice(0, limit).map(mapToTimelineSchema);

  return timeline;
}
