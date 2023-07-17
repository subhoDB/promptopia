import { connectToDB } from "@utilts/database";
import Meeting from "@models/meeting";
import { v4 as uuidv4 } from 'uuid';

// // // GET (read)
// export const GET = async () => {
//     try {
//         await connectToDB();


//         const newPrompt = new Meeting({
//             creator: userId,
//             meeting_link,
//         })

//         await newPrompt.save();
//         return new Response(JSON.stringify(newPrompt), {status: 201})

//         // const prompt = await Prompt.findById(params.id).populate('creator');
//         // if(!prompt) return new Response("Prompt not found", { status: 404 });
//         // return new Response(JSON.stringify(prompt), { status: 200});
//     } catch (error) {
//         return new Response("Faild to create meeting", { status: 500});
//     }
// }


export const POST = async (req) => {
  try {
    await connectToDB();

    // const { creator } = req.body;
    const { creator } = await req.json();
    
    // Generate a unique meeting link using uuid
    const meetingLink = uuidv4();

    const newMeeting = new Meeting({
      creator,
      meeting_link: meetingLink,
    });

    await newMeeting.save();

    return new Response(JSON.stringify(newMeeting), { status: 201 });

  } catch (error) {
    return new Response("Failed to create meeting", { status: 500 });
  }
};
