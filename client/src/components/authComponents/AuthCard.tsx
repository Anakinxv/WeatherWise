import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "../../assets/Lgo.png";
import { motion } from "framer-motion";

type AuthCardProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        ease: "easeInOut",
      }}
      className="w-full h-screen flex items-center justify-center" // CAMBIO: altura 100% pantalla y centrado
    >
      <Card
        className="w-140 h-full max-h-[700px] rounded-4xl shadow-lg border-0 backdrop-blur-sm" // CAMBIO: h-full + max-height
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--accent)) 10%, hsl(var(--background)) 40%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="h-full flex flex-col" // CAMBIO: layout columna y ocupa todo el alto
        >
          <div className="flex justify-center items-center mb-4 pt-6">
            <img src={Logo} className="h-34 w-42 pointer-events-none" />
          </div>

          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-medium text-accent">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 flex-grow">
            {" "}
            {/* CAMBIO: flex-grow para llenar espacio */}
            {children}
          </CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}

export default AuthCard;
