import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

type AuthCardProps = {
  children?: React.ReactNode;
};

function AuthCard({ children }: AuthCardProps) {
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
      className="w-full"
    >
      <Card
        className="w-180 h-200 rounded-4xl shadow-lg border-0 backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--accent)) 10%, hsl(var(--background)) 40%)",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <CardContent className="p-6">{children}</CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}

export default AuthCard;
