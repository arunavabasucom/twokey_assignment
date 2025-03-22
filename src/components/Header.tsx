import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, Search, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

interface HeaderProps {
  logo: string | undefined;
}

export function Header({ logo }: HeaderProps) {
  const { data: session } = useSession();
  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-2">
      <div className="flex items-center gap-2 lg:gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold text-primary">Drive</div>
        </div>
      </div>
      <div className="mx-4 max-w-xl flex-1">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search in Drive"
            className="bg-muted pl-8"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src={logo} alt="user" />
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
