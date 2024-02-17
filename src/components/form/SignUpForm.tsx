"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import GoogleSignInButton from "../GoogleSignInButton";
import { AuthService } from "../../app/api/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    cpf: z
      .string()
      .min(11, "Número de CPF deve conter 18 caracteres")
      .max(11, "Número de CPF deve conter 18 caracteres"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    cel: z
      .string()
      .min(10, "Favor inserir DDD + número")
      .max(12, "Verifique seu número novamente"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const SignUpForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [errorLogin, setErrorLogin] = useState("");
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    try {
      const { data } = await AuthService.register({
        name: values.username,
        email: values.email,
        cpf: values.cpf,
        cellphone: values.cel,
        type: "user",
        password: values.password,
      });
      if (data.data.token) {
        setErrorLogin("");
        localStorage.setItem("token", data.data.token);
        router.push("/");
      }
      if (data.data.error) {
        setErrorLogin(data.data.error);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu CPF"
                    type="string"
                    maxLength={11}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="mail@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Celular DD + número</FormLabel>
                <FormControl>
                  <Input
                    placeholder="12999999999"
                    type="string"
                    maxLength={11}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirme sua senha"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {errorLogin !== "" ? (
          <p className="text-red-600">{errorLogin}</p>
        ) : null}
        <Button className="w-full mt-6" type="submit">
          Sign up
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      {/* <GoogleSignInButton>Sign up with Google</GoogleSignInButton> */}
      <p className="text-center text-sm text-gray-600 mt-2">
        If you don&apos;t have an account, please&nbsp;
        <Link className="text-blue-500 hover:underline" href="/sign-in">
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default SignUpForm;
