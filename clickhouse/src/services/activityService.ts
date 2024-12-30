import client from '../db';

export interface UserActivity {
    userId: string;
    activity: string;
    timestamp: string;
}

export const getActivities = async (userId?: string): Promise<UserActivity[]> => {
    const query = `
        SELECT userId, activity, timestamp
        FROM user_activities
        ${userId ? `WHERE userId = '${userId}'` : ''}
        ORDER BY timestamp DESC
    `;

    const resultSet = await client.query({
        query,
        format: 'JSONEachRow',
    });

    // Use .json() to parse the result as an array of UserActivity
    const rows: UserActivity[] = await resultSet.json();

    return rows; // This ensures the result is of type UserActivity[]
};

export const addActivity = async (userId: string, activity: string): Promise<UserActivity> => {
    const timestamp = new Date().toISOString();
    const query = `
        INSERT INTO user_activities (userId, activity, timestamp)
        VALUES ('${userId}', '${activity}', '${timestamp}')
    `;
    await client.query({ query, format: 'JSONEachRow' });

    return { userId, activity, timestamp };
};
