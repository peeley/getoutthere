import Header from '../components/Header.jsx'

export default function Home() {
  return (
    <>
      <Header/>
      <div class="my-12 mx-auto text-center w-2/5">
        <p class="pt-10 text-3xl leading-relaxed">
          <b>
          Giving all Alaskans an opportunity to grow a passion for
          outdoor fitness through kindness and transparency.
          </b>
        </p>
        <p class="flex flex-row justify-between mt-7 text-xl">
          <span>Ski</span>
          <span>Run</span>
          <span>Bike</span>
          <span>Swim</span>
          <span>Paddle</span>
          <span>Smile</span>
        </p>
      </div>
    </>
  )
}
