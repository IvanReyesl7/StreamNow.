import React, { useState, useEffect } from "react";
import {
  Text, SafeAreaView, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Keyboard, Platform,ScrollView
} from "react-native";

import Pelicula from "./src/components/Pelicula";
import Formulario from "./src/components/Formulario";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
const App = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [mostrarForm, guardarMostrarForm] = useState(false);

  useEffect(() => {
    const obtenerPeliculasStorage = async () => {
      try {
        const peliculasStorage = await AsyncStorage.getItem("peliculas");
        if (peliculasStorage) setPeliculas(JSON.parse(peliculasStorage));
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPeliculasStorage();
  }, []);

  const eliminarPelicula = (id) => {
    const peliculasFiltrados = peliculas.filter((pelicula) => pelicula.id !== id);
    setPeliculas(peliculasFiltrados);
    guardarPeliculasStorage(JSON.stringify(peliculasFiltrados));
  };

  const mostrarFormulario = () => guardarMostrarForm(!mostrarForm);

  const cerrarTeclado = () => Keyboard.dismiss();

  const guardarPeliculasStorage = async (peliculasJSON) => {
    try {
      await AsyncStorage.setItem("peliculas", peliculasJSON);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
        <SafeAreaView>
          <View style={styles.contenedor}>
            <Text style={styles.titulo}>StreamNow</Text>
            <View>
              <TouchableHighlight
                onPress={() => mostrarFormulario()}
                style={styles.btnMostrarForm}
              >
                <View>
                  <Text style={styles.textoMostrarForm}>
                    {mostrarForm ? "Cancelar Listar Pelicula" : "Listar Nueva Pelicula"}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.contenido}>
            {mostrarForm ? (
              <>
                <Text style={styles.titulo}>Registrar Nueva Pelicula</Text>
                <Formulario
                  peliculas={peliculas}
                  setPeliculas={setPeliculas}
                  guardarMostrarForm={guardarMostrarForm}
                  guardarPeliculasStorage={guardarPeliculasStorage}
                />
              </>
            ) : (
              <>
                <Text style={styles.titulo}>
                  {peliculas.length > 0
                    ? "Administra tus peliculas"
                    : "No hay peliculas, agrege una"}
                </Text>
                <FlatList
                  style={styles.listado}
                  data={peliculas}
                  renderItem={({ item }) => (
                    
                      <Pelicula item={item} eliminarPelicula={eliminarPelicula} />
                    
                  )}
                  keyExtractor={(pelicula) => pelicula.id}
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
    backgroundColor: "#0F4C75",
  },
  titulo: {
    color: "#FFF",
    paddingTop: 20,
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
    backgroundColor: "#393E46",
    marginVertical: 10,
  },
  textoMostrarForm: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default App;
