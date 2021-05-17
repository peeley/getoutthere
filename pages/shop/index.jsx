import { promises as fs } from 'fs'
import Image from 'next/image'
import Link from 'next/link'
import path from 'path'

export default function ShopIndex({ products }) {
    const productList = products.map(product =>
        <Link href={`/shop/${product.sku}`} key={product.sku}>
            <a>
                <Image src={product.imagePath} width="410" height="410" />
                <div className="text-center mt-3 md:mt-7 pb-3 md:pb-7 text-lg md:text-2xl">
                    <p className="font-bold"> {product.title}</p>
                    <p className="text-center"> ${product.price.toFixed(2)}</p>
                </div>
            </a>
        </Link>
    );

    return (
        <>
            <div className="mb-16 mt-20 mx-16">
                <h1 className="font-bold text-center text-2xl md:text-6xl md:mb-16 md:mt-20 md:mx-16">Shop</h1>
                <hr />
                <ul className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-3">
                    {productList}
                </ul>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const productsDirectory = path.join(process.cwd(), 'products');
    const productFiles = await fs.readdir(productsDirectory);

    const products = productFiles.map(async (filename) => {
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
