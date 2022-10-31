/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useEffect, useRef, useState } from "react";
import { getDataGouvCity } from "../../utils/fetch/fetchCity";
import Input from "@mui/joy/Input";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Button from "@mui/joy/Button";
import SearchIcon from "@mui/icons-material/Search";

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
const InputCitySearch = () => {
  /* ------------------------------- REACT STATE ------------------------------ */
  const [query, setQuery] = useState<string>("");
  const [cities, setCities] = useState<IResponse[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  /* -------------------------------- REACT REF ------------------------------- */
  const dropdown = useRef<HTMLUListElement>(null);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * Fetch cities when query changes
   */
  useEffect(() => {
    if (query.length < 3) return;
    const getCities = async (query: string) => {
      const data = await getDataGouvCity(query);
      const dataSorted = data
        .sort((a: IResponse, b: IResponse) => b.population - a.population)
        .splice(0, 5);
      setCities(dataSorted);
      setShowDropdown(true);
    };
    getCities(query).catch((error) => console.log(error));
  }, [query]);

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

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <Box sx={{ width: 280, position: "absolute" }}>
        <Input
          size="lg"
          placeholder="Lyon"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />
        {showDropdown && query.length > 2 && cities && !!cities.length && (
          <List
            aria-label="basic-list"
            color="neutral"
            variant="outlined"
            ref={dropdown}
            sx={{ marginTop: 1, backgroundColor: "#ffffff", borderRadius: 8 }}
          >
            {cities.map((city: IResponse) => (
              <ListItem
                key={city.nom}
                sx={{
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
      <Box>
        <Button size="lg" sx={{ ml: "285px", borderRadius: "8px" }}>
          <SearchIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default InputCitySearch;
