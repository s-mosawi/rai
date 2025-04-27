"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import { useToast } from "@/hooks/use-toast";
import { signUpSchema, verifySignUpSchema } from "@/lib/zod";
import OtpInput from "react-otp-input";
import Countdown from "react-countdown";
import { useRouter } from "next/navigation";

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
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [cPassword, setCPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);

  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [isOtpExpired, setIsOtpExpired] = useState<boolean>(false);
  const [otpExpiresAt, setOtpExpiresAt] = useState<number>();
  const [otp, setOtp] = useState("");

  const router = useRouter();

  const { toast } = useToast();

  const { mutate: signUp } = trpc.user.signUp.useMutation({
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

  const { mutate: createUser } = trpc.user.create.useMutation({
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Account created successfully",
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
          name,
          email,
          password,
          cPassword,
        };

        const result = await signUpSchema.safeParseAsync(data);

        if (!result.success) {
          throw new Error(result.error.errors[0].message);
        }

        signUp({
          name,
          email,
          password,
          cPassword,
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
      signUp({
        name,
        email,
        password,
        cPassword,
      });
    }
  };

  const handleVerify = async () => {
    if (!isLoading && otp.length === 6) {
      try {
        const data = {
          name,
          email,
          password,
          cPassword,
          otp,
        };

        const result = await verifySignUpSchema.safeParseAsync(data);

        if (!result.success) {
          throw new Error(result.error.errors[0].message);
        }

        createUser({
          name,
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
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
        type="text"
        placeholder="Full name"
        required
      />

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
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          required
        />

        <Button
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          type="button"
          variant={"ghost"}
          size={"icon"}
          className="absolute top-1/2 right-0 -translate-y-1/2"
        >
          {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </Button>
      </div>

      <div className="relative">
        <Input
          value={cPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setCPassword(e.target.value);
          }}
          type={showCPassword ? "text" : "password"}
          placeholder="Confirm password"
          required
        />

        <Button
          onClick={() => {
            setShowCPassword(!showCPassword);
          }}
          type="button"
          variant={"ghost"}
          size={"icon"}
          className="absolute top-1/2 right-0 -translate-y-1/2"
        >
          {showCPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </Button>
      </div>

      <div className="my-2 flex items-center gap-2">
        <Checkbox id="terms" required />

        <label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <Link href={"/terms-of-service"} className="underline">
            terms of service
          </Link>
        </label>
      </div>

      <Button disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />} Create
        account
      </Button>

      <p className="mt-2 text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link href={"/login"} className="text-foreground hover:underline">
          Login
        </Link>
      </p>
    </form>
  ) : (
    <div className="w-full max-w-[350px] flex flex-col gap-3">
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

      <Button disabled={isLoading} onClick={handleVerify} className="w-full">
        {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />} Verify
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
