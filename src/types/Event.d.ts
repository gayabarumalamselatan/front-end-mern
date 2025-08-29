interface IEvent {
  name: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  isPublish: boolean;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    region: string,
    coordinate: {
      x: number,
      y: number
    }
  };
  banner: string;
}

interface IRegency{
  id: string;
  name: string
}

export type { IEvent, IRegency };