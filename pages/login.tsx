import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../lib/supabaseClient";
export default function Login() {
 return (
<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
<div className="backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl rounded-2xl p-10 w-full max-w-md">
<h1 className="text-4xl tracking-widest font-semibold text-white text-center mb-8">
         AJAX
</h1>
<Auth
         supabaseClient={supabase}
         appearance={{ theme: ThemeSupa }}
         theme="default"
         providers={[]}
       />
</div>
</div>
 );
}