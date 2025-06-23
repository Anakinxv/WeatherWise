import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingSpinnerProps {
  isLoading: boolean;
  zIndex?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading,
  zIndex = 3000,
}) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/30"
          style={{ zIndex }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {/* Just the Spinner Circle */}
          <div className="relative h-16 w-16">
            <motion.div
              className="h-full w-full border-4 border-blue-500 border-opacity-25 rounded-full"
              style={{ borderTopColor: "transparent" }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingSpinner;
