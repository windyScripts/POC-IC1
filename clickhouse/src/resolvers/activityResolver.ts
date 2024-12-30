import { getActivities, addActivity } from '../services/activityService';

export const resolvers = {
    getActivities: async ({ userId }: { userId?: string }) => {
        return await getActivities(userId);
    },
    addActivity: async ({ userId, activity }: { userId: string; activity: string }) => {
        return await addActivity(userId, activity);
    },
};
