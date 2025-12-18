import AppSubmitBtn from '@/components/app/shared/AppSubmitBtn';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { Controller, useForm } from 'react-hook-form';
import { categorySchema, type CategorySchema } from '@/schemas/settings.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppIconPicker } from '@/components';
import { useEffect, useState } from 'react';
import { customFetch } from '@/utils/api/custom.fetch';
import { showSuccess } from '@/utils/show.success';
import { useAppDispatch, useAppSelector } from '@/utils/hooks';
import { updateCounter } from '@/features/common.slice';
import type {
  Library,
  SelectedIcon,
} from '@/components/app/shared/AppIconPicker';

const MAX_COUNT = 200;
const isLibrary = (val: string): val is Library =>
  val === 'react-icons/gi' || val === 'react-icons/fa';

const AppAddEditCategory = ({ editId, setEditId }: EditFormProps) => {
  const { categories } = useAppSelector((store) => store.categories);
  const data = categories.find((cat) => cat.id === editId);
  const [icon, setIcon] = useState<SelectedIcon>(undefined);
  const {
    formState: { isSubmitting, errors },
    ...form
  } = useForm<CategorySchema>({
    defaultValues: { name: '', icon: '', description: '' },
    mode: 'all',
    resolver: zodResolver(categorySchema),
  });
  const dispatch = useAppDispatch();

  // --------------------

  useEffect(() => {
    data &&
      form.reset({
        name: data.name,
        icon: data.icon ? data.library + '|' + data.icon : '',
        description: data.description || '',
      });
    const lib =
      data && data.library && isLibrary(data.library)
        ? data.library
        : 'react-icons/fa';
    data &&
      data.icon &&
      setIcon({
        library: lib,
        name: data.icon,
      });
  }, [data]);

  // --------------------

  const reset = () => {
    form.reset({ name: '', icon: '', description: '' });
    setIcon(undefined);
    setEditId && setEditId(null);
  };

  // --------------------

  const handleSubmit = async (data: CategorySchema) => {
    const api = editId ? `/admin/categories/${editId}` : `/admin/categories`;
    const onsuccess = editId
      ? 'Category updated successfully'
      : 'Category added successfully';
    const method = editId ? customFetch.put : customFetch.post;
    try {
      const response = await method(api, data);

      if (response.status === 200 || response.status === 201) {
        showSuccess(onsuccess);
        reset();
        dispatch(updateCounter());
      }
    } catch (error) {
      if ((error as any)?.response?.data?.errors) {
        Object.entries((error as any).response.data.errors).forEach(
          ([key, message]) => {
            form.setError(key as keyof CategorySchema, {
              message: message as string,
            });
          }
        );
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-inter">
          {editId ? 'Edit category' : 'Add new category'}
        </CardTitle>
        <CardDescription className="text-xs font-inter">
          Click the ✏️ icon to modify the category
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset disabled={isSubmitting}>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <InputGroup>
                  <InputGroupInput
                    {...form.register('name')}
                    placeholder="Enter category name"
                  />
                  <AppIconPicker
                    value={icon}
                    onChange={(val) => {
                      setIcon(val);
                      form.setValue(
                        'icon',
                        val ? `${val.library}|${val.name}` : ''
                      );
                    }}
                  />
                </InputGroup>
                <span className="text-xs text-destructive -mt-1.5">
                  {errors.name?.message}
                </span>
              </div>
              <div className="grid gap-2">
                <Controller
                  control={form.control}
                  name="description"
                  render={({ field }) => {
                    const remaining = MAX_COUNT - (field.value?.length ?? 0);

                    const handleChange = (
                      e: React.ChangeEvent<HTMLTextAreaElement>
                    ) => {
                      const input = e.target.value;

                      if (input.length <= MAX_COUNT) {
                        field.onChange(input);
                      } else {
                        field.onChange(input.slice(0, MAX_COUNT));
                      }
                    };

                    const handlePaste = (
                      e: React.ClipboardEvent<HTMLTextAreaElement>
                    ) => {
                      const pasted = e.clipboardData.getData('text');
                      const newValue = (field.value || '') + pasted;

                      if (newValue.length > MAX_COUNT) {
                        e.preventDefault();
                        field.onChange(newValue.slice(0, MAX_COUNT));
                      }
                    };

                    return (
                      <InputGroup>
                        <InputGroupTextarea
                          {...form.register('description')}
                          placeholder="Enter a short description"
                          value={field.value?.slice(0, MAX_COUNT) || ''}
                          onChange={handleChange}
                          onPaste={handlePaste}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="text-muted-foreground text-[10px]">
                            {remaining} characters left
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    );
                  }}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end items-center gap-4 mt-6">
            <AppSubmitBtn
              label="Save"
              isSubmitting={isSubmitting}
              submitLabel="Saving ..."
            />
            <Button type="button" size={'sm'} variant="outline" onClick={reset}>
              Reset
            </Button>
          </CardFooter>
        </fieldset>
      </form>
    </Card>
  );
};
export default AppAddEditCategory;
