'use client';

import React from 'react'
import { useActionState } from 'react';

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import MarkdownEditor from '@uiw/react-markdown-editor';
import {FormSchema} from "@/lib/validation";
import {Send} from "lucide-react";
import {useToast} from "@/hooks/use-toast";
import {useRouter} from "next/navigation";
import {z} from "zod"

const StartupForm = () => {

    const [ errors , setErrors ] = React.useState<Record<string, string>>({});
    const [pitch , setPitch] = React.useState();

    const {toast} = useToast();
    const router=useRouter();
    // const isPending=false;
    const handleFormSubmit= async (prevState:any,formData:FormData)=>{
        try {
            const formValues ={
                title:formData.get("title") as string,
                description:formData.get("description") as string,
                pitch,
                link:formData.get("link") as string,
                category:formData.get("category") as string,
            }
            await FormSchema.parseAsync(formValues);
            // const result =await createIdea(prevState,formData,pitch);
            // console.log(result);

            // if(result.status === "success"){
            //     toast({
            //         title: "Success",
            //         description: "Your Startup has been published successfully.",
            //     })
            //     router.push(`/startup/${result.id}`);
            // }
            // return result;
            console.log(formValues);

        }
        catch(error){
            if(error instanceof z.ZodError){
                 const fieldError = error.flatten().fieldErrors;
                 setErrors(fieldError as unknown as Record<string, string>);
                 toast({
                     title: "Error",
                     description:"Please check your inputs and try again",
                     variant: "destructive",
                 })

                 return {...prevState,error:"Validation failed",status:"error"};
            }
            else {
                toast({
                    title: "Error",
                    description:"An unexpected Error has occurred",
                    variant: "destructive",
                })
                return {...prevState,error:"An unexpected Error has occurred.",status:"error"};
            }
        }
    }
    const [state,formAction, isPending]= useActionState(
        handleFormSubmit,
        {
            error:"",
            status:"INITIAL",
        },
        );



    return <form action={formAction} className="startup-form">
        <div>
            <label htmlFor="title" className="startup-form_label">Title</label>
            <Input id="title" name="title" className="startup-form_input" required placeholder="Startup Title" />
            {errors.title && <p className="startup-form_error">{errors.title}</p>}
        </div>

        <div>
            <label htmlFor="description" className="startup-form_label">Description</label>
            <Textarea
                id="description"
                name="description"
                className="startup-form_textarea"
                required
                placeholder="Startup Description" />
            {errors.description && <p className="startup-form_error">{errors.description}</p>}
        </div>


        <div>
            <label htmlFor="category" className="startup-form_label">Category</label>
            <Input
                id="category"
                name="category"
                className="startup-form_input"
                required
                placeholder="Startup Category (Tech , Health , Education...)" />
            {errors.category && <p className="startup-form_error">{errors.category}</p>}
        </div>

        <div>
            <label htmlFor="link" className="startup-form_label">Image URL</label>
            <Input
                id="link"
                name="link"
                className="startup-form_input"
                required placeholder="Startup Image URL" />
            {errors.link && <p className="startup-form_error">{errors.link}</p>}
        </div>

        <div data-color-mode="light">
            <label htmlFor="pitch" className="startup-form_label">Pitch</label>
            <MarkdownEditor
                value={pitch}
                height={300}
                preview="edit"
                id="pitch"
                style={{borderRadius: 20 ,overflow: 'hidden'}}
                textareaProps={{
                    placeholder: 'Briefly Describe your Idea and what problem it solves',
                }}
                previewOptions={{
                    disallowedElements:["style"]
                }}
                onChange={(value) => setPitch(value)}
            />
            {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}
        </div>
        <button className="startup-form_btn text-white" type="submit" disabled={isPending}>
            {isPending?'Publishing ...':'Publish Your Startup'}
            <Send className="size-6 ml-2"/>
        </button>
    </form>
}
export default StartupForm
