import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setMessage("Check your email for the reset link.");
    } catch (err: any) {
      setMessage(err.errors[0]?.message || "Error sending reset email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleResetPassword} className="w-80 bg-gray-100 p-6 rounded-lg shadow-md">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Send Reset Link
        </button>
      </form>
      {message && <p className="text-green-500 mt-2">{message}</p>}
    </div>
  );
}
