"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"
import z from "zod";
import { SubmitHandler, useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import axios from "axios";
import { useRouter } from "next/navigation"

export default function SignUp() {

    const formSchema = z.object({
        name:z.string().min(3,"Name must be atleast 3 character!").nonempty({message:"Name is Required!"}),
        email:z.string().email("Invalid email"),
        password: z.string().min(8, "Password must be alteast 8 character").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/\d/, "Password must contain at least one number").regex(/[\W_]/, "Password must contain at least one Special character"),
        phone: z.string().min(10, "Phone number must be exactly 10 digits").max(10, "Phone number must be exactly 10 digits").regex(/^\d+$/, "Phone number must contain only digits"),
        role:z.string()
    }) 
    type formType = z.infer<typeof formSchema>;

    const {register,handleSubmit,formState:{errors,isSubmitting},watch,setValue} = useForm<formType>({resolver:zodResolver(formSchema),defaultValues:{role:"consumer"}})

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }
    const onSubmit:SubmitHandler<formType> = async(data)=>{
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,data);
            sessionStorage.setItem('email',data.email);
            router.push('/verify-otp');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>Enter your information to create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Enter your full name" required type="text" {...register("name")} />
                            {errors.name && <p className="text-rose-500">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="Enter your email" required type="email" {...register("email")}/>
                            {errors.email && <p className="text-rose-500">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" placeholder="Enter your phone number" required type="tel"  {...register("phone")}/>
                            {errors.phone && <p className="text-rose-500">{errors.phone.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                    type={showPassword ? "text" : "password"}
                                    {...register("password")}
                                />
                                {errors.password && <p className="text-rose-500">{errors.password.message}</p>}
                                <Button
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={togglePassword}
                                    type="button"
                                    variant="ghost"
                                >
                                    {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                                    <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Role</Label>
                            <RadioGroup defaultValue="consumer" className="flex gap-4" value={watch("role")} onValueChange={(value)=>setValue('role',value)}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem id="consumer" value="consumer" />
                                    <Label htmlFor="consumer">Consumer</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem id="provider" value="provider" />
                                    <Label htmlFor="provider">Provider</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem id="admin" value="admin" />
                                    <Label htmlFor="admin">Admin</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <Button className="w-full" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Submitting..." : "Create an Account"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

