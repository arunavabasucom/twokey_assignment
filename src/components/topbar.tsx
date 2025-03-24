import {  signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  logo: string | null | undefined;
}

export default function Header({ logo }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-2">
      <div className="flex items-center gap-2 lg:gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold text-primary cursor-pointer" onClick={()=>router.push(`/`)}>Drive</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={logo ?? undefined} alt="user" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            signOut();
            console.log("signout");
          }}
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
