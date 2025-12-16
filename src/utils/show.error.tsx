import { toast } from 'sonner';
import { XCircle } from 'lucide-react';

export const showError = (message: string) => {
  return toast.error(message, {
    icon: <XCircle className="w-4 h-4 text-destructive" />,
  });
};
