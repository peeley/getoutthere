import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react';
import { Context } from '../lib/State'

export default function Header() {

    const [cart, ] = useContext(Context);

    let totalItems = 0;
    const getTotalCartItems = cart.forEach((item) => {
        totalItems += item.quantity;
    });

    return (
        <>
            <Head>
                <title>Get Out There</title>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" type="image/x-icon" href="https://assets.squarespace.com/universal/default-favicon.ico"/>
            </Head>
            <div className="flex flex-row justify-between m-16 text-2xl">
                <div className="flex flex-row">
                    <h2 className="pr-7">
                        <Link href="/shop">
                        <a>Shop</a>
                        </Link>
                    </h2>
                    <h2 className="pl-7">
                        <Link href="/our-story">
                        <a>Our Story</a>
                        </Link>
                    </h2>
                </div>

                <h1 className="justify-self-center text-5xl mr-20 font-bold"><Link href="/"><a>Get Out There</a></Link></h1>

                <div className="flex flex-row">
                    <div className="mr-7">
                        <Link href="https://www.instagram.com/getouthere907">
                            <a>
                                <Image className="content-center" src="/insta-logo.svg" height="25" width="25"/>
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="/cart">
                            <a>
                                <Image src="/cart-icon.svg" height="30" width="30"/>
                            </a>
                        </Link>
                        <span className="align-text-top text-base mt-5">{ totalItems > 0 ? totalItems : null }</span>
                    </div>
                </div>
            </div>
        </>
    );
}
