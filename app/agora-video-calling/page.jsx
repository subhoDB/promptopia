"use client";
import axios from "axios"
import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import AgoraRTC from 'agora-rtc-sdk-ng';


function VideoCalling() {
    const [token, setToken] = useState('');

    // const localVideoRef = useRef(null);
    // const remoteVideoRef = useRef(null);
    // let isAudioContextResumed = false;

    // This is for get method we need post method generateToken() here
    let options =
    {
        // Pass your App ID here.
        appId: 'b6b121e15e504a808e7092382509aab1',
        channel: 'schedulehrmsinterview',
        token: '',
        uid: 0,
        ExpireTime: 60,
        serverUrl: 'http://localhost:4000/agora-create-token'
    };

    // const FetchToken = async () => {
    // return new Promise(function (resolve)
    // {
    //     axios.get(options.serverUrl+'/rtc/'+options.channel+'/1/uid/'+options.uid+'/?expiry='+ options.ExpireTime)
    //     .then(
    //         response => {
    //             console.log(response.data.rtcToken);
    //             resolve(response.data.rtcToken);
    //         })
    //         .catch(error =>
    //         {
    //             console.log(error);
    //         });
    //     });
    // }

    const generateToken = async () => {
        try {
            const response = await fetch('http://localhost:4000/agora-create-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appId: 'b6b121e15e504a808e7092382509aab1',
                    appCertificate: 'a093b7dafc764198a1e64f5bbbf00f3c',
                    channelName: 'schedulehrmsinterview',
                    uid: 0
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setToken(data.token);
        } catch (error) {
            console.error('Error generating token:', error);
        }
    };

    // useEffect(() => {
    //   generateToken();
    // }, []);

    // const JoinMeeting = async() => {
    //     // Initialize AgoraRTC client
    //     const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    //     // Join a channel
    //     client.join(options.appId, options.channel, token, null);

    //     // console.log(client);
    // }

    // const JoinMeeting = async () => {
    //     try {
    //         // Initialize AgoraRTC client
    //         const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    //         console.log(AgoraRTC);

    //         // Join a channel
    //         await client.join(options.appId, options.channel, token, null);

    //         // Create a local audio and video track
    //         const localStream = await AgoraRTC.createStream({
    //             audio: true,
    //             video: true,
    //         });
    
    //         // Initialize the local audio and video track
    //         await localStream.init();
    
    //         // Publish the local audio and video track to the channel
    //         await client.publish(localStream);
    
    //         // Subscribe to the remote streams
    //         client.on('user-published', async (user, mediaType) => {
    //             await client.subscribe(user, mediaType);
                
    //             if (mediaType === 'video') {
    //                 const remoteVideo = document.createElement('video');
    //                 remoteVideo.autoplay = true;
    //                 remoteVideo.srcObject = user.stream;
    //                 document.body.appendChild(remoteVideo);
    //             }
    //         });
    
    //         // Handle when a remote user leaves the channel
    //         client.on('user-unpublished', (user) => {
    //             // Remove the remote video when a user leaves the channel
    //             const remoteVideo = document.querySelector(`[srcObject="${user.stream}"]`);
    //             remoteVideo && remoteVideo.remove();
    //         });
    //     } catch (error) {
    //         console.error('Error joining meeting:', error);
    //     }
    // };

    // const JoinMeeting = async () => {
    //     try {
    //         // Initialize AgoraRTC client
    //         const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    
    //         // Join a channel
    //         await client.join(options.appId, options.channel, token, null);
    
    //         // Create a local audio and video track
    //         const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    
    //         // Initialize the local audio and video tracks
    //         await client.publish([tracks.audioTrack, tracks.videoTrack]);
    
    //         // Subscribe to the remote streams
    //         client.on('user-published', async (user, mediaType) => {
    //             await client.subscribe(user, mediaType);
    
    //             if (mediaType === 'video') {
    //                 const remoteVideo = document.createElement('video');
    //                 remoteVideo.autoplay = true;
    //                 remoteVideo.srcObject = user.videoTrack.play();
    //                 document.body.appendChild(remoteVideo);
    //             }
    //         });
    
    //         // Handle when a remote user leaves the channel
    //         client.on('user-unpublished', (user) => {
    //             // Remove the remote video when a user leaves the channel
    //             const remoteVideo = document.querySelector(`[srcObject="${user.videoTrack.play()}"]`);
    //             remoteVideo && remoteVideo.remove();
    //         });
    //     } catch (error) {
    //         console.error('Error joining meeting:', error);
    //     }
    // };

    // const JoinMeeting = () => {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             // Initialize AgoraRTC client
    //             const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    
    //             // Join a channel
    //             await client.join(options.appId, options.channel, token, null);
    
    //             // Create a local audio and video track
    //             const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
    
    //             // Initialize the local audio and video tracks
    //             await client.publish([tracks.audioTrack, tracks.videoTrack]);
    
    //             // Subscribe to the remote streams
    //             client.on('user-published', async (user, mediaType) => {
    //                 await client.subscribe(user, mediaType);
    
    //                 if (mediaType === 'video') {
    //                     const remoteVideo = document.createElement('video');
    //                     remoteVideo.autoplay = true;
    //                     remoteVideo.srcObject = user.videoTrack.play();
    //                     document.body.appendChild(remoteVideo);
    //                 }
    //             });
    
    //             // Handle when a remote user leaves the channel
    //             client.on('user-unpublished', (user) => {
    //                 // Remove the remote video when a user leaves the channel
    //                 const remoteVideo = document.querySelector(`[srcObject="${user.videoTrack.play()}"]`);
    //                 remoteVideo && remoteVideo.remove();
    //             });
    
    //             // Resolve with the client object once everything is set up
    //             resolve(client);
    //         } catch (error) {
    //             console.error('Error joining meeting:', error);
    //             // Reject with the error message if there was an issue joining the meeting
    //             reject(error);
    //         }
    //     });
    // };

    // const handleJoinMeeting = () => {
    //     JoinMeeting()
    //         .then((client) => {
    //             // Meeting joined successfully, you can now use the client object to interact with the meeting
    //             console.log('Meeting joined successfully');
    //         })
    //         .catch((error) => {
    //             // Error joining the meeting, handle the error here
    //             console.error('Error joining meeting:', error);
    //         });
    // };

    const JoinMeeting = async () => {
        try {
            if (typeof window !== 'undefined') {
                // Initialize AgoraRTC client
                const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

                // Join a channel
                await client.join(options.appId, options.channel, token, null);
                
                // Create a local audio and video track
                const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();

                // Initialize the local audio and video tracks
                await Promise.all(tracks.map(track => track.setEnabled(true)));

                // Publish the local audio and video tracks to the channel
                await client.publish(tracks);

                // Subscribe to the remote streams
                client.on('user-published', async (user, mediaType) => {
                    await client.subscribe(user, mediaType);

                    if (mediaType === 'video') {
                        const remoteVideo = document.createElement('video');
                        remoteVideo.autoplay = true;
                        remoteVideo.srcObject = user.videoTrack.play();
                        document.body.appendChild(remoteVideo);
                    }
                });

                // Handle when a remote user leaves the channel
                client.on('user-unpublished', (user) => {
                    // Remove the remote video when a user leaves the channel
                    const remoteVideo = document.querySelector(`[srcObject="${user.videoTrack.play()}"]`);
                    remoteVideo && remoteVideo.remove();
                });

                return client;
            } else {
                console.log('Window object is not defined (server environment)');
                return null;
            }
        } catch (error) {
            console.error('Error joining meeting:', error);
            throw error; // Reject the promise with the error so it can be caught outside the function
        }
    };

    
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Discober & Shear
                <br className="max-md:hidden"/>
                <span className="orange_gradient text-center"> AI-Powred Prompts </span>
                <p className="desc text-center">
                    Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts 
                </p>

                <div className=''>
                    {/* Show different buttons based on the token value */}
                    {token ? (
                        <div>
                            {/* Button to do something when token exists */}
                            <button className='px-5 py-1.5 text-sm bg-orange-600 rounded-full text-white' onClick={JoinMeeting}>
                                Join Meeting
                            </button>
                        </div>
                    ) : (
                        <div>
                            {/* Button to generate token */}
                            <button className='px-5 py-1.5 text-sm bg-orange-600 rounded-full text-white' onClick={generateToken}>
                                Create Token
                            </button>
                        </div>
                    )}

                </div>
            </h1>
        </section>
    );
}

export default VideoCalling;