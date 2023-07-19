"use client";
// import VideoCalling from "@components/VideoCalling";
// import { useEffect, useState } from 'react';
// import AgoraRTC from 'agora-rtc-sdk-ng';
// import { useSession } from 'next-auth/react';

// const JoinMeeting = () => {

//   const [meetingId, setMeetingId] = useState('');
//   const [client, setClient] = useState(null);
//   const { data: session } = useSession();

//   useEffect(() => {
//     // Get the meetingId from the URL
//     const url = window.location.href;
//     const meetingId = url.split('/').pop();
//     setMeetingId(meetingId);

//     const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
//     setClient(agoraClient);

//     // Join the meeting using the meetingId
//     console.log('Joining meeting:', meetingId);

//     // Implement your video calling logic here using the Agora SDK

//     // Remember to clean up the video call when the component unmounts
//     // return () => {
//     //   // Clean up the video call
//     // };
//   }, []);

//   // meetingId, username
//   const joinAgadoMeeting = async () => {
//     await client.join('b6b121e15e504a808e7092382509aab1', meetingId, null, session?.user.id);
//     // continue with other logic to open the video calling box
//   };

//   return (
//     <section className="w-full flex-center flex-col">
//       <h1 className="head_text text-center">
//           Discober & Shear
//         <br className="max-md:hidden"/>
//         <span className="orange_gradient text-center"> AI-Powred Prompts </span>
//         <p className="desc text-center">
//           Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts 
//         </p>

//         <div className=''>
//           <button className='px-5 py-1.5 text-sm bg-orange-600 rounded-full text-white' onClick={joinAgadoMeeting}>Join Meeting</button>
//         </div>
//       </h1>
//     </section>
//   );
// };

// export default JoinMeeting;

// "use client";
// import { useState } from 'react';

// const JoinMeetingComponent = () => {
  

  // useEffect(() => {
  //   const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
  //   setClient(agoraClient);
  // }, []);

//   const joinMeeting = async (meetingId, username) => {
//     await client.join('b6b121e15e504a808e7092382509aab1', meetingId, null, username);
//     // continue with other logic to open the video calling box
//   };

//   return (
//     <div>
//       // your component JSX here
//     </div>
//   );
// };

// export default JoinMeetingComponent;


// import React, { useEffect, useRef } from 'react';
// import AgoraRTC from 'agora-rtc-sdk';

// const JoinMeeting = () => {
//   const client = useRef(null);
//   const localStream = useRef(null);
//   const remoteStream = useRef(null);
//   const remoteVideo = useRef(null);

//   useEffect(() => {
//     const appId = 'b6b121e15e504a808e7092382509aab1';
//     const token = null; // Set to null if not using token
//     const channelName = 'MedicalApp_307047';

//     // Initialize Agora client
//     client.current = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
//     client.current.init(appId, () => {
//       console.log('AgoraRTC client initialized');
//       client.current.join(token, channelName, null, (uid) => {
//         console.log('User ' + uid + ' joined channel ' + channelName);
//         // Create local stream
//         localStream.current = AgoraRTC.createStream({
//           streamID: uid,
//           audio: true,
//           video: true,
//           screen: false,
//         });
//         // Initialize local stream
//         localStream.current.init(() => {
//           console.log('Local stream initialized');
//           // Play local stream
//           localStream.current.play('local-stream');
//           // Publish local stream
//           client.current.publish(localStream.current, (err) => {
//             console.log('Publish local stream error: ' + err);
//           });
//         }, (err) => {
//           console.log('Local stream init error: ' + err);
//         });
//       }, (err) => {
//         console.log('Join channel error: ' + err);
//       });
//     }, (err) => {
//       console.log('AgoraRTC client init error: ' + err);
//     });

//     // Subscribe to remote stream
//     client.current.on('stream-added', (evt) => {
//       console.log('Remote stream added');
//       client.current.subscribe(evt.stream, (err) => {
//         console.log('Subscribe remote stream error: ' + err);
//       });
//     });
//     client.current.on('stream-subscribed', (evt) => {
//       console.log('Remote stream subscribed');
//       remoteStream.current = evt.stream;
//       remoteVideo.current.srcObject = remoteStream.current.stream;
//     });
//     client.current.on('stream-removed', (evt) => {
//       console.log('Remote stream removed');
//       if (remoteStream.current) {
//         remoteStream.current.stop();
//         remoteStream.current = null;
//       }
//       remoteVideo.current.srcObject = null;
//     });

//     // Leave channel on component unmount
//     return () => {
//       client.current.leave(() => {
//         console.log('User left channel');
//         if (localStream.current) {
//           localStream.current.stop();
//           localStream.current.close();
//           localStream.current = null;
//         }
//         if (remoteStream.current) {
//           remoteStream.current.stop();
//           remoteStream.current.close();
//           remoteStream.current = null;
//         }
//       }, (err) => {
//         console.log('Leave channel error: ' + err);
//       });
//     };
//   }, []);

//   return (
//     <div>
//       <div id="local-stream"></div>
//       <video ref={remoteVideo} autoPlay></video>
//     </div>
//   );
// };

// export default JoinMeeting;

import VideoCalling from "@components/VideoCalling";

const JoinMeeting = () => {
  return (
    <VideoCalling />
  )
}

export default JoinMeeting;