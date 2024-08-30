import { KOL } from "@/lib/types/idlTypes";
import React, { useState, useEffect, useRef } from "react";
import TrapezoidInput from "./trapezoidInput";
import Image from "next/image";
import { toast } from "sonner";
import { useGameSession } from "@/hooks/useGameSession";

interface KOLSearchProps {
  kols: KOL[];
  onSelect: (kol: KOL) => void;
}

const KOLSearch: React.FC<KOLSearchProps> = ({ kols, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<KOL[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { makeGuess } = useGameSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredKOLs = kols.filter((kol) =>
        kol.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredKOLs);
      setIsDropdownOpen(true);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm, kols]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectKOL = async (kol: KOL) => {
    setSearchTerm("");
    setIsDropdownOpen(false);
    onSelect(kol);

    if (1) {
      try {
        await makeGuess(1, kol);
        toast.success("Guess made successfully");
      } catch (error) {
        toast.error("Error making guess");
      }
    } else {
      console.error("No game type selected");
    }
  };

  return (
    <div ref={searchRef} className="relative ">
      <TrapezoidInput
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search KOLs..."
        className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isDropdownOpen && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-[#111411] shadow-lg max-h-60 overflow-auto no-scrollbar">
          {suggestions.map((kol) => (
            <ListItem kol={kol} key={kol.id} handleSelect={handleSelectKOL} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default KOLSearch;

function ListItem({
  kol,
  handleSelect,
}: {
  kol: KOL;
  handleSelect: (kol: KOL) => void;
}) {
  return (
    <li
      onClick={() => handleSelect(kol)}
      className="hover:bg-[#2d3537] py-4 cursor-pointer flex items-center px-4"
    >
      <div className="w-12 h-12 relative mr-3 flex-shrink-0 border border-[#2FFF2B80] rounded-full overflow-hidden">
        <Image
          src={kol.pfp || "/user-icon.svg"}
          unoptimized
          alt="user"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center gap-2">
        <div className="text-sm text-gray-400">
          {kol.name.trim().split(" ")[0]}
        </div>
        <div className="font-semibold text-gray-500">
          (@{kol.name.trim().split(" ")[1] || kol.id})
        </div>
      </div>
    </li>
  );
}
