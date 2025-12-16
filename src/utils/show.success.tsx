import { CircleCheckBig } from 'lucide-react';
import { toast } from 'sonner';

export const showSuccess = (message: string) => {
  return toast.success(message, {
    icon: <CircleCheckBig className="w-4 h-4 text-chart-2" />,
  });
};
