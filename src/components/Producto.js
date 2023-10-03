import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import React, { useState } from "react";

const Producto = ({ item, eliminarProducto }) => {
  const textoEliminar = (id) => {
    console.log("eliminando..." + id);
    eliminarProducto(id);
  };

  return (
    <View style={styles.producto}>
      <View>
        <Text style={styles.label}>Pieza:</Text>
        <Text style={styles.label}>{item.pieza}</Text>
      </View>

      <View>
        <Text style={styles.label}>Fecha de cambio:</Text>
        <Text style={styles.label}>{item.fecha}</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => textoEliminar(item.id)}
          style={styles.btnEliminar}
        >
          <Text style={styles.textoEliminar}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  producto: {
    backgroundColor: "FFF",
    borderBottomColor: "E1E1E1",
    borderStyle: "solid",
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  label: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 20,
  },
  texto: {
    fontSize: 18,
  },
  btnEliminar: {
    padding: 10,
    backgroundColor: "red",
    marginVertical: 10,
  },
  textoEliminar: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Producto;