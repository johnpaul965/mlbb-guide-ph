import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";

export type HeroOption = { id: string; name: string; tier: string; label: string };

interface Props {
  value: string;
  onChange: (v: string) => void;
  options: HeroOption[];
  placeholder: string;
}

export default function SearchableHeroSelect({ value, onChange, options, placeholder }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find(o => o.name === value);

  const filtered = query.trim()
    ? options.filter(o => o.name.toLowerCase().includes(query.toLowerCase()))
    : options;

  // +1 for the clear/placeholder item at index 0
  const totalItems = filtered.length + 1;

  useEffect(() => {
    if (open) {
      setQuery("");
      setHighlightedIndex(-1);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function scrollItemIntoView(index: number) {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("li");
    if (items[index]) {
      items[index].scrollIntoView({ block: "nearest" });
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = highlightedIndex < totalItems - 1 ? highlightedIndex + 1 : 0;
      setHighlightedIndex(next);
      scrollItemIntoView(next);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = highlightedIndex > 0 ? highlightedIndex - 1 : totalItems - 1;
      setHighlightedIndex(prev);
      scrollItemIntoView(prev);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex === 0) {
        onChange("");
        setOpen(false);
      } else if (highlightedIndex > 0) {
        const hero = filtered[highlightedIndex - 1];
        if (hero) { onChange(hero.name); setOpen(false); }
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  const tierColors: Record<string, string> = {
    "S+": "text-mlbb-gold font-black",
    "S":  "text-mlbb-accent font-black",
    "A":  "text-mlbb-cyan font-bold",
    "B":  "text-slate-500 font-bold",
    "C":  "text-slate-400 font-bold",
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between pl-2 pr-2 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-mlbb-accent/30 focus:border-mlbb-accent transition-all cursor-pointer"
      >
        <span className={selected ? "text-slate-800" : "text-slate-400"}>
          {selected ? (
            <span>
              <span className={`mr-1 text-[10px] ${tierColors[selected.tier] ?? ""}`}>[{selected.tier}]</span>
              {selected.name}
            </span>
          ) : (
            `— ${placeholder} —`
          )}
        </span>
        <span className="flex items-center gap-0.5 shrink-0 ml-1">
          {selected && (
            <span
              role="button"
              tabIndex={0}
              onMouseDown={e => { e.stopPropagation(); onChange(""); }}
              onKeyDown={e => e.key === "Enter" && onChange("")}
              className="p-0.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3 h-3" />
            </span>
          )}
          <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>

      {open && (
        <div className="absolute z-50 mt-1 w-full min-w-[180px] bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
          <div className="p-2 border-b border-slate-100">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200 focus-within:border-mlbb-accent focus-within:ring-2 focus-within:ring-mlbb-accent/20 transition-all">
              <Search className="w-3 h-3 text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search hero..."
                className="flex-1 bg-transparent text-xs text-slate-800 placeholder-slate-400 outline-none font-medium"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-slate-400 hover:text-slate-600">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
          <ul ref={listRef} className="max-h-52 overflow-y-auto">
            <li>
              <button
                type="button"
                onClick={() => { onChange(""); setOpen(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs text-slate-400 font-bold transition-colors ${
                  highlightedIndex === 0 ? "bg-slate-100" : "hover:bg-slate-50"
                }`}
              >
                — {placeholder} —
              </button>
            </li>
            {filtered.length === 0 && (
              <li className="px-3 py-3 text-xs text-slate-400 text-center">No heroes found</li>
            )}
            {filtered.map((o, i) => (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => { onChange(o.name); setOpen(false); }}
                  onMouseEnter={() => setHighlightedIndex(i + 1)}
                  className={`w-full text-left px-3 py-1.5 text-xs font-bold flex items-center gap-2 transition-colors ${
                    highlightedIndex === i + 1
                      ? "bg-mlbb-accent/10 text-mlbb-accent"
                      : value === o.name
                      ? "bg-mlbb-accent/10 text-mlbb-accent"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className={`text-[10px] w-6 shrink-0 ${tierColors[o.tier] ?? "text-slate-400"}`}>[{o.tier}]</span>
                  <span>{o.name}</span>
                  {o.label && o.label !== o.name && (
                    <span className="text-[10px] text-slate-400 font-normal ml-auto truncate">{o.label}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
