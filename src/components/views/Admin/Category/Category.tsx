import DataTable from "@/components/ui/DataTable"
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react"
import { COLUMN_LIST_CATEGORY } from "./Category.constant";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import Image from "next/image";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const Category = () => {
  const {push, isReady, query} = useRouter();

  const { 
    dataCategory, 
    isLoadingCategory, 
    isRefetchingCategory,

    refetchCategory,
    selectedId, 
    setSelectedId
  } = useCategory();

  const addCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();
  const { setUrl } = useChangeUrl();
  
  useEffect(() => {
    if(isReady){
      setUrl();
    }
  },[isReady])

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];
      
      switch(columnKey) {
        case "icon":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200}/>
          );
        case "actions":
          return (
            <DropdownAction 
              onPressButtonDelete={() => {
                setSelectedId(`${category._id}`)
                deleteCategoryModal.onOpen()
              }}
              onPressButtondetail={() => push(`/admin/category/${category._id}`)}
            />
          );
        default: 
        return cellValue as ReactNode;
      }
    }, [push]
  )
  return(
    <section>
      {Object.keys(query).length > 0 &&(
        <DataTable
          renderCell={renderCell} 
          columns={COLUMN_LIST_CATEGORY} 
          data={dataCategory?.data || []}
          buttonTopContentLabel="Create Category"
          onClickButtonTopContent={addCategoryModal.onOpen}
          totalPages={dataCategory?.pagination.totalPages}
          emptyContent="Category is empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
        />
      )}

      <AddCategoryModal {...addCategoryModal} refetchCategory={refetchCategory} />
 
      <DeleteCategoryModal 
        {...deleteCategoryModal} 
        refetchCategory={refetchCategory} 
        selectedId = {selectedId}
        setSelectedId = {setSelectedId}
      />

    </section>
  )
}

export default Category