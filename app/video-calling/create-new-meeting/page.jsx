"use client";
import { useState } from 'react';
import Link from "next/link";
import { useSession } from 'next-auth/react';

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

    const createMeeting = async () => {
        try {
            
            const response = await fetch('/api/create-meeting', {
                method: 'POST',
                body: JSON.stringify({
                    creator: session?.user.id,
                })
            });
      
            if (response.ok) {
                const data = await response.json();
                console.log('Response:', data); // Log the entire response data
                const myMeetingLink = data.meeting_link;
                setMeetingLink(myMeetingLink);
                console.log('Meeting created successfully:', meetingLink);
            } else {
                console.error('Error creating meeting:', response.status);
            }
        } catch (error) {
          console.error('Error creating meeting:', error);
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
                    <button className='px-5 py-1.5 text-sm bg-orange-600 rounded-full text-white' onClick={createMeeting}>Create Meeting</button>
                    {meetingLink && <p className='font-santoshi font-semibold text-sm  pt-6 text-gray-500'>Meeting Link: 
                        <Link href={`/video-calling/${meetingLink}`} className="flex gap-2 flex-center"> 
                            {meetingLink} 
                        </Link>
                    </p>}
                </div>
            </h1>
        </section>
    
    );
};

export default CreateMeetingButton;