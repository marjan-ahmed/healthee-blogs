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

// Schema Validation
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

  // 🔹 Email/Password Sign In
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!isLoaded) return;
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "password",
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

  // 🔹 Social Sign-In
  async function handleSocialSignIn(provider: "oauth_google" | "oauth_facebook") {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/auth/callback",
        redirectUrlComplete: "/dashboard",
      });
    } catch (error) {
      console.error(`${provider} Sign-In error`, error);
      toast.error(`Failed to sign in with ${provider === "oauth_google" ? "Google" : "Facebook"}.`);
    }
  }

  return (
    <div className="flex justify-center m-3 p-2">
      <Card className="w-full max-w-sm sm:max-w-md mt-10">
        <CardHeader>
          <CardTitle className="md:text-3xl sm:text-2xl text-xl font-montserrat font-black">
            Sign In
          </CardTitle>
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
                    <FormLabel className="font-montserrat">Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="yourname@gmail.com"
                        className="h-12 font-montserrat tracking-tight text-sm"
                        type="email"
                        {...field}
                      />
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
                    <FormLabel className="font-montserrat">Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        className="h-12 font-montserrat tracking-tight text-sm"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href="/sign-in/forgot-password" className="text-[11px] font-montserrat tracking-tight text-blue-600 hover:underline">
                Forgot Password?
              </Link>

              {/* Submit Button */}
              <Button type="submit" className="w-full font-montserrat">
                Sign In
              </Button>

              <OrSeparator />

              {/* Social Login Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-center sm:justify-between">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full font-montserrat text-[13px] tracking-tighter flex items-center justify-center gap-2"
                  onClick={() => handleSocialSignIn("oauth_google")}
                >
                  <FcGoogle />
                  Sign in with Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full font-montserrat text-[13px] tracking-tighter flex items-center justify-center gap-2"
                  onClick={() => handleSocialSignIn("oauth_facebook")}
                >
                  <Image src={"/facebook-logo.svg"} alt="Facebook Logo" width={18} height={18} />
                  Sign in with Facebook
                </Button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center font-montserrat tracking-tighter text-sm mt-2">
                <div>
                  Don’t have an account?{" "}
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
