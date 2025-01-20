export interface Tag {
    id: string; 
    name: string;
    post_count: number;
}

export interface Profile {
    name: string;
    id: number;
  }

export interface Tweet {
    id: number;
    title: string;
    tags: Tag[];
    profiles: Profile;
}