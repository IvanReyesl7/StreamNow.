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
  showSaveForm,
  saveProductosStorage,
}) => {
  const [pieza, guardarPieza] = useState("");
  const [marca, GuardarMarca] = useState("");
  const [numeroSerie, guardarNumeroSerie] = useState("");
  const [fechaCambio, guardarFechaCambio] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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

  const showAlerta = () => {
    Alert.alert("Error", "Todos los campos son obligatorios {" + pieza + "}", [
      { text: "OK" },
    ]);
  };

  const crearNuevoProducto = () => {
    if (
      pieza.trim() === "" ||
      marca.trim() === "" ||
      numeroSerie.trim() === "" ||
      fechaCambio.trim() === ""
    ) {
      showAlerta();
    }

    const producto = { pieza, marca, numeroSerie, fechaCambio };
    producto.id = shortid();

    const productosNuevo = [...productos, producto];
    setProductos(productosNuevo);

    saveProductosStorage(JSON.stringify(productosNuevo));

    showSaveForm(false);

    guardarPieza("");
    GuardarMarca("");
    guardarNumeroSerie("");
    guardarFechaCambio("");
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Pieza:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => {
              guardarPieza();
            }}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.label}>marca:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => {
              GuardarMarca();
            }}
          ></TextInput>
        </View>

        <View>
          <Text style={styles.label}>N° serie:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(texto) => {
              guardarNumeroSerie();
            }}
            keyboardType="numeric"
          ></TextInput>
        </View>

        <View>
          <Button title="Show Date Picker" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            local="es-sv"
          />
        </View>

        <View>
          <TouchableHighlight
            onPress={() => crearNuevoProducto()}
            style={styles.btnSubmit}
          >
            <View>
              <Text style={styles.textoSubmit}>Crear nuevo producto</Text>
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
