'use client';
import { useState, useEffect} from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
    const router =  useRouter();
    // const { data: session } = useSession();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submetting, setSubmetting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    useEffect(() => {
        console.log(`Prompt id ${promptId}`);

        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            // console.log(response.json());
            const data = await response.json();
            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }

        if(promptId) getPromptDetails();
    }, [promptId])

    const updatePrompt = async (e) => {
        e.preventDefault();
        setSubmetting(true);

        if(!promptId) return alert('Prompt ID not found')
        try {
            const response = await fetch(`/api/prompt/${promptId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if(response.ok) {
                router.push('/');
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmetting(false);
        }
    }

    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submetting={submetting}
            handleSubmit={updatePrompt}        
        />
    )
}

export default EditPrompt