import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { updateCounter } from '@/features/common.slice';
import { customFetch } from '@/utils/api/custom.fetch';
import { useAppDispatch } from '@/utils/hooks';
import { showSuccess } from '@/utils/show.success';
import { Trash2 } from 'lucide-react';

type AppDeleteProps = {
  api: string;
  confirmationHeader: string;
  confirmationText: string;
  successText: string;
  setLoading: (loading: boolean) => void;
};

const AppDelete = ({
  api,
  confirmationHeader = 'Are you absolutely sure?',
  confirmationText,
  successText,
  setLoading,
}: AppDeleteProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await customFetch.delete(api);
      if (response.status === 200) {
        showSuccess(successText);
        dispatch(updateCounter());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button" className="cursor-pointer p-1">
          <Trash2 className="text-destructive w-3.5 h-3.5" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmationHeader}</AlertDialogTitle>
          <AlertDialogDescription>{confirmationText}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive" onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AppDelete;
