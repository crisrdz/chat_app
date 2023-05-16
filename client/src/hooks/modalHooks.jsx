import { useEffect, useState } from "react";

export function useModalMessage() {
  const [modalMessage, setModalMessage] = useState(null);

  const showModalMessage = (message, error = false) => {
    setModalMessage({
      show: true,
      hide: false,
      error,
      message,
    });
  };

  useEffect(() => {
    let timeoutId;

    if (modalMessage && modalMessage.show) {
      timeoutId = setTimeout(() => {
        setModalMessage({
          show: false,
          hide: true,
          error: modalMessage.error,
          message: modalMessage.message,
        });
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [modalMessage]);

  return { modalMessage, showModalMessage };
}