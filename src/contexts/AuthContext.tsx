
import { createContext, useContext, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
}

// Create a simulated session object
const createSimulatedSession = (): Session => {
  return {
    access_token: "simulated-token",
    token_type: "bearer",
    expires_in: 3600,
    refresh_token: "simulated-refresh-token",
    user: {
      id: "simulated-user-id",
      app_metadata: {},
      user_metadata: {},
      aud: "authenticated",
      email: "simulated@example.com",
      created_at: new Date().toISOString(),
      confirmed_at: new Date().toISOString(),
    },
    expires_at: Math.floor(Date.now() / 1000) + 3600,
  };
};

// Create simulated user
const simulatedUser: User = {
  id: "simulated-user-id",
  app_metadata: {},
  user_metadata: {},
  aud: "authenticated",
  email: "simulated@example.com",
  created_at: new Date().toISOString(),
  confirmed_at: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session] = useState<Session | null>(createSimulatedSession());
  const [user] = useState<User | null>(simulatedUser);
  const { toast } = useToast();

  const signOut = async () => {
    try {
      toast({
        title: "Sign out functionality disabled",
        description: "Authentication has been deactivated for this application.",
      });
      
      // We don't actually sign out - this is just for UI consistency
      console.log("Sign out attempt - authentication is deactivated");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "There was a problem with this action",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
