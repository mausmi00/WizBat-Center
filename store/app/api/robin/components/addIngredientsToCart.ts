import getProduct from "@/actions/getProduct";
import getProducts from "@/actions/getProducts";

const AddIngredientsToCart = async (input: string[]) => {
    const products = await getProducts({ isFeatured: true });
    let flag = 0;
    for (let ingre of input) {
        ingre = ingre.toLowerCase().trim();
        flag = 0;
        for (let product of products) {
            if (product.name.trim().toLowerCase() === ingre) {
                globalThis.ingredientsInStore?.push(product);
                flag = 1;
            }
        }
        if (flag === 0) {
            globalThis.ingredientsNotInStore?.push(ingre);
        }
    }
    console.log("found: ", globalThis.ingredientsInStore)
    console.log("not found: ", globalThis.ingredientsNotInStore);
    return;
}

export default AddIngredientsToCart;