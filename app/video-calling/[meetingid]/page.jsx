"use client";
import VideoCalling from "@components/VideoCalling";
import { useEffect, useState } from 'react';

const JoinMeeting = () => {

  const [meetingId, setMeetingId] = useState('');
  useEffect(() => {
    // Get the meetingId from the URL
    const url = window.location.href;
    const meetingId = url.split('/').pop();
    setMeetingId(meetingId);

    // Join the meeting using the meetingId
    console.log('Joining meeting:', meetingId);

    // Implement your video calling logic here using the Agora SDK

    // Remember to clean up the video call when the component unmounts
    return () => {
      // Clean up the video call
    };
  }, []);
  
  return (
    <div>
      {/* Add your video call UI components here */}
      <VideoCalling meetingId={meetingId} />
    </div>
  );
};

export default JoinMeeting;

