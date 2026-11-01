import { ArrowIcon, PlaneIcon, SparkIcon } from '../icons';

export default function SmartDealsExperience({ persona, onDealClick }) {
  const firstName = persona.context.name.split(' ')[0];

  return (
    <section className="experience experience--smart" aria-labelledby="experience-title">
      <div className="section-heading">
        <div>
          <span className="eyebrow eyebrow--live"><SparkIcon size={14} /> Live personalized experience</span>
          <h2 id="experience-title">A better escape, picked for {firstName}.</h2>
        </div>
        <span className="smart-match"><strong>94%</strong> trip match</span>
      </div>

      <article className="smart-deal">
        <div className="smart-deal__visual" aria-hidden="true">
          <span className="smart-deal__stamp">ATLAS SELECT</span>
          <div className="smart-deal__moon" />
          <div className="smart-deal__ridge smart-deal__ridge--back" />
          <div className="smart-deal__ridge smart-deal__ridge--front" />
          <div className="smart-deal__route">
            <span>BOM</span>
            <i />
            <PlaneIcon size={20} />
            <i />
            <span>NRT</span>
          </div>
        </div>

        <div className="smart-deal__content">
          <div>
            <span className="smart-deal__kicker">7 nights · Tokyo + Hakone</span>
            <h3>City energy.<br />Mountain quiet.</h3>
            <p>
              A curated autumn route with design hotels, late-night food walks, and two slow days below Mount Fuji.
            </p>
          </div>

          <div className="smart-deal__tags" aria-label="Trip highlights">
            <span>Direct flights</span>
            <span>Small-group stays</span>
            <span>Flexible dates</span>
          </div>

          <div className="smart-deal__footer">
            <div>
              <small>Curated package from</small>
              <strong>₹1,08,400</strong>
            </div>
            <button className="primary-button" type="button" onClick={onDealClick}>
              Explore this deal <ArrowIcon />
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}
