"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"

export default function SignUp() {
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
                    <CardDescription>Enter your information to create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="Enter your full name" required type="text" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="Enter your email" required type="email" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" placeholder="Enter your phone number" required type="tel" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    placeholder="Enter your password"
                                    required
                                    type={showPassword ? "text" : "password"}
                                />
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
                            <RadioGroup defaultValue="consumer" className="flex gap-4">
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
                        <Button className="w-full" type="submit">
                            Create Account
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

