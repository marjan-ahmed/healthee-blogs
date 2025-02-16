"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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

export default function MyForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
<div className="flex justify-center m-3 p-2">
<Card className="w-full max-w-sm sm:max-w-md mt-10">
        <CardHeader>
        <CardTitle className="md:text-3xl sm:text-2xl text-xl font-monstserrat font-black">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-monstserrat">First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Beenish" type="text" className="h-12 font-monstserrat tracking-tight text-sm" {...field} />
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
                      <FormLabel className="font-monstserrat">Last Name</FormLabel>
                      <FormControl>
                        <Input className="h-12 font-monstserrat tracking-tight text-sm" placeholder="Ishtiaq" type="text" {...field} />
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
                  <FormLabel className="font-monstserrat">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="beenishishtiaq@gmail.com"
                      type="email"
                      className="h-12 font-monstserrat tracking-tight text-sm"
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
                  <FormLabel className="font-monstserrat">Password</FormLabel>
                  <FormControl>
                    <PasswordInput className="h-12 font-monstserrat tracking-tight text-sm" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full font-monstserrat" type="submit">
              Sign Up
            </Button>
            <OrSeparator />

            {/* Social Login Buttons */}
            <div className="flex sm:flex-nowrap flex-wrap gap-2 sm:gap-0 justify-center items-center sm:justify-between space-x-2">
              <Button type="button" variant="outline" className="w-full font-monstserrat text-[13px] tracking-tighter">
              <FcGoogle />
              Sign Up with Google
              </Button>
              <Button type="button" variant="outline" className="w-full font-monstserrat text-[13px] tracking-tighter">
                <Image src={'/facebook-logo.svg'}
                alt="Facebook Logo"
                width={18}
                height={18}/>
                Sign Up with Facebook
              </Button>
            </div>

            {/* Forgot Password & Sign Up Links */}
            <div className="text-center font-monstserrat tracking-tighter text-sm mt-2">
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
