"use client";
import { useEffect, useState } from 'react';
import Link from "next/link";
import { useSession } from 'next-auth/react';
// import { createClient,createMicrophoneAndCameraTracks,ClientConfig,ConnectionState } from 'agora-rtc-sdk-ng';
import AgoraRTC from 'agora-rtc-sdk-ng';

    const CreateMeetingButton = () => {
        const [meetingLink, setMeetingLink] = useState('');
        const { data: session } = useSession();

        //   const createMeeting = async () => {
        //     try {
        //       const response = await fetch('/api/createMeeting');
        //       const data = await response.json();
        //       const { meetingLink } = data;
        //       setMeetingLink(meetingLink);
        //     } catch (error) {
        //       console.error('Error creating meeting:', error);
        //     }
        //   };

        // const createMeeting = async () => {
        //     try {
                
        //         const response = await fetch('/api/create-meeting', {
        //             method: 'POST',
        //             body: JSON.stringify({
        //                 creator: session?.user.id,
        //             })
        //         });
        
        //         if (response.ok) {
        //             const data = await response.json();
        //             console.log('Response:', data); // Log the entire response data
        //             const myMeetingLink = data.meeting_link;
        //             setMeetingLink(myMeetingLink);
        //             console.log('Meeting created successfully:', meetingLink);
        //         } else {
        //             console.error('Error creating meeting:', response.status);
        //         }
        //     } catch (error) {
        //       console.error('Error creating meeting:', error);
        //     }
        // };
        
        // const createMeeting = async () => {
        //     try {
        //         const agoraAppId = 'b6b121e15e504a808e7092382509aab1';

        //         const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
        //         await client.join(agoraAppId, 'MEDICAL_APP_7872307047', null, session?.user.id);

        //         const cameraTrack = await AgoraRTC.createCameraVideoTrack();
        //         const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack();

        //         await client.publish([cameraTrack, microphoneTrack]);

        //         client.on('user-published', async (user, mediaType) => {
        //             await client.subscribe(user, mediaType);
        //         });

        //         cameraTrack.play('local-video-element-id');

        //         client.on('user-subscribed', (user, mediaType) => {
        //             const remoteVideoElement = document.createElement('video');
        //             user.videoTrack.play(remoteVideoElement);
        //             // Append remoteVideoElement to the DOM
        //         });

        //         client.on(ConnectionState.Disconnected, () => {
        //         // Handle disconnection
        //         });

        //         // Clean up the resources when no longer needed
        //         client.leave();
        //         cameraTrack.stop();
        //         microphoneTrack.stop();
        //     } catch (error) {
        //         console.log(`Error is : ${error}`);
        //     }
        // };

        const joinMeeting = async (appId, channelName, userId) => {
            try {
                // Create an AgoraRTC client
                const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

                // Initialize the client with your App ID
                await client.init(appId);

                // Join the channel with the specified channel name and user ID
                await client.join(null, channelName, null, userId);

                // Add your logic for handling the successful join here

                // Clean up the resources when no longer needed
                client.leave();
            } catch (error) {
                console.error('Error joining meeting:', error);
            }
        };

        // Example usage
        const appId = 'b6b121e15e504a808e7092382509aab1';
        const channelName = 'MEDICAL_APP_7872307047';
        const userId = session?.user.id;

        
        useEffect(() => {
            joinMeeting(appId, channelName, userId);
        }, []);

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
                        {/* <button className='px-5 py-1.5 text-sm bg-orange-600 rounded-full text-white' onClick={createMeeting}>Create Meeting</button> */}
                        {/* {meetingLink && <p className='font-santoshi font-semibold text-sm  pt-6 text-gray-500'>Meeting Link: 
                            <Link href={`/video-calling/${meetingLink}`} className="flex gap-2 flex-center"> 
                                {meetingLink} 
                            </Link>
                        </p>} */}
                    </div>
                </h1>
            </section>
        
        );
    };

export default CreateMeetingButton;