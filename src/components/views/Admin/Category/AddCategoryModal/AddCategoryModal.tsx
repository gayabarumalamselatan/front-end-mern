import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, Textarea } from "@nextui-org/react"
import useAddCategoryModal from "./useAddCategoryModal";
import { Controller } from "react-hook-form";
import InputFile from "@/components/ui/InputFile";
import { useEffect } from "react";
import useMediaHandling from "@/hooks/useMediaHandling";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchCategory: () => void;
  onOpenChange: () => void;
}

const AddCategoryModal = (props: PropTypes) => {
  const { isOpen, onClose, refetchCategory, onOpenChange } = props;
  const {
    control,
    errors,
    handleOnClose,
    handleSubmitform,
    handleAddCategory,
    isPendingMutateAddCategory,
    isSuccessMutateAddCategory,
    handleUploadIcon,
    isPendingMutateUploadFile,
    preview,
    handleDeleteIcon,
    isPendingMutateDeleteFile
  } = useAddCategoryModal();

  useEffect(() => {
    if(isSuccessMutateAddCategory){
      onClose();
      refetchCategory();
    }
  },[isSuccessMutateAddCategory]);

  const disabledSubmit = isPendingMutateAddCategory || isPendingMutateUploadFile || isPendingMutateDeleteFile;

  return (
    <Modal 
      onOpenChange={onOpenChange}
      isOpen={isOpen} 
      placement="center" 
      scrollBehavior="inside"
      onClose={() => handleOnClose(onClose)}
    >
      <form onSubmit={handleSubmitform(handleAddCategory)}>
        <ModalContent className="m-4">
          <ModalHeader>
            Add Category
          </ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <Controller 
                name="name"
                control={control}
                render={({field}) => (
                  <Input 
                    {...field}
                    autoFocus 
                    label="Name" 
                    variant="bordered" 
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller 
                name="description"
                control={control}
                render={({field}) => (
                  <Textarea
                    {...field}
                    label="Description" 
                    variant="bordered" 
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                    className="mb-2"
                  />
                )}
              />
              <p className="text-sm font-bold">Icon</p>
              <Controller 
                name="icon"
                control={control}
                render={({ field: {onChange, value, ...field} }) => (
                  <InputFile
                    {...field}
                    onUpload={(files) => handleUploadIcon(files, onChange)}
                    isUploading={isPendingMutateUploadFile}
                    isInvalid={errors.icon !== undefined}
                    errorMessage={errors.icon?.message}
                    isDeleting={isPendingMutateDeleteFile}
                    onDelete={() => handleDeleteIcon(onChange)}
                    isDropable
                    preview={typeof preview === 'string' ? preview : ""}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button 
              color="danger" 
              variant="flat" 
              onPress={() => handleOnClose(onClose)}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button 
              color="danger" 
              type="submit"
              disabled={disabledSubmit}
            >
              {isPendingMutateAddCategory ? (
                <Spinner size="sm" color="white"/>
              ) : (
                "Create Category"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  )
}

export default AddCategoryModal