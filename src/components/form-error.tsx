import { TriangleAlert } from "lucide-react";

interface Props {
  message: string;
}

const FormError = ({ message }: Props) => {
  return (
    <div className="bg-red-500/30 rounded flex gap-3 text-red-600 px-3 py-5 w-full">
      <TriangleAlert/>
      <span>{message}</span>
    </div>
  );
};

export default FormError;
