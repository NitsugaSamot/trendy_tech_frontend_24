import "./filter.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterAll,
  getAllProducts,
  searchOnSwitch,
  setShowDiscountsProducts,
} from "../../redux/actions";
import Slider from "react-slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button, Grid } from "@mui/material";

const Filter = () => {
  const dispatch = useDispatch();
  const allProducts1 = useSelector((state) => state.allProducts1);
  const allProducts2 = useSelector((state) => state.allProducts2);
  const searchOn = useSelector((state) => state.searchOn); // Obtiene el estado global searchOn
  const allProductsSearch = useSelector((state) => state.allProductsSearch);
  const allProductsSearch2 = useSelector((state) => state.allProductsSearch2);
  const setDiscounts = useSelector((state) => state.setDiscounts);

  const getLowestPrice = (products) => {
    return Math.min(...products.map((product) => product.price));
  };
  const getHighestPrice = (products) => {
    return Math.max(...products.map((product) => product.price));
  };
  const MIN = getLowestPrice(allProducts2);
  const MAX = getHighestPrice(allProducts2);
  const [values, setValues] = useState([MIN, MAX]);

  useEffect(() => {
    if (searchOn) {
      /*     const min = getLowestPrice(allProductsSearch2);
      const max = getHighestPrice(allProductsSearch2);
      setValues([min, max]); */
      setSelectedType("");
      setSelectedBrand("");
    }
  }, [searchOn]);

  const [selectedType, setSelectedType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  useEffect(() => {
    setDiscounts && setSelectedBrand("");
    setDiscounts && setSelectedType("");
  }, [setDiscounts]);

  const handleType = (event) => {
    const typeFilter = allProducts1.filter(
      (product) => product.type === event.target.value
    );
    dispatch(filterAll(typeFilter));
    dispatch(setShowDiscountsProducts(false));
    dispatch(searchOnSwitch(false));
    const min = getLowestPrice(typeFilter);
    const max = getHighestPrice(typeFilter);
    setValues([min, max]);
    setSelectedType(event.target.value);
  };

  const handleBrand = (event) => {
    const brandFilter = allProducts1.filter(
      (product) => product.brand === event.target.value
    );
    dispatch(filterAll(brandFilter));
    dispatch(setShowDiscountsProducts(false));
    dispatch(searchOnSwitch(false));
    const min = getLowestPrice(brandFilter);
    const max = getHighestPrice(brandFilter);
    setValues([min, max]);
    setSelectedBrand(event.target.value);
  };

  const handleClear = () => {
    dispatch(getAllProducts());
    dispatch(setShowDiscountsProducts(false));
    dispatch(searchOnSwitch(false));
    setValues([MIN, MAX]);
    setSelectedType("");
    setSelectedBrand("");
  };

  const handleRange = (newValues) => {
    dispatch(setShowDiscountsProducts(false));
    setValues(newValues);
    let filterPrice = allProducts2.filter(
      (product) =>
        product.price >= newValues[0] && product.price <= newValues[1]
    );
    if (selectedType !== "") {
      const filterPriceType = filterPrice.filter(
        (product) => product.type === selectedType
      );
      filterPrice = filterPriceType;
    }
    if (selectedBrand !== "") {
      const filterPriceBrand = filterPrice.filter(
        (product) => product.brand === selectedBrand
      );
      filterPrice = filterPriceBrand;
    }
    if (searchOn) {
      const filterPriceSearch = filterPrice.filter((product) =>
        allProductsSearch2.find(
          (searchProduct) => searchProduct.id === product.id
        )
      );
      filterPrice = filterPriceSearch;
    }

    dispatch(filterAll(filterPrice));
  };

  // const handleDisabled = () => {
  //   return allProducts1.length ? "true" : "false";
  // };

  return (
    <Grid
      container
      sx={{
        width: "100%",
      }}
      className="FilterTech"
    >
      <Grid
        item
        xs={6}
        sm={4}
        md={12}
        lx={12}
        sx={{
          padding: "10px 8px",
        }}
      >
        <FormControl
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <InputLabel>Seleccione una categoria</InputLabel>
          {allProducts1.length ? (
            <Select
              onChange={handleType}
              defaultValue=""
              value={selectedType}
              label="Seleccione una categoria"
              color="warning"
              // disabled={allProducts1.length ? "false" : "false"}
            >
              {allProducts1.length > 0 &&
                Array.from(
                  new Set(allProducts1.map((product) => product.type))
                ).map((type, index) => {
                  return (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  );
                })}
            </Select>
          ) : (
            <Select sx={{ width: "15rem" }} variant="filled" disabled></Select>
          )}
        </FormControl>
      </Grid>
      <Grid
        item
        xs={6}
        sm={4}
        md={12}
        lx={12}
        sx={{
          padding: "5px 8px",
        }}
      >
        <FormControl
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <InputLabel>Seleccione una marca</InputLabel>
          {allProducts1.length ? (
            <Select
              onChange={handleBrand}
              defaultValue=""
              value={selectedBrand}
              label="Seleccione una marca"
              color="warning"
            >
              {allProducts1.length > 0 &&
                Array.from(
                  new Set(allProducts1.map((product) => product.brand))
                ).map((brand, index) => {
                  return (
                    <MenuItem key={index} value={brand}>
                      {brand}
                    </MenuItem>
                  );
                })}
            </Select>
          ) : (
            <Select sx={{ width: "15rem" }} variant="filled" disabled></Select>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={4} md={12} lx={12}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2px 8px",
          }}
        >
          <h3>Busqueda por precio</h3>
          <Slider
            className="slider"
            value={values}
            onChange={handleRange}
            min={MIN}
            max={MAX}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                paddingRight: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label htmlFor="minPrice">Min</label>
              <span>$ {values[0]}</span>
            </div>
            <div
              style={{
                paddingLeft: "5px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label htmlFor="maxPrice">Max</label>
              <span>$ {values[1]}</span>
            </div>
          </div>
        </div>
      </Grid>
      <Grid
        item
        xs={6}
        sm={12}
        md={12}
        lx={12}
        sx={{
          display: "flex",
          justifyContent: "center",
          maxHeight: "50px",
          alignSelf: "center",
          padding: "8px",
        }}
      >
        <Button variant="contained" onClick={handleClear}>
          Eliminar filtros
        </Button>
      </Grid>
    </Grid>
  );
};

export default Filter;
