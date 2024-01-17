import { useState } from "react";

export const useForm = () => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  const onChangeValue = (event: any) => {
    setFormState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
  };

  return {
    ...formState,
    onChangeValue,
    onSubmit,
  };
};
