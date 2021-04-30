import '../styles/globals.css'
import { Store } from '../lib/State'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <Header />
      <Component {...pageProps} />
    </Store>
  )
}

export default MyApp
