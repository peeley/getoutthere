import { promises as fs } from 'fs'
import Header from '../../components/Header'
import Image from 'next/image'
import path from 'path'
import { useState, useContext } from 'react'
import { Context } from '../../lib/State'

export default function Product( props ) {
    const [quantity, setQuantity] = useState(1);
    const [, dispatch] = useContext(Context);

    const addItem = (product) => {
        dispatch({
            type: 'ADD_ITEM',
            product
        })
    }

    return (
        <>
            <Header />
            <div className="grid grid-cols-2 mt-20 mx-16 justify-items-center">
                <div>
                    <Image src={props.imagePath} width="410" height="410"/>
                </div>
                <div className="justify-self-start w-2/3">
                    <div className="font-bold mb-10">
                        <p className="mb-7 text-3xl">{props.title}</p>
                        <p className="text-2xl">${props.price.toFixed(2)}</p>
                    </div>
                    <p className="leading-relaxed text-xl">{props.description}</p>
                    <div className="my-5 py-5 grid grid-cols-2">
                        <div>
                            <p className="text-xl font-bold self-start mb-1">Quantity</p>
                          <input type="number" value={quantity} min="1" onChange={ e => setQuantity(parseInt(e.target.value)) } className="p-4 w-1/2 border"/>
                        </div>
                        <button className="text-xl font-bold bg-blue-600 text-white rounded-full mt-3 px-4 justify-self-start" onClick={() => addItem({...props, ...{ quantity }})}>
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

    return { paths: await Promise.all(paths), fallback: false };
}

export async function getStaticProps({ params }) {
    const productsDirectory = path.join(process.cwd(), 'products');

    const filepath = path.join(productsDirectory, `${params.sku}.json`);

    const fileContents = await fs.readFile(filepath);

    const productJSON = JSON.parse(fileContents);

    return {
        props: {
            sku: productJSON.sku,
            description: productJSON.description,
            imagePath: productJSON.imagePath,
            title: productJSON.title,
            price: productJSON.price,
        }
    };
}
