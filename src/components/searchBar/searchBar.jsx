import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react"; // Agrega useEffect a tus imports
import { useDispatch, useSelector } from "react-redux";
import { searchByName, searchOnSwitch, setShowDiscountsProducts } from "../../redux/actions";
import "./searchBar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Autocomplete, Button, Grid, Stack, TextField } from "@mui/material";

const SearchBar = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const dispatch = useDispatch();
  const allProducts2 = useSelector((state) => state.allProducts2);
  const searchOn = useSelector((state) => state.searchOn);

  const handleInput = (event) => {
    console.log(event.target.value);
    setProduct(event.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // setProduct("");
    location.pathname !== "/home" ? navigate("/home") : null;
    dispatch(searchByName(product));

    // Dispatch la acción para cambiar el estado de searchOn a true
    dispatch(setShowDiscountsProducts(false))
    dispatch(searchOnSwitch(true));

  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearch(event);
    }
  };

  // Utiliza useEffect para observar cambios en el valor de searchOn
  useEffect(() => {
    if (!searchOn) {
      setProduct(""); // Limpia el input si searchOn es false
    }
  }, [searchOn]); // Asegúrate de agregar searchOn como dependencia del useEffect

  return (
    <Grid
      item
      sx={{
        display: "flex",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          backgroundColor: "#ebebeb",
          borderRadius: "6px",
          border: "3px solid #e76000",
        }}
      >
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          options={allProducts2.map((option) => option.name)}
          value={product} // <-- Asegúrate de establecer el value para que el input refleje el valor actual de product
          onKeyDown={handleKeyDown}
          onInputChange={(event, newValue) => {
            setProduct(newValue);

            if (!newValue) {
              dispatch(searchOnSwitch(false));
              console.log("cambie a false");
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Busca un producto"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Stack>
      <Button type="search" onClick={handleSearch}>
        <SearchIcon sx={{ fontSize: 40 }} />
      </Button>
    </Grid>
  );
};

export default SearchBar;
