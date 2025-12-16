import { Switch } from '@/components/ui/switch';
import { updateCounter } from '@/features/common.slice';
import { customFetch } from '@/utils/auth/custom.fetch';
import { useAppDispatch } from '@/utils/hooks';
import { showSuccess } from '@/utils/show.success';

const AppToggleStatus = ({
  status,
  api,
  setLoading,
}: {
  status: boolean;
  api: string;
  setLoading: (loading: boolean) => void;
}) => {
  const dispatch = useAppDispatch();

  const toggleStatus = async (checked: boolean) => {
    setLoading(true);
    try {
      const response = await customFetch.post(api, { is_active: checked });
      if (response.status === 200) {
        showSuccess('Status updated successfully');
        dispatch(updateCounter());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch checked={status} onCheckedChange={toggleStatus} />
    </div>
  );
};
export default AppToggleStatus;
