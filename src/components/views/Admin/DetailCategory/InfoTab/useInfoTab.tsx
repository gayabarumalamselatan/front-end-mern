import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const useInfoTab = () => {
  const schemaUpdateInfo = yup.object().shape({
    name: yup.string().required("Please input name"),
    description: yup.string().required("Please input description")
  });
  const {
    control: controlUpdateInfo, 
    handleSubmit: handleSubmitUpdateInfo, 
    formState: { errors: errorsUpdateInfo },
    reset: resetUpdateInfo,
    setValue: setValueUpdateInfo
  } = useForm({
    resolver: yupResolver(schemaUpdateInfo),
  });
  return {
    controlUpdateInfo,
    handleSubmitUpdateInfo,
    errorsUpdateInfo,
    resetUpdateInfo,
    setValueUpdateInfo,
  }
}

export default useInfoTab