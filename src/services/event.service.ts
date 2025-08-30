import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IEvent } from "@/types/Event";

const eventServices = {
  getEvents: (params?: string) => instance.get(`${endpoint.EVENT}?${params}`),
  addEvent: (payload: IEvent) => instance.post(endpoint.EVENT, payload),
  searchLocationByRegency: (name: string) => instance.get(`${endpoint.REGION}-search?name=${name}`),
  deleteEvent: (id: string) => instance.delete(`${endpoint.EVENT}/${id}`),
}

export default eventServices;