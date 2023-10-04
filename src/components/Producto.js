import { View, Text, TouchableHighlight, StyleSheet,Modal,Button, Pressable, Touchable} from "react-native";
import React, { useState } from "react";

const Producto = ({ item, eliminarProducto }) => {
  const textoEliminar = (id) => {
    console.log("eliminando..." + id);
    eliminarProducto(id);
  };

  const [modalVisibleProducto, setModalVisibleProducto] = useState(false);

  return (
    <View style={styles.producto}>

        <Modal transparent={true} animationType='slide' visible={modalVisibleProducto} onRequestClose={() =>{
          alert("Modal has been closed.");
        }}>
          <View style={styles.vistaModal}>
            <View style={styles.Modal}>
              <Text style={styles.labelHeader}>Detalles Del Producto</Text>
              <Text style={styles.label}>Pieza:</Text>
              <Text style={styles.subtitulo}>{item.pieza}</Text>
              <Text style={styles.label}>Marca:</Text>
              <Text style={styles.subtitulo}>{item.marca}</Text>
              <Text style={styles.label}>N° de Serie:</Text>
              <Text style={styles.subtitulo}>{"S"+item.numeroSerie}</Text>
              <Text style={styles.label}>Fecha De Cambio:</Text>
              <Text style={styles.fecha}>{item.fecha}</Text>
              <Button title="cerrar" onPress={()=>{setModalVisibleProducto(!modalVisibleProducto)}}></Button>
            </View>
          </View>
        </Modal>

      <View>
        <Text style={styles.label}>Pieza:</Text>
        <Text style={styles.subtitulo}>{item.pieza}</Text>
      </View>

      <View>
        <Text style={styles.label}>Fecha de cambio:</Text>
        <Text style={styles.subtitulo}>{item.fecha}</Text>
      </View>

      <View>
        <TouchableHighlight
          onPress={() => {setModalVisibleProducto(!modalVisibleProducto)}}
          style={styles.btnInfo}
        >
          <Text style={styles.textoEliminar}>Información Del Producto</Text>
        </TouchableHighlight>
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
    padding: 4.5,
  },
  labelHeader: {
    fontWeight: "bold",
    fontSize: 21,
    marginTop: 20,
  } ,
  texto: {
    fontSize: 18,
  },
  btnEliminar: {
    padding: 10,
    backgroundColor: "red",
    marginVertical: 10,
    borderRadius: 10,
  },
  btnInfo: {
    padding: 10,
    backgroundColor: "#1880E9",
    marginVertical: 20,
    borderRadius: 10,

  },
  textoEliminar: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  vistaModal:{
    backgroundColor: "#000000aa",
    flex: 1,
  },
  Modal:{
    backgroundColor: "#fff",
    margin:50,
    padding:40,
    borderRadius: 10,
  },
  subtitulo:{
    fontWeight: "bold",
    fontSize:19.6,
    padding: 7,
  },
  fecha:{
    padding: 12,
    paddingLeft: 0,
    fontSize: 19.6,
    fontWeight: "bold",
  }
});

export default Producto;