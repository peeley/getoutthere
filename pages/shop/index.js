import { promises as fs } from 'fs'
import path from 'path'

import Header from '../../components/Header.jsx'

export default function ShopIndex({ products }){
    const productList = products.map( product =>
        <li key={product.sku}> { product.title }  - ${ product.price } </li>
    );

    console.log("product list", products);

    return(
        <>
        <Header/>
        <ul>
            { productList }
        </ul>
        </>
    );
}

export async function getStaticProps(context){
    const productsDirectory = path.join(process.cwd(), 'products');
    const productFiles = await fs.readdir(productsDirectory);

    const products = productFiles.map( async (filename) => {
        const filepath = path.join(productsDirectory, filename);
        const fileContents = await fs.readFile(filepath);

        const productJSON = JSON.parse(fileContents);

        return productJSON;
    });

    return {
        props: {
            products: await Promise.all(products)
        }
    };
}
