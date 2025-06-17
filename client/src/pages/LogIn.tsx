import AuthCard from "../components/authComponents/AuthCard";
import { Mail, Lock } from "@geist-ui/icons";
import AuthInPuts from "../components/authComponents/AuthInputs";
import AuthButtons from "../components/authComponents/AuthButtons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginShcema } from "../utils/schemas/auth-schema";
import { Link, useNavigate } from "react-router-dom";
import type { loginType } from "@/types/authTypes";

function LogIn() {
  const navigate = useNavigate();

  const form = useForm<loginType>({
    resolver: zodResolver(loginShcema),
    defaultValues: { email: "", password: "" },
  });

  console.log("Form values:", form.formState.errors);

  const loginText = {
    title: "Iniciar sesión con correo electrónico",
    description:
      "Inicia sesión ahora y acelera tu camino hacia la libertad financiera.",
  };

  const onSummit = form.handleSubmit((values: loginType) => {
    console.log("Form submitted with values:", values);

    navigate("/"); // Redirigir a la página de inicio después del inicio de sesión exitoso
  });

  return (
    <AuthCard title={loginText.title} description={loginText.description}>
      <Form {...form}>
        <form
          className="w-full flex flex-col justify-around h-full"
          onSubmit={onSummit}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInPuts type="email" placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AuthInPuts
                    type="password"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Link
              to={"/forgot-password"}
              className="text-sm text-muted-foreground px-0 hover:underline "
            >
              Olvidaste tu contraseña?
            </Link>
          </div>
          <AuthButtons>Iniciar Sesión</AuthButtons>
          <div className="flex justify-center items-center mt-4">
            <p className="text-sm text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link to="/register" className=" font-medium my-element ">
                Regístrate
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </AuthCard>
  );
}

export default LogIn;
