import { LucideInfo } from "lucide-react";

interface Props {
  message: string;
}

const FormSuccess = ({ message }: Props) => {
  return (
    <div className="bg-emerald-500/30 rounded flex items-center gap-2 text-emerald-600 px-3 py-5 w-full">
      <LucideInfo/>
      <span>{message}</span>
    </div>
  );
};

export default FormSuccess;
