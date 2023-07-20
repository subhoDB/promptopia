"use client";
// import { useEffect } from 'react';
// import AgoraRTC from 'agora-rtc-sdk';

// const VideoCalling = ({ meetingId }) => {
//   useEffect(() => {
//     const agoraAppId = 'b6b121e15e504a808e7092382509aab1';
//     const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
//     console.log(agoraAppId);
//     console.log(`AgoraRTC-createClient -> ${client}`);
//     let localStream = null;

//     const joinMeeting = async () => {
//       try {
//         console.log('joinMeeting', agoraAppId);
//         // Initialize the Agora client
//         await client.init(agoraAppId);

//         console.log(`client-init-agoraAppId- -> ${client}`);

//         // Join the channel using the meetingId as the channel name
//         await client.join('HRMS meeting', meetingId, null, (uid) => {
//           // Create and initialize the local stream
//           localStream = AgoraRTC.createStream({
//             streamID: uid,
//             audio: true,
//             video: true,
//           });

//         console.log(`AgoraRTC-|createStream|- -> ${client}`);

//           localStream.init(() => {
//             // Play the local stream

//             // Replace 'local-video' with the ID or ref of your local video element
//             localStream.play('local-video');

//             // Publish the local stream to the channel
//             client.publish(localStream);
//           });
//         });
//       } catch (error) {
//         console.error('Error joining meeting:', error);
//       }
//     };

//     // Call the joinMeeting function to join the meeting
//     joinMeeting();

//     // Clean up the video call when the component unmounts
//     return () => {
//       if (localStream) {
//         localStream.stop();
//         localStream.close();
//       }
//       if (client) {
//         client.leave();
//       }
//     };
//   }, [meetingId]);

//   return (
//     <div>
//       <h1>Join Video Call</h1>
//       <div id="local-video"></div>
//       {/* Add your video call UI components here */}
//     </div>
//   );
// };

// export default VideoCalling;

import { useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

function VideoCalling() {
  useEffect(() => {
    // Initialize AgoraRTC client
    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    // Join a channel
    client.join('b6b121e15e504a808e7092382509aab1', 'learncuremedicalaap', null, null);

    // Rest of the Agora Video Calling implementation
  }, []);

  return (
    <div>
      <div id="localVideoContainer">
        {/* Display the local video stream */}
        <video id="localVideo" autoPlay muted></video>
      </div>

      <div id="remoteVideoContainer">
        {/* Display the remote video streams */}
        <video id="remoteVideo1" autoPlay></video>
        <video id="remoteVideo2" autoPlay></video>
      </div>

      <div id="controls" className='flex flex-center gap-2'>
        {/* Buttons and controls for video calling functionality */}
        <button class="outline_btn" id="joinButton">Join Call</button>
        <button class="px-5 py-1.5 text-sm bg-red-600 rounded-full text-white" id="leaveButton">Leave Call</button>
        <button class="outline_btn" id="muteButton">Toggle Mute</button>
        <button class="outline_btn" id="shareScreenButton">Share Screen</button>
      </div>
    </div>
  );
}

export default VideoCalling;