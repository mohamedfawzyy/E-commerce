import { Product } from 'src/app/shared/interfaces/product';
export interface WishList {
    status: string;
    count:  number;
    data:   Product[];
}


