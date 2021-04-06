import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
        <>
            <Head>
                <title>Get Out There</title>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" type="image/x-icon" href="https://assets.squarespace.com/universal/default-favicon.ico"/>
            </Head>
            <div class="flex flex-row justify-between m-16 text-2xl">
                <div class="flex flex-row">
                    <h2 class="pr-7">
                        <Link href="/shop">
                        <a>Shop</a>
                        </Link>
                    </h2>
                    <h2 class="pl-7">
                        <Link href="/our-story">
                        <a>Our Story</a>
                        </Link>
                    </h2>
                </div>

                <h1 class="justify-self-center text-5xl mr-20 font-bold"><Link href="/"><a>Get Out There</a></Link></h1>

                <div class="flex flex-row">
                    <h2 class="mr-7">
                        <Link href="https://www.instagram.com/getouthere907">
                        <a>
                        <Image class="content-center" src="/insta-logo.svg" height="25" width="25"/>
                        </a>
                        </Link>
                    </h2>
                    <h1>Cart</h1>
                </div>
            </div>
        </>
    );
}
