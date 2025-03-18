"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { OrSeparator } from "@/components/OrSeperator";
import Link from "next/link";

const formSchema = z.object({
  firstName: z.string().min(3).max(15),
  lastName: z.string().min(3).max(18),
  email: z.string().email(),
  password: z.string().min(8),
});

export default function SignUpForm() {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isLoaded) return; // Ensure Clerk is ready
  
    signUp
      .create({
        emailAddress: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      })
      .then(() => {
        signUp.prepareEmailAddressVerification({ strategy: "email_code" });
        toast.success("Sign-up successful! Check your email for verification.");
      })
      .catch((err) => {
        console.error("Sign-up error:", err);
        toast.error(err.errors[0]?.message || "Failed to sign up.");
      });
  }

  return (
    <div className="flex justify-center m-3 p-2">
      <Card className="w-full max-w-sm sm:max-w-md mt-10">
        <CardHeader>
          <CardTitle className="md:text-3xl sm:text-2xl text-xl font-montserrat font-black">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-montserrat">First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Beenish" type="text" className="h-12 font-montserrat tracking-tight text-sm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-montserrat">Last Name</FormLabel>
                        <FormControl>
                          <Input className="h-12 font-montserrat tracking-tight text-sm" placeholder="Ishtiaq" type="text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-montserrat">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="beenishishtiaq@gmail.com"
                        type="email"
                        className="h-12 font-montserrat tracking-tight text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-montserrat">Password</FormLabel>
                    <FormControl>
                      <PasswordInput className="h-12 font-montserrat tracking-tight text-sm" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full font-montserrat" type="submit">
                Sign Up
              </Button>
              <OrSeparator />

              {/* Social Login Buttons */}
              <div className="flex sm:flex-nowrap flex-wrap gap-2 sm:gap-0 justify-center items-center sm:justify-between space-x-2">
                <Button type="button" variant="outline" className="w-full font-montserrat text-[13px] tracking-tighter">
                  <FcGoogle />
                  Sign Up with Google
                </Button>
                <Button type="button" variant="outline" className="w-full font-montserrat text-[13px] tracking-tighter">
                  <Image src={"/facebook-logo.svg"} alt="Facebook Logo" width={18} height={18} />
                  Sign Up with Facebook
                </Button>
              </div>

              {/* Already have an account? */}
              <div className="text-center font-montserrat tracking-tighter text-sm mt-2">
                <div>
                  Already have an account?
                  <Link href="/auth/signin" className="text-gray-600 hover:underline">
                    Sign In
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
