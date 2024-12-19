import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if we have an access token in the URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get("access_token");
    const type = hashParams.get("type");
    
    console.log("URL hash parameters:", { accessToken, type });
    
    if (!accessToken || type !== "recovery") {
      console.log("Invalid or missing reset token");
      toast({
        title: "Error",
        description: "Invalid or missing reset token. Please request a new password reset link.",
        variant: "destructive",
      });
      navigate("/login");
    } else {
      console.log("Valid recovery token found");
      // Set the session with the access token
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: "",
      });
    }
  }, [navigate, toast]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log("Attempting to update password");
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        console.error("Error updating password:", error);
        throw error;
      }

      console.log("Password updated successfully");
      toast({
        title: "Success",
        description: "Password has been reset successfully. Please log in with your new password.",
      });
      
      // Sign out the user after successful password reset
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error: any) {
      console.error("Error in password reset:", error);
      toast({
        title: "Error",
        description: error.message || "An error occurred while resetting your password",
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
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-muted-foreground">Enter your new password below</p>
        </div>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Resetting password..." : "Reset Password"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
