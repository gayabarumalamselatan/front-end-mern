import DataTable from "@/components/ui/DataTable"
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react"
import { CiMenuKebab } from "react-icons/ci";
import { COLUMN_LIST_EVENT } from "./Event.constant";
import useEvent from "./useEvent";
import Image from "next/image";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const Event = () => {
  const {push, isReady, query} = useRouter();

  const { 
    dataEvents, 
    isLoadingEvents, 
    isRefetchingEvents,

    refetchEvents,
    selectedId, 
    setSelectedId
  } = useEvent();

  const addEventModal = useDisclosure();
  const deleteEventModal = useDisclosure();

  const { setUrl } = useChangeUrl();
  
  useEffect(() => {
    if(isReady){
      setUrl();
    }
  },[isReady])

  const renderCell = useCallback(
    (event: Record<string, unknown>, columnKey: Key) => {
      const cellValue = event[columnKey as keyof typeof event];
      
      switch(columnKey) {
        case "banner":
          return (
            <Image className="w-36 aspect-video object-cover rounded-lg" src={`${cellValue}`} alt="icon" width={200} height={100}/>
          );
        case "isPublish":
          return(
            <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          )
        case "actions":
          return (
           <DropdownAction 
            onPressButtonDelete={() => {
              setSelectedId(`${event._id}`)
              deleteEventModal.onOpen()
            }}
            onPressButtondetail={() => push(`/admin/event/${event._id}`)}
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
          columns={COLUMN_LIST_EVENT} 
          data={dataEvents?.data || []}
          buttonTopContentLabel="Create Event"
          onClickButtonTopContent={addEventModal.onOpen}
          totalPages={dataEvents?.pagination.totalPages}
          emptyContent="Event is empty"
          isLoading={isLoadingEvents || isRefetchingEvents}
        />
      )}

      {/* <AddCategoryModal {...addEventModal} refetchCategory={refetchEvent} />
 
      <DeleteCategoryModal 
        {...deleteEventModal} 
        refetchCategory={refetchEvent} 
        selectedId = {selectedId}
        setSelectedId = {setSelectedId}
      /> */}

    </section>
  )
}

export default Event