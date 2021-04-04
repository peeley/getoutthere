import { promises as fs } from 'fs'
import Header from '../../components/Header'
import Image from 'next/image'
import path from 'path'

export default function Product( props ) {
    return (
        <>
            <Header />
            <div class="grid grid-cols-2 mt-20 mx-16 justify-items-center">
                <div>
                    <Image src={props.imagePath} width="410" height="410"/>
                </div>
                <div class="justify-self-start w-2/3">
                    <div class="font-bold mb-10">
                        <p class="mb-7 text-3xl">{props.title}</p>
                        <p class="text-2xl">${props.price.toFixed(2)}</p>
                    </div>
                    <p class="leading-relaxed text-xl">{props.description}</p>
                    <div class="my-5 py-5 grid grid-cols-2">
                        { props.multipurchase ?
                        <div>
                            <p class="text-xl font-bold self-start mb-1">Quantity</p>
                            <input type="number" value="1" class="p-4 w-1/2 border"/>
                        </div> : null
                        }
                        <button class="text-xl font-bold bg-blue-600 text-white rounded-full mt-3 px-4 justify-self-start">
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const productsDirectory = path.join(process.cwd(), 'products');
    const productFiles = await fs.readdir(productsDirectory);

    const paths = productFiles.map( async (filename) => {
        const filepath = path.join(productsDirectory, filename);
        const fileContents = await fs.readFile(filepath);

        const productJSON = JSON.parse(fileContents);

        return {
            params: {
                sku: productJSON.sku,
            }
        };
    });

    return { paths: await Promise.all(paths), fallback: true };
}

export async function getStaticProps({ params }) {
    const productsDirectory = path.join(process.cwd(), 'products');

    const filepath = path.join(productsDirectory, `${params.sku}.json`);

    const fileContents = await fs.readFile(filepath);

    const productJSON = JSON.parse(fileContents);

    return {
        props: {
            description: productJSON.description,
            imagePath: productJSON.imagePath,
            multipurchase: productJSON.multipurchase,
            title: productJSON.title,
            price: productJSON.price,
        }
    };
}
