import DataTable from "@/components/ui/DataTable"
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react"
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_CATEGORY } from "./Category.constant";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";

const Category = () => {
  const {push, isReady, query} = useRouter();

  const { 
    dataCategory, 
    isLoadingCategory, 
    setURL, 
    currentPage, 
    currentLimit,
    isRefetchingCategory,
    handleChangeLimit,
    handleChangePage,
    handleSearch,
    handleClearSearch,
    refetchCategory,
  } = useCategory();

  const addCategoryModal = useDisclosure();

  useEffect(() => {
    if(isReady){
      setURL();
    }
  },[])
  
  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];
      
      switch(columnKey) {
        // case "icon":
        //   return (
        //     <Image src={`${cellValue}`} alt="icon" width={100} height={200}/>
        //   );
        case "actions":
          return (
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <CiMenuKebab className="text-default-700"/>
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="detail-category-button" onPress={() => push(`/admin/category/${category._id}`)}>Detail Category</DropdownItem>
                <DropdownItem key="delete-category-button" className="text-danger-500">Delete Category</DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
          onChangeSearch={handleSearch}
          onClearSearch={handleClearSearch}
          buttonTopContentLabel="Create Category"
          onClickButtonTopContent={addCategoryModal.onOpen}
          limit={String(currentLimit)}
          onChangeLimit={handleChangeLimit}
          currentPage={Number(currentPage)}
          onChangePage={handleChangePage}
          totalPages={dataCategory?.pagination.totalPages}
          emptyContent="Category is empty"
          isLoading={isLoadingCategory || isRefetchingCategory}
        />
      )}

      <AddCategoryModal {...addCategoryModal} refetchCategory={refetchCategory} />

    </section>
  )
}

export default Category