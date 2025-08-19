import { Button } from "@/components/ui/button";
import { FaGoogle,FaGithub } from "react-icons/fa6";

export function SocialLogin({ onGoogle, onGithub }: { onGoogle: () => void; onGithub: () => void }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Button
        type="button"
        onClick={onGoogle}
        className="flex items-center justify-center gap-2 px-4 py-2 border rounded bg-white hover:bg-gray-100 text-gray-800 shadow"
        aria-label="Continue with Google"
      >
        <FaGoogle size={20} />
        Continue with Google
      </Button>
      <Button
        type="button"
        onClick={onGithub}
        className="flex items-center justify-center gap-2 px-4 py-2 border rounded bg-black hover:bg-gray-900 text-white shadow"
        aria-label="Continue with Github"
      >
        <FaGithub size={20} />
        Continue with Github
      </Button>
    </div>
  );
}
