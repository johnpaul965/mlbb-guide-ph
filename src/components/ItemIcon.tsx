const ITEM_COLORS: Record<string, string> = {
  "Blade of Despair":        "bg-orange-500",
  "War Axe":                 "bg-orange-400",
  "Endless Battle":          "bg-orange-400",
  "Berserker's Fury":        "bg-orange-500",
  "Scarlet Phantom":         "bg-orange-300",
  "Malefic Gun":             "bg-orange-400",
  "Blade of the Heptaseas":  "bg-orange-400",
  "Rose Gold Meteor":        "bg-pink-400",
  "Haas's Claws":            "bg-red-400",
  "Bloodlust Axe":           "bg-red-500",
  "Holy Crystal":            "bg-blue-500",
  "Lightning Truncheon":     "bg-cyan-400",
  "Concentrated Energy":     "bg-blue-400",
  "Genius Wand":             "bg-blue-300",
  "Glowing Wand":            "bg-amber-400",
  "Clock of Destiny":        "bg-blue-400",
  "Enchanted Talisman":      "bg-blue-300",
  "Blood Wings":             "bg-red-600",
  "Calamity Reaper":         "bg-purple-500",
  "Fleeting Time":           "bg-purple-300",
  "Immortality":             "bg-green-500",
  "Athena's Shield":         "bg-green-400",
  "Radiant Armor":           "bg-green-400",
  "Antique Cuirass":         "bg-green-500",
  "Dominance Ice":           "bg-cyan-500",
  "Thunder Belt":            "bg-yellow-500",
  "Blade Armor":             "bg-green-600",
  "Guardian Helmet":         "bg-green-400",
  "Oracle":                  "bg-violet-600",
  "Wind of Nature":          "bg-emerald-400",
  "Queen's Wings":           "bg-purple-400",
  "Winter Crown":            "bg-sky-400",
  "Flask of the Oasis":      "bg-teal-400",
  "Malefic Roar":            "bg-red-500",
  "Demon Hunter Sword":      "bg-red-600",
  "Divine Glaive":           "bg-blue-600",
  "Sea Halberd":             "bg-red-400",
  "Necklace of Durance":     "bg-blue-400",
  "Golden Staff":            "bg-yellow-400",
  "Corrosion Scythe":        "bg-green-500",
  "Windtalker":              "bg-sky-300",
  "Feather of Heaven":       "bg-yellow-300",
  "Wishing Lantern":         "bg-amber-500",
  "Starlium Scythe":         "bg-purple-500",
  "Hunter Strike":           "bg-orange-500",
  "Sky Piercer":             "bg-blue-500",
  "Ice Queen Wand":          "bg-cyan-400",
  "Tough Boots":             "bg-slate-500",
  "Swift Boots":             "bg-slate-400",
  "Magic Boots":             "bg-slate-400",
  "Magic Shoes":             "bg-slate-400",
  "Arcane Boots":            "bg-purple-400",
  "Warrior Boots":           "bg-slate-500",
  "Demon Boots":             "bg-purple-500",
  "Courage Mask":            "bg-amber-600",
  "Cursed Helmet":           "bg-slate-600",
  "Brute Force Breastplate": "bg-slate-500",
};

const ITEM_FILE: Record<string, string> = {
  "Antique Cuirass":         "antique-cuirass",
  "Arcane Boots":            "arcane-boots",
  "Athena's Shield":         "athenas-shield",
  "Berserker's Fury":        "berserkers-fury",
  "Blade Armor":             "blade-armor",
  "Blade of Despair":        "blade-of-despair",
  "Blade of the Heptaseas":  "blade-of-the-heptaseas",
  "Blood Wings":             "blood-wings",
  "Bloodlust Axe":           "bloodlust-axe",
  "Brute Force Breastplate": "brute-force-breastplate",
  "Calamity Reaper":         "calamity-reaper",
  "Clock of Destiny":        "clock-of-destiny",
  "Concentrated Energy":     "concentrated-energy",
  "Corrosion Scythe":        "corrosion-scythe",
  "Courage Mask":            "courage-mask",
  "Cursed Helmet":           "cursed-helmet",
  "Demon Boots":             "demon-boots",
  "Demon Hunter Sword":      "demon-hunter-sword",
  "Divine Glaive":           "divine-glaive",
  "Dominance Ice":           "dominance-ice",
  "Enchanted Talisman":      "enchanted-talisman",
  "Endless Battle":          "endless-battle",
  "Feather of Heaven":       "feather-of-heaven",
  "Flask of the Oasis":      "flask-of-the-oasis",
  "Fleeting Time":           "fleeting-time",
  "Genius Wand":             "genius-wand",
  "Glowing Wand":            "glowing-wand",
  "Golden Staff":            "golden-staff",
  "Guardian Helmet":         "guardian-helmet",
  "Haas's Claws":            "haas-claws",
  "Holy Crystal":            "holy-crystal",
  "Hunter Strike":           "hunter-strike",
  "Ice Queen Wand":          "ice-queen-wand",
  "Immortality":             "immortality",
  "Lightning Truncheon":     "lightning-truncheon",
  "Magic Boots":             "magic-boots",
  "Magic Shoes":             "magic-shoes",
  "Malefic Gun":             "malefic-gun",
  "Malefic Roar":            "malefic-roar",
  "Necklace of Durance":     "necklace-of-durance",
  "Oracle":                  "oracle",
  "Queen's Wings":           "queens-wings",
  "Radiant Armor":           "radiant-armor",
  "Rose Gold Meteor":        "rose-gold-meteor",
  "Scarlet Phantom":         "scarlet-phantom",
  "Sea Halberd":             "sea-halberd",
  "Sky Piercer":             "sky-piercer",
  "Swift Boots":             "swift-boots",
  "Thunder Belt":            "thunder-belt",
  "Tough Boots":             "tough-boots",
  "War Axe":                 "war-axe",
  "Warrior Boots":           "warrior-boots",
  "Wind of Nature":          "wind-of-nature",
  "Windtalker":              "windtalker",
  "Winter Crown":            "winter-crown",
  "Wishing Lantern":         "wishing-lantern",
};

function getAbbrev(name: string): string {
  const words = name.replace(/['']/g, "").split(/[\s-]+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

interface ItemIconProps {
  name: string;
  size?: "sm" | "md" | "lg";
}

export default function ItemIcon({ name, size = "md" }: ItemIconProps) {
  const color = ITEM_COLORS[name] ?? "bg-slate-500";
  const abbrev = getAbbrev(name);
  const file = ITEM_FILE[name];

  const sizeClass = {
    sm: "w-8 h-8 text-[10px] rounded-lg",
    md: "w-10 h-10 text-xs rounded-xl",
    lg: "w-12 h-12 text-sm rounded-xl",
  }[size];

  if (file) {
    return (
      <div
        title={name}
        className={`${sizeClass} overflow-hidden shrink-0 ${color}`}
      >
        <img
          src={`/items/${file}.png`}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.classList.add("flex", "items-center", "justify-center");
              parent.innerHTML = `<span class="font-black text-white text-[10px]">${abbrev}</span>`;
            }
          }}
        />
      </div>
    );
  }

  return (
    <div
      title={name}
      className={`${color} ${sizeClass} flex items-center justify-center font-black font-display text-white shadow-sm shrink-0`}
    >
      {abbrev}
    </div>
  );
}
