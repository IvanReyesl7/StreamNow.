import React, { useState } from "react";
import {
  Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "react-id-generator";

const Formulario = ({
    peliculas,
    setPeliculas,
    guardarMostrarForm,
    guardarPeliculasStorage,
  }) => {
    const [nombre, guardarNombre] = useState("");
    const [genero, guardarGenero] = useState("");
    const [duracion, guardarDuracion] = useState("");
    const [estreno, guardarEstreno] = useState("");
    
  
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const confirmarFecha = (date) => {
      const opciones = { year: "numeric", month: "long", day: "2-digit" };
      guardarEstreno(date.toLocaleDateString("es-SV", opciones));
      hideDatePicker();
    };
  
  
    const crearNuevoProducto = () => {
      if (
        nombre.trim() === "" ||
        genero.trim() === "" ||
        duracion.trim() === "" ||
        estreno.trim() === ""
      ) {
        mostrarAlerta();
        return;
      }
  
      const pelicula = { nombre, genero, duracion, estreno };
      pelicula.id = shortid();
  
      const peliculasNuevo = [...peliculas, pelicula];
      setPeliculas(peliculasNuevo);
  
      guardarPeliculasStorage(JSON.stringify(peliculasNuevo));
  
      guardarMostrarForm(false);
  
      guardarNombre("");
      guardarGenero("");
      guardarDuracion("");
      guardarEstreno("");
    };
  
    const mostrarAlerta = () => {
      Alert.alert("Error", "Todos los campos son obligatorios {" + nombre +"}", [{ text: "OK" }]);
    };
  
    return (
      <>
        <ScrollView style={styles.formulario} vertical>
          <View>
            <Text style={styles.label}>Nombre:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(texto) => guardarNombre(texto)}
            />
          </View>
          <View>
            <Text style={styles.label}>Genero de la pelicula:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(texto) => guardarGenero(texto)}
            />
          </View>
          <View>
            <Text style={styles.label}>Duracion(en minutos):</Text>
            <TextInput
              style={styles.input}
              onChangeText={(texto) => guardarDuracion(texto)}
              keyboardType="numeric"
            />
          </View>
          <View>
            <Text style={styles.label}>Fecha de Estreno:</Text> 
            <Text style={styles.fecha}>{estreno}</Text>
            <Button color={"#1880E9"} title="Seleccionar Fecha" onPress={showDatePicker} />
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={confirmarFecha}
              onCancel={hideDatePicker}
              local="es-sv"
              headerTextIOS="Elija la fecha"
              cancelTextIOS="Cancelar"
              confirmTextIOS="Confirmar"
            />
            
          </View>
        
          <View>
            <TouchableHighlight
              onPress={() => crearNuevoProducto()}
              style={styles.btnSubmit}
            >
              <View>
              <Text style={styles.textoSubmit}>Listar Nueva Pelicula</Text>
              </View>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </>
    );
  };
  
  const styles = StyleSheet.create({
    formulario: {
      backgroundColor: "#FFF",
      paddingHorizontal: 30,
    },
    label: {
      fontWeight: "bold",
      fontSize: 18,
      marginTop: 20,
    },
    input: {
      marginTop: 10,
      height: 40,
      borderColor: "#e1e1e1",
      borderWidth: 1,
      borderStyle: "solid",
    },
    btnSubmit: {
      padding: 10,
      backgroundColor: "#C70039",
      marginVertical: 10,
      borderRadius: 10,
    },
    textoSubmit: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
      borderRadius: 10,
      
    },
    fecha:{
      fontSize: 20,
      paddingBottom: 20,
      paddingTop: 10,
    }
  });


export default Formulario;
