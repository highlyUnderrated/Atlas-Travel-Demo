export default function PersonaSwitcher({ personas, activePersona, isSwitching, onSelect }) {
  return (
    <div className="persona-switcher" aria-label="Demo audience selector">
      <div className="persona-switcher__label">
        <span className="eyebrow">Demo audience</span>
        <span className="persona-switcher__hint">Switch context</span>
      </div>
      <div className="persona-switcher__options" role="group" aria-label="Select a context">
        {personas.map((persona) => {
          const isActive = persona.id === activePersona.id;
          return (
            <button
              className={`persona-chip ${isActive ? 'persona-chip--active' : ''}`}
              key={persona.id}
              type="button"
              onClick={() => onSelect(persona)}
              disabled={isSwitching}
              aria-pressed={isActive}
            >
              <span className="persona-chip__avatar" style={{ '--avatar-accent': persona.accent }}>
                {persona.initials}
              </span>
              <span>
                <strong>{persona.label}</strong>
                <small>{persona.role}</small>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
