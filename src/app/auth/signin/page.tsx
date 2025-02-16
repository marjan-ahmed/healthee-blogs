"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { OrSeparator } from "@/components/OrSeperator";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function SignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isLoaded) return;
    try {
      const result = await signIn.create({
        identifier: values.email,
        password: values.password,
      });
      if (result.status === "complete") {
        toast.success("Successfully logged in!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error", error);
      toast.error(error.errors?.[0]?.message || "Failed to log in.");
    }
  }

  // Social Sign-In
  async function handleSocialSignIn(provider: "oauth_google" | "oauth_facebook") {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "",
        redirectUrlComplete: ""
      });
    } catch (error) {
      console.error(`${provider} Sign-In error`, error);
      toast.error(`Failed to sign in with ${provider === "oauth_google" ? "Google" : "Facebook"}.`);
    }
  }

  return (
    <div className="flex justify-center m-4 p-4">
  <Card className="w-full max-w-sm sm:max-w-md mt-10">
      <CardHeader>
        <CardTitle className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-monstserrat font-black">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-monstserrat">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="yourname@gmail.com" className="h-12 font-monstserrat tracking-tight text-sm" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
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
              <Link href="/sign-in/forgot-password" className="text-[11px] font-monstserrat tracking-tight text-blue-600 hover:underline">
                Forgot Password?
              </Link>
      

            {/* Submit Button */}
            <Button type="submit" className="w-full font-monstserrat">
              Sign In
            </Button>

            <OrSeparator />

            {/* Social Login Buttons */}
            <div className="flex sm:flex-nowrap flex-wrap sm:gap-0 gap-2 justify-center items-center sm:justify-between space-x-2">
              <Button type="button" variant="outline" className="w-full font-monstserrat text-[13px] tracking-tighter" onClick={() => handleSocialSignIn("oauth_google")}>
              <FcGoogle />
              Sign in with Google
              </Button>
              <Button type="button" variant="outline" className="w-full font-monstserrat text-[13px] tracking-tighter" onClick={() => handleSocialSignIn("oauth_facebook")}>
                <Image src={'/facebook-logo.svg'}
                alt="Facebook Logo"
                width={18}
                height={18}/>
                Sign in with Facebook
              </Button>
            </div>

            {/* Forgot Password & Sign Up Links */}
            <div className="text-center font-monstserrat tracking-tighter text-sm mt-2">
              <div>
              Doesn't have an account?
            <Link href="/auth/signup" className="text-gray-600 hover:underline">
                Create an Account
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
