"use client";
import { useRouter } from 'next/router';
import VideoCall from '@components/VideoCall';

const JoinMeetingPage = () => {
  const router = useRouter();
  const { meetingLink } = router.query;

  return <VideoCall meetingLink={meetingLink} />;
};

export default JoinMeetingPage;
