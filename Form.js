import { useForm } from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup"

export const Form = () => {

  const schema = yup.object().shape({
    fullName: yup.string().required("full name required"),
    email: yup.string().email().required(),
    age: yup.number().integer().min(18).required("age should be greater thn equal to 18"),
    password: yup.string().min(4).max(15).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null])
      .required(),
  });

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Full name" {...register("fullName")}></input><p>{errors.fullName?.message}</p>
        <br />
        <input type="email" placeholder="email" {...register("email")}></input>
        <p>{errors.email?.message}</p>
        <br />
        <input placeholder="Age" type="number" {...register("age")}></input>
        <p>{errors.age?.message}</p>
        <br />
        <input
          type="password"
          placeholder="password"
          {...register("password")}
        ></input>
        <p>{errors.password?.message}</p>
        <br />
        <input
          type="password"
          placeholder="confirm password"
          {...register("confirmPassword")}
        ></input>
        <p>{errors.confirmPassword?.message}</p>
        <br />
        <input type="submit"></input>
      </form>
    </div>
  );
};
