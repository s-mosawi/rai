'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { signIn, SignInResponse } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function Form() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);

      try {
        const res: SignInResponse | undefined = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (!res) throw new Error('Something went wrong');

        console.log(res);
        if (res.ok) {
          router.push('/dashboard');
        } else {
          throw new Error(res.error || 'Something went wrong');
        }
      } catch (err) {
        setIsLoading(false);

        const error = err as Error;

        toast({
          variant: 'destructive',
          title: error.message,
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[350px] flex flex-col gap-3"
    >
      <Input
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
        type="email"
        placeholder="Email address"
        required
      />

      <div className="relative">
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          value={password}
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          required
        />

        <Button
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          type="button"
          variant={'ghost'}
          size={'icon'}
          className="absolute top-1/2 right-0 -translate-y-1/2"
        >
          {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </Button>
      </div>

      <div className="my-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Checkbox id="terms" />

          <label htmlFor="terms" className="text-sm">
            Remember me
          </label>
        </div>

        <Link href="/reset-password" className="text-sm hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />} Login
      </Button>

      <p className="mt-2 text-sm text-center text-muted-foreground">
        Don't have an account?{' '}
        <Link href={'/sign-up'} className="text-foreground hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
