import { useAppSelector } from "../../../hooks/hooks";
import "./BasicInfo.scss";
import { useAppDispatch } from "../../../hooks/hooks";
import { updateUser } from "../../../store/actions/user-actions";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import TextField from "../../../components/UI/TextField";

const BasicInfo = () => {
  const { data: user, token } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const validate = Yup.object({
    name: Yup.string().max(20).required("Name is required"),
    slogan: Yup.string(),
    bio: Yup.string(),
  });

  const onSubmit = (name: string, slogan: string, bio: string) => {
    dispatch(updateUser([name, slogan, bio]));
  };

  return (
    <Formik
      initialValues={{
        name: user!.name,
        slogan: user!.slogan,
        bio: user!.bio,
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        onSubmit(values.name, values.slogan, values.bio);
      }}
    >
      {(formik) => (
        <Form className="basic-info-container">
          <h3>Basic Info</h3>
          <TextField
            name="name"
            pholder={user!.name}
            isLarge={false}
            className="basic-info-container__input"
          />
          <TextField
            name="slogan"
            isLarge={false}
            pholder={user?.slogan || "Add your slogan here!"}
            className="basic-info-container__input"
          />
          <TextField
            name="bio"
            isLarge={true}
            pholder={user?.bio || "Add your bio here!"}
            className="basic-info-container__input"
          />
          <button type="submit">Save</button>
        </Form>
      )}
    </Formik>
  );
};

export default BasicInfo;
