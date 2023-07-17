"use client";
// import { useRouter, withRouter} from 'next/router';
// import VideoCall from '@components/VideoCall';

// const JoinMeetingPage = () => {
//   const router = useRouter();
//   const { meetingLink } = router.query;

//   return <VideoCall meetingLink={meetingLink} />;
// };

// export default withRouter(JoinMeetingPage);

// import { withRouter } from 'next/router';
// import dynamic from 'next/dynamic';

// const VideoCall = dynamic(() => import('@components/VideoCall'), { ssr: false });

// const JoinMeetingPage = ({ router }) => {
//   const { meetingLink } = router.query;

//   return <VideoCall meetingLink={meetingLink} />;
// };

// export default withRouter(JoinMeetingPage);


import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const VideoCall = dynamic(() => import('@components/VideoCall'), { ssr: false });
const { useRouter } = dynamic(() => import('next/router'), { ssr: false });

const JoinMeetingPage = () => {
  const router = useRouter();
  const { query } = router;
  const { meetingLink } = query;

  useEffect(() => {
    // Perform any necessary logic or side effects related to the router
  }, []);

  return <VideoCall meetingLink={meetingLink} />;
};

export default JoinMeetingPage;