import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from "react-id-generator";

const Formulario = ({
    productos,
    setProductos,
    guardarMostrarForm,
    guardarProductosStorage,
  }) => {
    const [pieza, guardarPieza] = useState("");
    const [marca, guardarMarca] = useState("");
    const [numeroSerie, guardarNumeroSerie] = useState("");
    const [fecha, guardarFecha] = useState("");
    
  
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const confirmarFecha = (date) => {
      const opciones = { year: "numeric", month: "long", day: "2-digit" };
      guardarFecha(date.toLocaleDateString("es-SV", opciones));
      hideDatePicker();
    };
  
    const showTimePicker = () => {
      setTimePickerVisibility(true);
    };
  
    const hideTimePicker = () => {
      setTimePickerVisibility(false);
    };
  
  
    const crearNuevoProducto = () => {
      if (
        pieza.trim() === "" ||
        marca.trim() === "" ||
        numeroSerie.trim() === "" ||
        fecha.trim() === ""
      ) {
        mostrarAlerta();
        return;
      }
  
      const producto = { pieza, marca, numeroSerie, fecha };
      producto.id = shortid();
  
      const productosNuevo = [...productos, producto];
      setProductos(productosNuevo);
  
      guardarProductosStorage(JSON.stringify(productosNuevo));
  
      guardarMostrarForm(false);
  
      guardarPieza("");
      guardarMarca("");
      guardarNumeroSerie("");
      guardarFecha("");
    };
  
    const mostrarAlerta = () => {
      Alert.alert("Error", "Todos los campos son obligatorios {" + pieza +"}", [{ text: "OK" }]);
    };
  
    return (
      <>
        <ScrollView style={styles.formulario}>
          <View>
            <Text style={styles.label}>Pieza:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(texto) => guardarPieza(texto)}
            />
          </View>
          <View>
            <Text style={styles.label}>Marca:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(texto) => guardarMarca(texto)}
            />
          </View>
          <View>
            <Text style={styles.label}>N° de Serie:</Text>
            <TextInput
              style={styles.input}
              onChangeText={(texto) => guardarNumeroSerie(texto)}
              keyboardType="numeric"
            />
          </View>
          <View>
            <Text style={styles.label}>Fecha:</Text>
            <Button title="Seleccionar Fecha" onPress={showDatePicker} />
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
            <Text>{fecha}</Text>
          </View>
        
          <View>
            <TouchableHighlight
              onPress={() => crearNuevoProducto()}
              style={styles.btnSubmit}
            >
              <View>
              <Text style={styles.textoSubmit}>Crear Nuevo Producto</Text>
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
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    label: {
      fontWeight: "bold",
      fontSize: 18,
      marginTop: 20,
    },
    input: {
      marginTop: 10,
      height: 50,
      borderColor: "#e1e1e1",
      borderWidth: 1,
      borderStyle: "solid",
    },
    btnSubmit: {
      padding: 10,
      backgroundColor: "#C70039",
      marginVertical: 10,
    },
    textoSubmit: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
  });

export default Formulario;
