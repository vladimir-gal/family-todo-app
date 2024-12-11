import { User } from "@/services/user/typings";
import { signOut } from "@/utils/supabase/actions";
import { Button, Card, CardHeader, CardTitle } from "design-library";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";

type ProfileSelectionProps = {
  data: User | undefined;
  onSelect: (id: string) => void;
};

const ProfileSelection: FC<ProfileSelectionProps> = ({ data, onSelect }) => {
  const router = useRouter();

  const messages = {
    title: "Select profile",
    description: "Please select who is using this app",
    signOut: "Log out",
  };

  const onSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-2 relative">
      <h1 className="text-center text-2xl font-bold">{messages.title}</h1>
      <p className="text-center text-sm mb-4">{messages.description}</p>
      <div className="flex flex-row gap-4">
        {data?.profiles.map((profile) => (
          <Card
            key={profile.id}
            onClick={() => onSelect(profile.id)}
            className="hover:opacity-80 hover:cursor-pointer"
          >
            <CardHeader className="flex items-center gap-2">
              <Image
                src="https://fastly.picsum.photos/id/574/400/400.jpg?hmac=Vf_AwWovDPEzmpMyv01-FvbV0KmkEHIlBnU6UusD7QE"
                alt={profile.name}
                width={400}
                height={400}
                className="rounded-full max-w-16 max-h-16"
              />
              <CardTitle>{profile.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center">
        <Button onClick={onSignOut} variant="outline">
          <LogOut className="mr-1" />
          {messages.signOut}
        </Button>
      </div>
    </div>
  );
};

export default ProfileSelection;
