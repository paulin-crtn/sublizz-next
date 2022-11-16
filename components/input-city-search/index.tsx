/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getDataGouvCity } from "../../utils/fetch/fetchCity";
import TextField from "@mui/joy/TextField";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";
import FormHelperText from "@mui/joy/FormHelperText";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface IResponse {
  nom: string;
  population: number;
  code: string;
  _score: number;
}

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const InputCitySearch = ({ isLarge = false }) => {
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [query, setQuery] = useState<string>("");
  const [cities, setCities] = useState<IResponse[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  /* -------------------------------- REACT REF ------------------------------- */
  const dropdown = useRef<HTMLUListElement>(null);
  const searchInput = useRef<HTMLDivElement>(null);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * Fill search input with query (if any) when page first render
   */
  useEffect(() => {
    const { city } = router.query;
    city && typeof city === "string" ? setQuery(city) : setQuery("");
    // Close dropdown and lose input focus
    setShowDropdown(false);
    searchInput.current?.getElementsByTagName("input")[0].blur();
  }, [router.query.city]);

  /**
   * Fetch cities when query changes
   */
  useEffect(() => {
    if (query.length < 2) return;
    const getCities = async (query: string) => {
      const data = await getDataGouvCity(query);
      const dataSorted = data
        .sort((a: IResponse, b: IResponse) => b.population - a.population)
        .splice(0, 5);
      setCities(dataSorted);
    };
    getCities(query).catch((error) => console.log(error));
  }, [query]);

  /**
   * Call handleSearch when user click on "Enter" key
   */
  useEffect(() => {
    if (query.length < 2) return;
    function handleEnterKey(e: KeyboardEvent) {
      if (e.key === "Enter") {
        handleSearch(query);
      }
    }
    window.addEventListener("keydown", handleEnterKey);
    // Clean up
    return () => window.removeEventListener("keydown", handleEnterKey);
  }, [query, showDropdown]);

  /**
   * Close dropdown when user click outside the list
   */
  useEffect(() => {
    // Only add the event listener when the dropdown is opened
    if (!showDropdown) return;
    function handleClick(event: any) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    window.addEventListener("click", handleClick);
    // Clean up
    return () => window.removeEventListener("click", handleClick);
  }, [showDropdown]);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const handleSearch = (city: string) => {
    const cityTrimmed = city.trim();
    cityTrimmed
      ? router.push("/leases?city=" + cityTrimmed)
      : router.push("/leases");
    setQuery(cityTrimmed);
    setShowDropdown(false);
    searchInput.current?.getElementsByTagName("input")[0].blur();
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box sx={{ display: "flex", zIndex: 10 }}>
      <Box sx={{ position: "relative", width: "360px" }}>
        <TextField
          size={isLarge ? "lg" : "md"}
          placeholder="Rechercher par ville"
          ref={searchInput}
          value={query}
          onKeyUp={() => {
            query.length > 2 && cities && !!cities.length
              ? setShowDropdown(true)
              : setShowDropdown(false);
          }}
          onChange={(e) => setQuery(e.target.value.trim())}
          endDecorator={
            <SearchIcon
              onClick={() => handleSearch(query)}
              sx={{ cursor: "pointer" }}
            />
          }
        />
        {showDropdown && (
          <List
            aria-label="basic-list"
            color="neutral"
            variant="outlined"
            ref={dropdown}
            sx={{
              position: "absolute",
              width: "360px",
              marginTop: 1,
              backgroundColor: "#ffffff",
              borderRadius: 8,
            }}
          >
            {cities.map((city: IResponse) => (
              <ListItem
                key={city.nom}
                onClick={() => handleSearch(city.nom)}
                sx={{
                  width: "100%",
                  textAlign: "left",
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f0f0f0" },
                }}
              >
                {city.nom}
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Box>
  );
};

export default InputCitySearch;
