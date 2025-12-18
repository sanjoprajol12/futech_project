
export interface User {
    name: string;
    last_name: string;
    email: string;
    password: string;
}
export interface login {
    email: string;
    password: string;
}

export interface Register {
    name: string;
    last_name: string;
    email: string;
    password: string;
}
export interface Blog {
    id: number;
    title: string;
    author: string;
    date: string;
    snippet: string;
    image?: string;
}
export interface CreateBlog {
    title: string;
    content: string;
    image: File;  
}
export interface UpdateBlog {
    title: string;
    content: string;
    image: File;  
}
export interface DeleteBlog {
    id: number;
}
    
