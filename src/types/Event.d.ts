import { DateValue } from "@nextui-org/react";

interface IEvent {
  name: string;
  slug: string;
  category: string;
  isFeature: boolean | string;
  isPublished: boolean | string;
  isOnline: boolean | string;
  description: string;
  startDate: string;
  endDate: string;
  location?: {
    region: string,
    coordinates: number[];
  };
  banner: string | FileList;
}

interface IEventForm extends IEvent{
  region: string;
  startDate: DateValue;
  endDate: DateValue;
  latitude: string;
  longitude: string;
}

interface IRegency{
  id: string;
  name: string
}

export type { IEvent, IRegency, IEventForm };