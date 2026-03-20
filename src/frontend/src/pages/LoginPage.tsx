import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Loader2, Shield, Wifi } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface LoginPageProps {
  onAdminLogin: (session: {
    type: "admin";
    email: string;
    name: string;
  }) => void;
}

export default function LoginPage({ onAdminLogin }: LoginPageProps) {
  const { login, isLoggingIn, isLoginError } = useInternetIdentity();
  const { actor } = useActor();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleAdminLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }
    if (!actor) {
      toast.error("সিস্টেম প্রস্তুত হচ্ছে... আবার চেষ্টা করুন");
      return;
    }
    setLoading(true);
    try {
      const name = await actor.loginAdminAccount(email, password);
      const session = { type: "admin" as const, email, name };
      localStorage.setItem("adminSession", JSON.stringify(session));
      onAdminLogin(session);
      toast.success(`স্বাগতম, ${name}`);
    } catch {
      toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "oklch(0.149 0.035 252)" }}
      data-ocid="login.page"
    >
      <div className="w-full max-w-sm px-4">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-4">
            <Wifi className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center">
            নওশীন ব্রডব্যান্ড
          </h1>
          <p className="text-sm mt-1" style={{ color: "oklch(0.65 0.02 252)" }}>
            ISP ম্যানেজমেন্ট সিস্টেম
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg">লগইন</CardTitle>
            <CardDescription className="text-sm">
              সিস্টেমে প্রবেশ করতে আপনার পরিচয় যাচাই করুন
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <Tabs defaultValue="super" className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger
                  value="super"
                  className="flex-1 text-xs"
                  data-ocid="login.super_admin.tab"
                >
                  সুপার এডমিন
                </TabsTrigger>
                <TabsTrigger
                  value="admin"
                  className="flex-1 text-xs"
                  data-ocid="login.admin.tab"
                >
                  এডমিন লগইন
                </TabsTrigger>
              </TabsList>

              <TabsContent value="super" className="mt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 text-primary">
                    <Shield size={15} />
                    <span className="text-xs font-medium">
                      Internet Identity দিয়ে লগইন করুন
                    </span>
                  </div>
                  <Button
                    className="w-full bg-primary text-white font-medium"
                    size="lg"
                    onClick={() => login()}
                    disabled={isLoggingIn}
                    data-ocid="login.submit_button"
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        লগইন হচ্ছে...
                      </>
                    ) : (
                      "সুপার এডমিন লগইন"
                    )}
                  </Button>
                  {isLoginError && (
                    <p
                      className="text-destructive text-sm text-center"
                      data-ocid="login.error_state"
                    >
                      লগইন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।
                    </p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="admin" className="mt-0">
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">ইমেইল আইডি</Label>
                    <Input
                      type="email"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-ocid="login.admin_email.input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">পাসওয়ার্ড</Label>
                    <div className="relative">
                      <Input
                        type={showPw ? "text" : "password"}
                        placeholder="পাসওয়ার্ড দিন"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pr-10"
                        data-ocid="login.admin_password.input"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPw((p) => !p)}
                      >
                        {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-white"
                    disabled={loading}
                    data-ocid="login.admin_submit.button"
                  >
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    লগইন করুন
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <p className="text-center text-xs text-muted-foreground mt-4">
              শুধুমাত্র অনুমোদিত অ্যাডমিন প্রবেশ করতে পারবেন
            </p>
          </CardContent>
        </Card>

        <p
          className="text-center text-xs mt-6"
          style={{ color: "oklch(0.45 0.02 252)" }}
        >
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
