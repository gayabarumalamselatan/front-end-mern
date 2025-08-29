import { DELAY } from '@/constants/list.constants';
import { ToasterContext } from '@/contexts/ToasterContext';
import useDebounce from '@/hooks/useDebounce';
import useMediaHandling from '@/hooks/useMediaHandling';
import categoryServices from '@/services/category.service';
import eventServices from '@/services/event.service';
import { ICategory } from '@/types/Category';
import { yupResolver } from '@hookform/resolvers/yup';
import { DateValue } from '@nextui-org/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';


const schema = yup.object().shape({
  name: yup.string().required("Please input name."),
  slug: yup.string().required("Please input slug."),
  category: yup.string().required("Please select category"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  isPublished: yup.string().required("Please select status"),
  isFeatured: yup.string().required("Please select featured"),
  description: yup.string().required("Please input description"),
  isOnline: yup.string().required("Please select online or offline"),
  region: yup.string().required("Please select region"),
  banner: yup.mixed<FileList | string>().required("Please input banner"),
  longitude: yup.string().required("Please input longitude coordinate"),
  latitude: yup.string().required("Please input latitude coordinate"),
});

const useAddEventModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const debounce = useDebounce();

  const {
    isPendingMutateUploadFile,
    isPendingMutateDeleteFile,
    handleUploadFile,
    handleDeleteFile
  } = useMediaHandling();

  const {
    control, 
    handleSubmit: handleSubmitform, 
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
  });

  const preview = watch("banner");
  const fileUrl = getValues("banner");

  const handleUploadBanner = (
    files: FileList, 
    onChange: (files: FileList | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if(fileUrl){
        setValue("banner", fileUrl);
      }
    })
  }

  const handleDeleteBanner = (
    onChange: (files: FileList | undefined) => void
  ) => {  
    handleDeleteFile(fileUrl, () => onChange(undefined));
  }

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  }

  const {
    data: dataCategory, 
  } = useQuery({
    queryKey: ["Categories"],
    queryFn: () => categoryServices.getCategoriers(),
    enabled: true,
  })

  const [searchRegency, setSearchRegency] = useState("");

  const { 
    data: dataRegion
  } = useQuery({
    queryKey: ["region", searchRegency],
    queryFn: () => eventServices.searchLocationByRegency(`${searchRegency}`),
    enabled: searchRegency !== "",
  });

  const handleSearchRegion = (region: string) => {
    debounce(() => setSearchRegency(region), DELAY);
  }


  const addCategory = async (payload: ICategory) => {
    const res = await categoryServices.addCategory(payload);
    return res;
  };

  const {
    mutate: mutateAddCategory, 
    isPending: isPendingMutateAddCategory, 
    isSuccess: isSuccessMutateAddCategory
  } = useMutation({
    mutationFn: addCategory,
    onError:(error) => {
      setToaster({
        type: "error",
        message: error.message,
      })
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add new category"
      })
      reset()
    },
  })

  const handleAddCategory = (data: ICategory) => mutateAddCategory(data);

  return{
    control,
    errors,
    reset,
    handleSubmitform,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    handleUploadBanner,
    isPendingMutateUploadFile,
    preview,
    handleDeleteBanner,
    isPendingMutateDeleteFile,
    handleOnClose,
    dataCategory,
    handleSearchRegion,
    dataRegion,
    searchRegency
  }
}

export default useAddEventModal