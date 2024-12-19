import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Password reset email sent",
        description: "Please check your email for the password reset link.",
      });
      setResetPasswordMode(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">
            {resetPasswordMode ? "Reset Password" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground">
            {resetPasswordMode
              ? "Enter your email to receive a password reset link"
              : "Enter your credentials to continue"}
          </p>
        </div>

        <form onSubmit={resetPasswordMode ? handleResetPassword : handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {!resetPasswordMode && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? resetPasswordMode
                ? "Sending reset link..."
                : "Logging in..."
              : resetPasswordMode
              ? "Send reset link"
              : "Login"}
          </Button>
        </form>

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {resetPasswordMode ? (
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => setResetPasswordMode(false)}
              >
                Back to login
              </Button>
            ) : (
              <>
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => setResetPasswordMode(true)}
                >
                  Forgot password?
                </Button>
                {" | "}
                <Button
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </>
            )}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Login;