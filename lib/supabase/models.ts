export interface Bucket {
    created_at: string;
    type: string;
}

export interface Category {
    id: number;
    created_at: string;
    user_id: string;
    name: string;
    description: string;
    bucket: string;
}

export interface Transaction {
    id: number;
    user_id: string;
    category_id: number;
    created_at: string;
    date: string;
    amount: number;
    edited_at?: string;
    comment?: string;
    name: string;
}