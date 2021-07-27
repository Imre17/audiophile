export class ShoppingCartItem {
    key: string;
    title: string;
    imgUrl: string;
    description: string;
    price: number;
    quantity: number

    constructor( init?: Partial<ShoppingCartItem> ) {
        Object.assign(this, init)
    }

    get totalPriceItem() {
        return this.price * this.quantity;
    }
}