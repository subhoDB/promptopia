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


import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const AgoraRTC = dynamic(() => import('agora-rtc-sdk'), { ssr: false });

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  let client = null;
  let localStream = null;

  useEffect(() => {
    const initAgora = async () => {
      if (typeof window !== 'undefined') {
        const agoraRTC = await import('agora-rtc-sdk');

        // Initialize Agora client
        client = agoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

        // Join a channel
        client.join('myChannelName', null, null, (uid) => {
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

    initAgora();

    return () => {
      // Leave the channel and stop all streams
      client && client.leave();
      localStream && localStream.close();
      client && client.removeAllListeners();
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
