import Head from 'next/head';
import Link from 'next/link'

export default function Header() {
    return (
        <>
            <Head>
                <title>Get Out There</title>
                <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" type="image/x-icon" href="https://assets.squarespace.com/universal/default-favicon.ico"/>
            </Head>
            <h2>
                <Link href="/shop">
                <a>Shop</a>
                </Link>
            </h2>
            <h2>
                <Link href="/our-story">
                <a>Our Story</a>
                </Link>
            </h2>

            <h1><Link href="/"><a>Get Out There</a></Link></h1>

            <h2>
                <Link href="https://www.instagram.com/getouthere907">
                <a>Insta</a>
                </Link>
            </h2>
            <h1>Cart</h1>
        </>
    );
}
