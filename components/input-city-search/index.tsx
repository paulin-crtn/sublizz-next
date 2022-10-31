/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { useEffect, useRef, useState, MouseEvent } from "react";
import { useRouter } from "next/router";
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
  /* --------------------------------- ROUTER --------------------------------- */
  const router = useRouter();

  /* ------------------------------- REACT STATE ------------------------------ */
  const [query, setQuery] = useState<string>("");
  const [cities, setCities] = useState<IResponse[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  /* -------------------------------- REACT REF ------------------------------- */
  const dropdown = useRef<HTMLUListElement>(null);

  /* ------------------------------ REACT EFFECT ------------------------------ */
  /**
   * Fill search input with query (if any) when page first render
   */
  useEffect(() => {
    const { city } = router.query;
    if (city && typeof city === "string") {
      setQuery(city);
    }
  }, []);

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

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const handleClick = (city: string) => {
    city ? router.push("/leases?city=" + city) : router.push("/leases");
    setQuery(city);
    setShowDropdown(false);
  };

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Box sx={{ position: "relative", display: "flex", zIndex: 10 }}>
      <Box sx={{ position: "absolute", width: 280 }}>
        <Input
          size="lg"
          placeholder="Lyon"
          value={query}
          onKeyUp={() => {
            query.length > 2 && cities && !!cities.length
              ? setShowDropdown(true)
              : setShowDropdown(false);
          }}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
        />
        {showDropdown && (
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
                onClick={() => handleClick(city.nom)}
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
        <Button
          size="lg"
          onClick={() => handleClick(query)}
          sx={{ ml: "285px", borderRadius: "8px" }}
        >
          <SearchIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default InputCitySearch;
