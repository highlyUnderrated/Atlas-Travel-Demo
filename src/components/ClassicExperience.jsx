import { ArrowIcon } from '../icons';

const destinations = [
  { city: 'Kyoto', country: 'Japan', tone: 'sakura', detail: 'Temples & tea houses', price: '₹62,400' },
  { city: 'Bali', country: 'Indonesia', tone: 'lagoon', detail: 'Cliffs & quiet coves', price: '₹48,900' },
  { city: 'Queenstown', country: 'New Zealand', tone: 'alpine', detail: 'Lakes & alpine trails', price: '₹91,200' },
];

export default function ClassicExperience() {
  return (
    <section className="experience experience--classic" aria-labelledby="experience-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow eyebrow--warm">Popular this season</span>
          <h2 id="experience-title">Find a place worth remembering.</h2>
        </div>
        <button className="text-button" type="button">
          Explore all destinations <ArrowIcon />
        </button>
      </div>

      <div className="destination-grid">
        {destinations.map((destination, index) => (
          <article className={`destination-card destination-card--${destination.tone}`} key={destination.city}>
            <div className="destination-card__art" aria-hidden="true">
              <span className="art-orbit art-orbit--one" />
              <span className="art-orbit art-orbit--two" />
              <span className="art-sun" />
              <span className="art-horizon" />
              <span className="destination-card__number">0{index + 1}</span>
            </div>
            <div className="destination-card__body">
              <div>
                <small>{destination.country}</small>
                <h3>{destination.city}</h3>
                <p>{destination.detail}</p>
              </div>
              <div className="destination-card__footer">
                <span>from {destination.price}</span>
                <button type="button" aria-label={`Explore ${destination.city}`}><ArrowIcon /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
