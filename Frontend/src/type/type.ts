export interface Blog {
    title: string;
    content: string;
    image: File;  
}
export interface User {
    name: string;
    last_name: string;
    email: string;
    password: string;
}
export interface Login {
    email: string;
    password: string;
}

export interface Register {
    name: string;
    last_name: string;
    email: string;
    password: string;
}
