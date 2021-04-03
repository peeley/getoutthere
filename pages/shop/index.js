import { promises as fs } from 'fs'
import Image from 'next/image'
import path from 'path'

import Header from '../../components/Header.jsx'

export default function ShopIndex({ products }){
    const productList = products.map( product =>
        <div key={product.sku}>
            <Image src={product.imagePath} width="410" height="410"/>
            <p> {product.title}  - ${product.price} </p>
        </div>
    );

    return(
        <>
            <Header/>
            <div class="mb-16 mt-20 mx-16">
                <h1 class="font-bold text-center text-6xl mb-16 mt-20 mx-16">Shop</h1>
                <hr/>
                <ul class="mt-16 grid grid-cols-3 gap-5">
                    { productList }
                </ul>
            </div>
        </>
    );
}

export async function getStaticProps(){
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
