import { Link } from "react-router-dom";
import {
  HeartHandshake,
  User,
  LogOut,
  UserPlus,
  LogIn,
  HelpCircle,
  Plus,
  Handshake,
  BadgeInfo,
  BellRing,
  MessageSquareQuote,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ThemeSwitcher from "./ThemeSwitcher";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { logoutUser, verifyUserToken } from "@/services/apiService";
import { useAppDispatch } from "@/hooks/storeHooks";
import { useEffect } from "react";
import { addUser, deleteUser } from "@/store/userSlice";
import LoadingProfile from "./LoadingProfile";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import SearchInput from "./Search";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { errorResponseSchema } from "@/schema/schema";

const Navbar = ({
  theme,
  setTheme,
}: {
  theme: "light" | "dark";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
}) => {
  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: () => verifyUserToken(),
  });

  const dispatch = useAppDispatch();

  const { mutate } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toast.success("You are logout Successfully");
      dispatch(deleteUser());
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      const parsed = errorResponseSchema.safeParse(axiosError.response?.data);

      if (parsed.success) {
        toast.error(parsed.data.message);
      } else {
        toast.error("Failed to logout");
      }
    },
  });

  useEffect(() => {
    if (data) {
      dispatch(addUser(data));
    }
  }, [data, dispatch]);

  const user = useCurrentUser();
  const userId = user?.id;
  const imageUrl = user?.imageUrl;

  return (
    <nav className="bg-background border-b border-border shadow-sm">
      <div className="mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-primary tracking-tight hover:opacity-80"
        >
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-7 h-7 text-primary" />
            <span className="text-lg font-semibold tracking-wide">
              ReachOut
            </span>
          </div>
        </Link>
        <div className="hidden sm:flex flex-1 justify-center sm:max-w-xs md:max-w-sm">
          <SearchInput />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <BellRing className="text-primary" />
          </Button>
          <Link to="/messages">
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <MessageSquareQuote className="text-primary" />
            </Button>
          </Link>
          <ThemeSwitcher setTheme={setTheme} theme={theme} />

          {/* Avatar or User Icon */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {isPending ? (
                <LoadingProfile />
              ) : userId ? (
                <Avatar className="cursor-pointer">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  )}
                </Avatar>
              ) : (
                <Button variant="ghost" size="icon">
                  <User className="w-5 h-5 cursor-pointer text-muted-foreground hover:text-primary" />
                </Button>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {userId ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/my-help-offers"
                      className="flex items-center gap-2"
                    >
                      <Handshake className="w-4 h-4" />
                      My Offers
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/my-help-requests"
                      className="flex items-center gap-2"
                    >
                      <HelpCircle className="w-4 h-4" />
                      My Help
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/create-help-request"
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Create Help
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/about" className="flex items-center gap-2">
                      <BadgeInfo className="w-4 h-4" />
                      About
                    </Link>
                  </DropdownMenuItem>

                  <Separator className="my-0.5" />
                  <DropdownMenuItem
                    // className="text-red-500"
                    onClick={() => mutate()}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Login
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/sign-up" className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Signup
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/about" className="flex items-center gap-2">
                      <BadgeInfo className="w-4 h-4" />
                      About
                    </Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="sm:hidden mx-8 mb-2">
        <SearchInput />
      </div>
    </nav>
  );
};

export default Navbar;
