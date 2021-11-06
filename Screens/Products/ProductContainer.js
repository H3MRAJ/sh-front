import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { Container, Header, Icon, Item, Input, Text } from "native-base";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProduct";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

const data = require("../../assets/data/products.json");
const productCategories = require("../../assets/data/categories.json");

var { height } = Dimensions.get("window");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productCtg, setProductCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setCategories(productCategories);
    setProductCtg(data);
    setActive(-1);
    setInitialState(data);

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCategories([]);
      setActive();
      setInitialState();
    };
  }, []);

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  //Categories
  const changeCtg = (ctg) => {
    ctg === "all"
      ? [setProductCtg(initialState), setActive(true)]
      : [
          setProductCtg(
            products.filter((i) => i.category.$oid === ctg),
            setActive(true)
          ),
        ];
  };

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
          />
          {focus == true ? <Icon onPress={onBlur} name="ios-close" /> : null}
        </Item>
      </Header>
      {focus == true ? (
        <SearchedProduct productsFiltered={productsFiltered} />
      ) : (
        <ScrollView>
          <View>
            <View>
              <Banner />
            </View>
            <View>
              <CategoryFilter
                categories={categories}
                categoryFilter={changeCtg}
                productCtg={productCtg}
                active={active}
                setActive={setActive}
              />
            </View>
            {productCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {productCtg.map((item) => {
                  return (<ProductList key={item.$oid} item={item} />)
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: height/2 }]}>
                <Text>No Products Found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Container>
    
  );
};
const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    height: height,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ProductContainer;