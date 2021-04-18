import Header from '../components/Header.jsx'

export default function OurStory() {
    return (
        <>
          <Header/>
          <div className="w-2/3 m-auto">
            <div className="py-24 align-middle">
              <h1 className="pb-14 font-bold text-5xl">Our Mission</h1>
              <div className="text-2xl leading-relaxed">
                <p>
                Our mission at Get Out There is to give all Alaskans an opportunity
                to grow a passion for outdoor fitness through kindness and
                transparency. We want to bring more positivity and fitness into the
                world by putting a smile on each of our athletes’ faces.
                </p>
                <p className="mt-5">
                We understand that no two athletes are the same, and that’s why we
                have an array of different groups to meet every athlete’s needs.
                You’ll often see our coaches and athletes smiling together helping
                each other work towards individual and group goals.
                </p>
              </div>
            </div>

            <h1 className="font-bold text-5xl pb-14">Meet Logan</h1>
            <div className="text-2xl leading-relaxed">
              <p>
              Chances are if you’re from Fairbanks you’ve probably met our head
              coach Logan Mowry. Logan loves fitness and the outdoors and wants
              nothing more than to spread his passion to all of Alaska through
              miles and smiles.
              </p>
              <p className="mt-5">
              Logan has competed at the highest level of NCAA’s with cross country skiing as
              well as volunteered in the ski community of Fairbanks.
              </p>
            </div>
          </div>
        </>
    );
}
