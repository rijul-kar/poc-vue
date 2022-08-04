export namespace Users {
  export interface Data {
    id: string;
    title: string;
    firstName: string;
    lastName: string;
    picture: string;
  }

  export interface ResponseUser {
    data: Data[];
    total: number;
    page: number;
    limit: number;
  }
}

export namespace UserDetail {
  export interface Location {
    street: string;
    city: string;
    state: string;
    country: string;
    timezone: string;
  }

  export interface UserDetailResponse {
    id?: string;
    title: string;
    firstName: string;
    lastName: string;
    picture: string;
    gender: string;
    email: string;
    dateOfBirth: Date | string;
    phone: string;
    location: Location;
    registerDate: Date | string;
    updatedDate: Date | string;
  }

  export const UserDetailDefault: UserDetailResponse = {
    id: '',
    title: 'RIju',
    firstName: '',
    lastName: '',
    picture: '',
    gender: '',
    email: '',
    dateOfBirth: '',
    phone: '',
    location: {
      street: '',
      city: '',
      state: '',
      country: '',
      timezone: '',
    },
    registerDate: '',
    updatedDate: '',
  };
}
