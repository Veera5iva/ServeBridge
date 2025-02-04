"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import axios from "axios"


const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

export function InputOTPForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const email = sessionStorage.getItem("email");
            const payload = {
                email,
                otp:data.pin
            }
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-otp`,payload);
            console.log(response.data.session);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-black h-screen flex items-center justify-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-1/2 space-y-6 text-white">
                    <FormField
                        control={form.control}
                        name="pin"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-3xl">One-Time Password</FormLabel>
                                <FormControl>
                                    <InputOTP maxLength={6} {...field}>
                                        <InputOTPGroup>
                                            {Array(6)
                                                .fill("")
                                                .map((_, index) => (
                                                    <InputOTPSlot
                                                        key={index}
                                                        index={index}
                                                        className="w-16 h-16 text-center text-xl bg-black text-white border border-white rounded-md focus:ring-2 focus:ring-blue-500 caret-white"
                                                    />
                                                ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription className="text-lg">
                                    Please enter the one-time password sent to your mail.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="bg-white text-black hover:text-black hover:bg-white">Submit</Button>
                </form>
            </Form>
        </div>
    )
}
