import { useState, useEffect, useCallback, useRef } from "react";

// Opciones de configuración para el temporizador
type ResendTimerOptions = {
  // Tiempos de espera en segundos para cada intento
  waitTimes?: number[];
  // Tiempo máximo para cualquier intento después del último definido en waitTimes
  maxWaitTime?: number;
  // Persistir el contador de intentos en localStorage
  persistAttempts?: boolean;
  // Clave para guardar en localStorage
  localStorageKey?: string;
};

// Hook principal
export function useResendTimer({
  waitTimes = [30, 60, 120, 300, 600], // 30s, 1m, 2m, 5m, 10m
  maxWaitTime = 600, // 10 minutos por defecto
  persistAttempts = true,
  localStorageKey = "resend_attempts",
}: ResendTimerOptions = {}) {
  // Estado para controlar los intentos y el temporizador
  const [attempts, setAttempts] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [canResend, setCanResend] = useState(true);
  const timerRef = useRef<number | null>(null);

  // Carga el número de intentos desde localStorage si está habilitado
  useEffect(() => {
    if (persistAttempts) {
      try {
        const savedData = localStorage.getItem(localStorageKey);
        if (savedData) {
          const data = JSON.parse(savedData);
          setAttempts(data.attempts || 0);

          // Restaurar el temporizador si hay tiempo restante
          if (data.expiresAt) {
            const now = new Date().getTime();
            const expiresAt = data.expiresAt;
            if (expiresAt > now) {
              setTimeRemaining(Math.ceil((expiresAt - now) / 1000));
              setCanResend(false);
            }
          }
        }
      } catch (error) {
        console.error("Error al cargar datos de reenvío:", error);
      }
    }
  }, [persistAttempts, localStorageKey]);

  // Función para iniciar el temporizador
  const startTimer = useCallback(
    (durationInSeconds: number) => {
      // Limpiar cualquier temporizador existente
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }

      setCanResend(false);
      setTimeRemaining(durationInSeconds);

      // Guardar la hora de expiración si persistAttempts está habilitado
      if (persistAttempts) {
        const expiresAt = new Date().getTime() + durationInSeconds * 1000;
        localStorage.setItem(
          localStorageKey,
          JSON.stringify({
            attempts,
            expiresAt,
          })
        );
      }

      // Iniciar el temporizador de cuenta regresiva
      timerRef.current = window.setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            setCanResend(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    },
    [attempts, persistAttempts, localStorageKey]
  );

  // Función para manejar el reenvío
  const handleResend = useCallback(() => {
    if (!canResend) return false;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // Determinar el tiempo de espera para este intento
    const waitTimeIndex = Math.min(newAttempts - 1, waitTimes.length - 1);
    const waitTime =
      waitTimeIndex < waitTimes.length ? waitTimes[waitTimeIndex] : maxWaitTime;

    // Guardar el número de intentos en localStorage si está habilitado
    if (persistAttempts) {
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          attempts: newAttempts,
          expiresAt: new Date().getTime() + waitTime * 1000,
        })
      );
    }

    // Iniciar el temporizador
    startTimer(waitTime);
    return true;
  }, [
    canResend,
    attempts,
    waitTimes,
    maxWaitTime,
    persistAttempts,
    localStorageKey,
    startTimer,
  ]);

  // Función para reiniciar el temporizador
  const resetTimer = useCallback(() => {
    setAttempts(0);
    setTimeRemaining(0);
    setCanResend(true);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (persistAttempts) {
      localStorage.removeItem(localStorageKey);
    }
  }, [persistAttempts, localStorageKey]);

  // Limpiar el temporizador cuando se desmonte el componente
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Formatear el tiempo restante para mostrarlo (mm:ss)
  const formattedTimeRemaining = useCallback(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [timeRemaining]);

  return {
    canResend,
    timeRemaining,
    formattedTime: formattedTimeRemaining(),
    handleResend,
    resetTimer,
    attempts,
  };
}
