// import * as TaskManager from 'expo-task-manager';
// import * as BackgroundFetch from 'expo-background-fetch';
// import * as Notifications from 'expo-notifications';
// import axios from 'axios';

// const BACKGROUND_FETCH_TASK = 'background-fetch';

// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//   try {
//     const response = await axios.get(
//       "https://api.thingspeak.com/channels/2611773/feeds.json?api_key=I1EXR9VIVYOI2WUW"
//     );
//     const data = response.data.feeds;
//     // console.log(data)
//     if (data.length > 0) {
//       await Notifications.scheduleNotificationAsync({
//         content: {
//           title: "New Data Available",
//           body: "There is new data available. Check it out!",
//         },
//         trigger: null, // Immediate notification
//       });
//     }
//     console.log(BackgroundFetch.Result)
//     return BackgroundFetch.Result.NewData;
//   } catch (error) {
//     console.error("Error in background fetch task:", error);
//     return BackgroundFetch.Result.Failed;
//   }
// });

// export default BACKGROUND_FETCH_TASK;
