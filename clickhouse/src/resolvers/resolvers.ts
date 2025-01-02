// // methods to query based on start time in ms and end time in ms
// // methods to add new messages with the following properties:
// /*

// message: {
// id // created by default
// user,
// text,
// engagement,
// type,
// sendTime
// }

// */

// import { cHClient } from "../config/clickhouse-config"

// const getCategoryCounts = async (userEmail: string, startTime:number, endTime:number) => {

// //     const query = `
// //     SELECT 
// //     engagement, 
// //     type, 
// //     COUNT(*) AS message_count
// // FROM 
// //     userMessages
// // WHERE 
// //     userEmail = 'user@example.com' 
// //     AND sendTime BETWEEN 1672531200 AND 1675119600 -- Replace with your sendTime bounds
// // GROUP BY 
// //     engagement, 
// //     type
// // ORDER BY 
// //     engagement, 
// //     type;
// // `

// //     const categoryCounts = await cHClient.exec({query})

// const query = `
//     SELECT 
//         engagement, 
//         type, 
//         COUNT(*) AS message_count
//     FROM userMessages
//     WHERE 
//         userEmail = {userEmail: String}
//         AND sendTime BETWEEN {startTime: UInt32} AND {endTime: UInt32}
//     GROUP BY engagement, type
//     ORDER BY engagement, type
// `;

// const params = {
//     userEmail,
//     startTime, // Replace with your start time
//     endTime,   // Replace with your end time
// };

// try {
//     const categoryCountsQuery = await cHClient.query({
//         query,
//         query_params: params,
//         format: 'JSONEachRow', // Choose your preferred format
//     });

//     const categoryCounts = await categoryCountsQuery.json();
//     return {
//         status:200,
//         message:"Categories found successfully!",
//         categoryCounts
//     };
// } catch (error) {
//     return {
//         status:500,
//         message:"Something went wrong",
//         categoryCounts: {}
//     }
// }


// }

//     const writeMessage = async (messageDetails: messageDetailsType) => {

//         const query=`
//         INSERT INTO userMessages (id, userEmail, text, engagement, type, sendTime) 
//         VALUES ({id}, {userEmail}, {text}, {engagement}, {type}, {sendTime})`

//         const message = await cHClient.query(
//             {query, query_params:{
//                 id:messageDetails.id,
//                 userEmail:messageDetails.userEmail,
//                 text:messageDetails.text,
//                 engagement:messageDetails.engagement,
//                 type:messageDetails.type,
//                 sendTime:messageDetails.sendTime,
//             }}
//         )

//         return {
//             success:true,
//             status:200,
//             message
//         }
// }

// type messageDetailsType = {
// id:number,
// userEmail:string,
// text:string,
// engagement: 'Ignored' | 'Opened' | 'Starred',
// type: 'news' | 'info',
// sendTime: number
// };

// export const resolvers = {
//     Query: {
//       getCategoryCounts: async (_: any, { userEmail, startTime, endTime }: any) => {
//         const result = await getCategoryCounts(userEmail, startTime, endTime);
//         if (result.status === 200) {
//           return result.categoryCounts;
//         }
//         throw new Error(result.message);
//       },
//     },
//     Mutation: {
//       writeMessage: async (_: any, { input }: any) => {
//         try {
//           await writeMessage(input);
//           return {
//             success: true,
//             message: "Message written successfully!",
//           };
//         } catch (error:unknown) {
//             const message = error instanceof Error ? error.message : 'An unknown error occurred';
//             return {
//               success: false,
//               message,
//             };
//         }
//       },
//     },
//   };

import { cHClient } from "../config/clickhouse-config";

const getCategoryCounts = async (userEmail: string, startTime: number, endTime: number) => {
  const query = `
    SELECT 
        engagement, 
        type, 
        COUNT(*) AS message_count
    FROM userMessages
    WHERE 
        userEmail = {userEmail: String}
        AND sendTime BETWEEN {startTime: UInt32} AND {endTime: UInt32}
    GROUP BY engagement, type
    ORDER BY engagement, type
  `;

  const params = { userEmail, startTime, endTime };

  try {
    const categoryCountsQuery = await cHClient.query({
      query,
      query_params: params,
      format: 'JSONEachRow', // Choose your preferred format
    });

    const categoryCounts = await categoryCountsQuery.json();
    return {
      status: 200,
      message: "Categories found successfully!",
      categoryCounts,
    };
  } catch (error) {
    return {
      status: 500,
      message: error instanceof Error ? error.message : "Something went wrong",
      categoryCounts: {},
    };
  }
};

const writeMessage = async (messageDetails: messageDetailsType) => {
  const query = `
    INSERT INTO userMessages (id, userEmail, text, engagement, type, sendTime) 
    VALUES ({id: UInt32}, {userEmail: String}, {text: String}, {engagement: String}, {type: String}, {sendTime: UInt32})
  `;

  try {
    await cHClient.query({
      query,
      query_params: {
        id: messageDetails.id,
        userEmail: messageDetails.userEmail,
        text: messageDetails.text,
        engagement: messageDetails.engagement,
        type: messageDetails.type,
        sendTime: messageDetails.sendTime,
      },
    });

    return {
      success: true,
      status: 200,
      message: "Message written successfully!",
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

type messageDetailsType = {
  id: number;
  userEmail: string;
  text: string;
  engagement: "Ignored" | "Opened" | "Starred";
  type: "news" | "info";
  sendTime: number;
};

export const resolvers = {
  Query: {
    getCategoryCounts: async (_: any, { userEmail, startTime, endTime }: any) => {
      const result = await getCategoryCounts(userEmail, startTime, endTime);
      if (result.status === 200) {
        return result.categoryCounts;
      }
      throw new Error(result.message);
    },
  },
  Mutation: {
    writeMessage: async (_: any, { input }: any) => {
      const result = await writeMessage(input);
      if (result.success) {
        return {
          success: true,
          message: result.message,
        };
      }
      throw new Error(result.message);
    },
  },
};
