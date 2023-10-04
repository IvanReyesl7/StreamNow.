import React, { useState, useEffect } from "react";
import {
  Text, SafeAreaView, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform,
} from "react-native";

import Producto from "./src/components/Producto";
import Formulario from "./src/components/Formulario";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
const App = () => {
  const [productos, setProductos] = useState([]);
  const [mostrarForm, guardarMostrarForm] = useState(false);

  useEffect(() => {
    const obtenerProductosStorage = async () => {
      try {
        const productosStorage = await AsyncStorage.getItem("productos");
        if (productosStorage) setProductos(JSON.parse(productosStorage));
      } catch (error) {
        console.log(error);
      }
    };
    obtenerProductosStorage();
  }, []);

  const eliminarProducto = (id) => {
    const productosFiltrados = productos.filter((producto) => producto.id !== id);
    setProductos(productosFiltrados);
    guardarProductosStorage(JSON.stringify(productosFiltrados));
  };

  const mostrarFormulario = () => guardarMostrarForm(!mostrarForm);

  const cerrarTeclado = () => Keyboard.dismiss();

  const guardarProductosStorage = async (productosJSON) => {
    try {
      await AsyncStorage.setItem("productos", productosJSON);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
        <SafeAreaView>
          <View style={styles.contenedor}>
            <Text style={styles.titulo}>Administrador de Productos</Text>
            <View>
              <TouchableHighlight
                onPress={() => mostrarFormulario()}
                style={styles.btnMostrarForm}
              >
                <View>
                  <Text style={styles.textoMostrarForm}>
                    {mostrarForm ? "Cancelar Crear Producto" : "Crear Nuevo Producto"}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.contenido}>
            {mostrarForm ? (
              <>
                <Text style={styles.titulo}>Crear Nuevo Producto</Text>
                <Formulario
                  productos={productos}
                  setProductos={setProductos}
                  guardarMostrarForm={guardarMostrarForm}
                  guardarProductosStorage={guardarProductosStorage}
                />
              </>
            ) : (
              <>
                <Text style={styles.titulo}>
                  {productos.length > 0
                    ? "Administra tus productos"
                    : "No hay productos, agrege uno"}
                </Text>
                <FlatList
                  style={styles.listado}
                  data={productos}
                  renderItem={({ item }) => (
                    <Producto item={item} eliminarProducto={eliminarProducto} />
                  )}
                  keyExtractor={(producto) => producto.id}
                />
              </>
            )}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#C70039",
  },
  titulo: {
    color: "#FFF",
    marginTop: Platform.OS === "ios" ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  contenido: {
    marginHorizontal: "2.5%",
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: "#C70039",
    marginVertical: 10,
  },
  textoMostrarForm: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default App;
