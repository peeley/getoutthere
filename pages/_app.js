import '../styles/globals.css'
import { Store } from '../lib/State'

function MyApp({ Component, pageProps }) {
  return (
    <Store>
      <Component {...pageProps} />
    </Store>
  )
}

export default MyApp
