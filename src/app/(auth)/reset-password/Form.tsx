"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import OtpInput from "react-otp-input";
import Countdown from "react-countdown";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { trpc } from "@/app/_trpc/client";
import { resetPasswordSchema, updatePasswordSchema } from "@/lib/zod";

const countdownRenderer = ({
  total,
  completed,
}: {
  total: number;
  completed: boolean;
}) => {
  const remainingSeconds = Math.floor(total / 1000);

  if (!completed) {
    return (
      <p className="mt-2 text-sm text-center text-muted-foreground">
        Didn't receive the code? Resend in {remainingSeconds}s
      </p>
    );
  }
};

export default function Form() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");

  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isOtpExpired, setIsOtpExpired] = useState<boolean>(false);
  const [otpExpiresAt, setOtpExpiresAt] = useState<number>();
  const [otp, setOtp] = useState("");

  const router = useRouter();

  const { toast } = useToast();

  const { mutate: resetPassword } = trpc.user.resetPassword.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: () => {
      setIsOtpSent(true);
      setIsOtpExpired(false);
      setOtpExpiresAt(new Date().setMinutes(new Date().getMinutes() + 2));
    },
    onError: (err) => {
      toast({
        variant: "destructive",
        title: err.message,
      });
    },
  });

  const { mutate: updatePassword } = trpc.user.updatePassword.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Password updated successfully",
      });

      router.push("/login");
    },
    onError: (err) => {
      setIsLoading(false);

      toast({
        variant: "destructive",
        title: err.message,
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isLoading) {
      try {
        const data = {
          email,
        };

        const result = await resetPasswordSchema.safeParseAsync(data);

        if (!result.success) {
          throw new Error(result.error.errors[0].message);
        }

        resetPassword({
          email,
        });
      } catch (err) {
        const error = err as Error;

        toast({
          variant: "destructive",
          title: error.message,
        });
      }
    }
  };

  const handleResend = () => {
    if (!isLoading) {
      resetPassword({
        email,
      });
    }
  };

  const handleUpdatePassword = async () => {
    if (!isLoading && otp.length === 6) {
      try {
        const data = {
          email,
          password,
          cPassword,
          otp,
        };

        const result = await updatePasswordSchema.safeParseAsync(data);

        if (!result.success) {
          throw new Error(result.error.errors[0].message);
        }

        updatePassword({
          email,
          password,
          cPassword,
          otp,
        });
      } catch (err) {
        const error = err as Error;

        toast({
          variant: "destructive",
          title: error.message,
        });
      }
    }
  };

  return !isOtpSent ? (
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

      <Button disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />} Reset
      </Button>

      <p className="mt-2 text-sm text-center text-muted-foreground">
        Remembered your password?{" "}
        <Link href={"/login"} className="text-foreground hover:underline">
          Login
        </Link>
      </p>
    </form>
  ) : (
    <div className="w-full max-w-[350px] flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">Otp code:</p>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        containerStyle={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "10px",
        }}
        inputStyle={{
          width: "100%",
        }}
        renderInput={(props) => (
          <input {...props} className={`aspect-square border rounded-lg`} />
        )}
      />

      <Input
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
        type="text"
        placeholder="New password"
        required
      />

      <Input
        value={cPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setCPassword(e.target.value);
        }}
        type="text"
        placeholder="Confirm password"
        required
      />

      <Button
        disabled={isLoading}
        onClick={handleUpdatePassword}
        className="w-full"
      >
        {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />} Update
        password
      </Button>

      {isOtpExpired ? (
        <p className="mt-2 text-sm text-center text-muted-foreground">
          Didn't receive the code?{" "}
          <span
            onClick={handleResend}
            className="text-foreground hover:underline cursor-pointer"
          >
            Resend
          </span>
        </p>
      ) : (
        <Countdown
          date={otpExpiresAt}
          renderer={countdownRenderer}
          onComplete={() => setIsOtpExpired(true)}
        />
      )}
    </div>
  );
}
