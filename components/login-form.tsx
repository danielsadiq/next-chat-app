"use client"

import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { PasswordInput } from "./ui/passwordInput";

type Inputs = {
  email: string;
  password: string;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  
  // const onSubmit: SubmitHandler<Inputs> = (data) => {
  async function onSubmit(data: Inputs){
    const res = await fakeLoginApi(data);
    if (res){
      router.push('/chat')
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register("email")}
                />
                <FieldDescription>
                  {errors.email && <span>This field is required</span>}
                </FieldDescription>
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <PasswordInput
                id="password"
                required
                {...register("password")}
                />
                <FieldDescription>
                  {errors.password && <span>This field is required</span>}
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Mock API call for example
async function fakeLoginApi(data: {email:string, password:string}){
  const {email, password} = data;
  await new Promise((r) => setTimeout(r, 800))
  return { success: email === "danielsadiq93@gmail.com" && password === "danielsadiq" }
}