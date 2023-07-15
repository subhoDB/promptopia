"use client";
// import { useEffect, useRef } from 'react';
// import AgoraRTC from 'agora-rtc-sdk';

// const VideoCall = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   let client = null;
//   let localStream = null;

//   useEffect(() => {
//     // Initialize Agora client
//     client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

//     // Join a channel
//     client.join('myChannelName', null, null, (uid) => {
//       // Create a local stream
//       localStream = AgoraRTC.createStream({ streamID: uid, audio: true, video: true });
//       // Initialize the local stream
//       localStream.init(() => {
//         // Play the local stream
//         localStream.play(localVideoRef.current);

//         // Publish the local stream to the channel
//         client.publish(localStream);
//       });
//     });

//     // Subscribe to remote streams
//     client.on('stream-added', (event) => {
//       const remoteStream = event.stream;
//       // Subscribe to the remote stream
//       client.subscribe(remoteStream);
//     });

//     // Play remote streams
//     client.on('stream-subscribed', (event) => {
//       const remoteStream = event.stream;
//       // Play the remote stream
//       remoteStream.play(remoteVideoRef.current);
//     });

//     return () => {
//       // Leave the channel and stop all streams
//       client.leave();
//       if (localStream) {
//         localStream.stop();
//         localStream.close();
//       }
//       if (client) {
//         client.removeAllListeners();
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Video Call</h1>
//       <div ref={localVideoRef}></div>
//       <div ref={remoteVideoRef}></div>
//     </div>
//   );
// };

// export default VideoCall;


// import { useEffect, useRef } from 'react';
// import dynamic from 'next/dynamic';

// const AgoraRTC = dynamic(() => import('agora-rtc-sdk'), { ssr: false });

// const VideoCall = () => {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   let client = null;
//   let localStream = null;

//   useEffect(() => {
//     let isAudioContextResumed = false;

//     const initAgora = async () => {
//       if (typeof window !== 'undefined') {
//         const agoraRTC = await import('agora-rtc-sdk');

//         // Initialize Agora client
//         client = agoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

//         await client.init('b6b121e15e504a808e7092382509aab1');

//         // Generate a random channel name
//         const channelName = 'HRMS Meeting';
//         // const channelName = Math.random().toString(36).substr(2, 10);

//         // Join a channel
//         await client.join(channelName, null, null, (uid) => {
//           // Create a local stream
//           localStream = agoraRTC.createStream({ streamID: uid, audio: true, video: true });
//           // Initialize the local stream
//           localStream.init(() => {
//             // Play the local stream
//             localStream.play(localVideoRef.current);

//             // Publish the local stream to the channel
//             client.publish(localStream);
//           });
//         });

//         // Subscribe to remote streams
//         client.on('stream-added', (event) => {
//           const remoteStream = event.stream;
//           // Subscribe to the remote stream
//           client.subscribe(remoteStream);
//         });

//         // Play remote streams
//         client.on('stream-subscribed', (event) => {
//           const remoteStream = event.stream;
//           // Play the remote stream
//           remoteStream.play(remoteVideoRef.current);
//         });
//       }
//     };


//     const handleUserGesture = () => {
//       if (!isAudioContextResumed) {
//         // Resume the AudioContext after a user gesture
//         const AudioContext = window.AudioContext || window.webkitAudioContext;
//         const audioContext = new AudioContext();
//         audioContext.resume();
//         isAudioContextResumed = true;
//       }

//       // Initialize Agora
//       initAgora();
//     };

//     // initAgora();
//     // Add a click event listener to the document to capture user gesture
//     document.addEventListener('click', handleUserGesture);

//     return () => {
//       // Remove the click event listener when the component is unmounted
//       document.removeEventListener('click', handleUserGesture);

//       // Leave the channel and stop all streams
//       client.leave();
//       if (localStream) {
//         localStream.stop();
//         localStream.close();
//       }
//       if (client) {
//         client.removeAllListeners();
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Video Call</h1>
//       <div ref={localVideoRef}></div>
//       <div ref={remoteVideoRef}></div>
//     </div>
//   );
// };

// export default VideoCall;

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const AgoraRTC = dynamic(() => import('agora-rtc-sdk'), { ssr: false });

const VideoCall = ({ meetingLink }) => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  let client = null;
  let localStream = null;

  useEffect(() => {
    let isAudioContextResumed = false;

    const initAgora = async () => {
      if (typeof window !== 'undefined') {
        const agoraRTC = await import('agora-rtc-sdk');

        // Initialize Agora client
        client = agoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

        await client.init(process.env.APP_ID);

        console.log(meetingLink);

        // Join the channel using the meeting link as the channel name
        await client.join(meetingLink, null, null, (uid) => {
          // Create a local stream
          localStream = agoraRTC.createStream({ streamID: uid, audio: true, video: true });
          // Initialize the local stream
          localStream.init(() => {
            // Play the local stream
            localStream.play(localVideoRef.current);

            // Publish the local stream to the channel
            client.publish(localStream);
          });
        });

        // Subscribe to remote streams
        client.on('stream-added', (event) => {
          const remoteStream = event.stream;
          // Subscribe to the remote stream
          client.subscribe(remoteStream);
        });

        // Play remote streams
        client.on('stream-subscribed', (event) => {
          const remoteStream = event.stream;
          // Play the remote stream
          remoteStream.play(remoteVideoRef.current);
        });
      }
    };

    const handleUserGesture = () => {
      if (!isAudioContextResumed) {
        // Resume the AudioContext after a user gesture
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        audioContext.resume();
        isAudioContextResumed = true;
      }

      // Initialize Agora
      initAgora();
    };

    // Add a click event listener to the document to capture user gesture
    document.addEventListener('click', handleUserGesture);

    return () => {
      // Remove the click event listener when the component is unmounted
      document.removeEventListener('click', handleUserGesture);

      // Leave the channel and stop all streams
      client.leave();
      if (localStream) {
        localStream.stop();
        localStream.close();
      }
      if (client) {
        client.removeAllListeners();
      }
    };
  }, []);

  return (
    <div>
      <h1>Video Call</h1>
      <div ref={localVideoRef}></div>
      <div ref={remoteVideoRef}></div>
    </div>
  );
};

export default VideoCall;
