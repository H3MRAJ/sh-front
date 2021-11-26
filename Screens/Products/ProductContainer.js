import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { Container, Header, Icon, Item, Input, Text } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProduct";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";

// const data = require("../../assets/data/products.json");
// const productCategories = require("../../assets/data/categories.json");

var { height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [productCtg, setProductCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);
  const [loading, setLoading] = useState(true);



  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      //setCategories(productCategories);
      setActive(-1);

      //Products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data);
          setProductCtg(res.data);
          setProductsFiltered(res.data);
          setInitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error + "prod");
        });

      //Category
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log(baseURL);
          console.log(error + "category error");
        });
        return () => {
          setProducts([]);
          setProductsFiltered([]);
          setFocus();
          setCategories([]);
          setActive();
          setInitialState();
        };
    }, [])
  );

  

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
            products.filter((i) => i.category._id === ctg),
            setActive(true)
          ),
        ];
  };

  return (
    <>
    {loading == false ? (

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
        <SearchedProduct
          navigation={props.navigation}
          productsFiltered={productsFiltered}
        />
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
                  return (
                    <ProductList
                      navigation={props.navigation}
                      key={item._id}
                      // key={item.$oid}
                      item={item}
                    />
                  );
                })}
              </View>
            ) : (
              <View style={[styles.center, { height: height / 2 }]}>
                <Text>No Products Found</Text>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </Container>
    ):(
      // Loading
      <Container style={[styles.center,{backgroundColor:"#f2f2f2"}]}>
          <ActivityIndicator size="large" color="red" />
      </Container>
    )}
    </>
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
