import { FaCameraRetro } from 'react-icons/fa';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Link, useNavigate } from 'react-router-dom';
import { AuroraText } from '@/components/ui/aurora-text';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { CircleUser, EyeIcon, EyeOffIcon, LockKeyhole } from 'lucide-react';
import { images, titles } from '@/constants';
import { useForm } from 'react-hook-form';
import { signinSchema, type SigninSchema } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { customFetch } from '@/utils/api/custom.fetch';
import { showSuccess } from '@/utils/show.success';
import { userManager } from '@/utils/api/user.manager';
import { refreshFetch } from '@/utils/api/refresh.fetch';
import AppSubmitBtn from '@/components/app/shared/AppSubmitBtn';

const AppSignin = () => {
  document.title = `Admin Sign In | ${titles.siteName}`;
  const {
    formState: { isSubmitting, errors },
    ...form
  } = useForm<SigninSchema>({
    defaultValues: { username: 'souvik@test.com', password: 'password' },
    mode: 'all',
    resolver: zodResolver(signinSchema),
  });
  const [ptype, setPtype] = useState<string>('password');
  const navigate = useNavigate();

  // --------------------

  const handleSubmit = async (data: SigninSchema) => {
    try {
      const response = await refreshFetch.post(`/auth/admin-login`, data);
      if (response.status === 200) {
        const name = response.data.data.name;
        const oneTimeToken = response.data.one_time_pass;
        userManager.setUser(response.data.data);

        await customFetch.post(`/auth/delete-otp/${oneTimeToken}`);

        showSuccess(`Welcome back, ${name}!`);
        navigate('/admin/dashboard');
      }
    } catch (error) {
      if ((error as any).status === 422) {
        Object.entries((error as any).response.data.errors).forEach(
          ([key, message]) => {
            form.setError(key as keyof SigninSchema, {
              message: message as string,
            });
          }
        );
        return;
      } else {
        form.setError('root', {
          message: 'Incorrect credentials. Please try again',
        });
        return;
      }
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <FaCameraRetro className="size-4" />
            </div>
            M-App
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-6"
            >
              <fieldset disabled={isSubmitting}>
                <FieldGroup>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <h1 className="text-2xl font-bold">
                      <AuroraText>Admin</AuroraText> login
                    </h1>
                    <p className="text-muted-foreground text-sm text-balance">
                      Enter your email below to login to your account
                    </p>
                  </div>
                  <span className="text-destructive text-center text-xs font-inter -mb-4">
                    {errors.root?.message}
                  </span>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...form.register('username')}
                        placeholder="enter email"
                      />
                      <InputGroupAddon>
                        <CircleUser />
                      </InputGroupAddon>
                    </InputGroup>
                    <span className="text-xs text-destructive -mt-1.5">
                      {errors.username?.message}
                    </span>
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Link
                        to="#"
                        tabIndex={-1}
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <InputGroup>
                      <InputGroupInput
                        type={ptype}
                        {...form.register('password')}
                        placeholder="enter password"
                      />
                      <InputGroupAddon>
                        <LockKeyhole />
                      </InputGroupAddon>
                      <InputGroupAddon align="inline-end">
                        <InputGroupButton
                          onClick={() =>
                            setPtype(ptype === 'password' ? 'text' : 'password')
                          }
                          title={
                            ptype === 'password'
                              ? 'Show password'
                              : 'Hide password'
                          }
                        >
                          {ptype === 'password' ? (
                            <EyeIcon className="h-4 w-4" />
                          ) : (
                            <EyeOffIcon className="h-4 w-4" />
                          )}
                        </InputGroupButton>
                      </InputGroupAddon>
                    </InputGroup>
                    <span className="text-xs text-destructive -mt-1.5">
                      {errors.password?.message}
                    </span>
                  </Field>
                  <Field>
                    <AppSubmitBtn
                      label="Sign in"
                      isSubmitting={isSubmitting}
                      submitLabel="Signing in ..."
                    />
                  </Field>
                </FieldGroup>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src={images.loginBg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};
export default AppSignin;
