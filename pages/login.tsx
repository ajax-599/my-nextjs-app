import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      <div className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-4xl tracking-widest font-semibold text-white text-center mb-8">
          CRÈME
        </h1>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#22c55e", // green button
                  brandAccent: "#16a34a", // darker green hover
                  inputBackground: "#ffffff",
                  inputText: "#000000",
                  messageText: "#ffffff",
                },
              },
            },
            style: {
              button: {
                backgroundColor: "#22c55e",
                color: "#000000",     // black button text
                fontSize: "1rem",     // slightly bigger
              },
              input: {
                backgroundColor: "#ffffff",
                color: "#000000",
              },
              label: {
                color: "#ffffff",
              },
            },
          }}
          theme="default"
          providers={[]}
        />
      </div>
    </div>
  );
}
