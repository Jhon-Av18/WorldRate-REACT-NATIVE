import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";

export default function App() {

  // Cantidad que escribe el usuario
  const [cantidad, setCantidad] = useState("");

  // Resultado
  const [resultado, setResultado] = useState("");

  // Moneda de origen
  const [monedaOrigen, setMonedaOrigen] = useState({
    codigo: "USD",
    nombre: "Dólar estadounidense",
    bandera: "🇺🇸",
  });

  // Moneda de destino
  const [monedaDestino, setMonedaDestino] = useState({
    codigo: "COP",
    nombre: "Peso colombiano",
    bandera: "🇨🇴",
  });

  // Controla si se muestra el selector
  const [mostrarSelector, setMostrarSelector] = useState(false);

  // Indica qué moneda estamos seleccionando
  const [seleccionando, setSeleccionando] = useState("origen");

  // Lista de monedas
  const monedas = [
    {
      codigo: "USD",
      nombre: "Dólar estadounidense",
      bandera: "🇺🇸",
      tasa: 1,
    },
    {
      codigo: "COP",
      nombre: "Peso colombiano",
      bandera: "🇨🇴",
      tasa: 4000,
    },
    {
      codigo: "EUR",
      nombre: "Euro",
      bandera: "🇪🇺",
      tasa: 0.85,
    },
    {
      codigo: "GBP",
      nombre: "Libra esterlina",
      bandera: "🇬🇧",
      tasa: 0.74,
    },
    {
      codigo: "JPY",
      nombre: "Yen japonés",
      bandera: "🇯🇵",
      tasa: 150,
    },
    {
      codigo: "MXN",
      nombre: "Peso mexicano",
      bandera: "🇲🇽",
      tasa: 18,
    },
  ];

  // Abrir selector de monedas
  const abrirSelector = (tipo) => {
    setSeleccionando(tipo);
    setMostrarSelector(true);
  };

  // Elegir una moneda
  const elegirMoneda = (moneda) => {

    if (seleccionando === "origen") {
      setMonedaOrigen(moneda);
    } else {
      setMonedaDestino(moneda);
    }

    setMostrarSelector(false);

    // Limpiar resultado
    setResultado("");
  };

  // Convertir
  const convertir = () => {

    if (cantidad === "") {
      setResultado("");
      return;
    }

    const numero = parseFloat(cantidad);

    // Buscamos las tasas
    const origen = monedas.find(
      (moneda) => moneda.codigo === monedaOrigen.codigo
    );

    const destino = monedas.find(
      (moneda) => moneda.codigo === monedaDestino.codigo
    );

    // Convertimos primero a USD
    const valorUSD = numero / origen.tasa;

    // Después convertimos a la moneda destino
    const conversion = valorUSD * destino.tasa;

    setResultado(
      conversion.toLocaleString("es-CO", {
        maximumFractionDigits: 2,
      })
    );
  };

  // Cambiar las monedas
  const intercambiarMonedas = () => {

    const temporal = monedaOrigen;

    setMonedaOrigen(monedaDestino);
    setMonedaDestino(temporal);

    setResultado("");
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* ENCABEZADO */}
      <View style={styles.header}>

        <Text style={styles.logo}>
          🌎 WorldRate
        </Text>

        <Text style={styles.subtitle}>
          Convierte monedas fácilmente
        </Text>

      </View>


      {/* TARJETA */}
      <View style={styles.card}>

        <Text style={styles.title}>
          Conversor de divisas
        </Text>


        {/* MONEDA ORIGEN */}

        <Text style={styles.label}>
          De
        </Text>

        <TouchableOpacity
          style={styles.currencyButton}
          onPress={() => abrirSelector("origen")}
        >

          <Text style={styles.flag}>
            {monedaOrigen.bandera}
          </Text>

          <View style={styles.currencyInfo}>

            <Text style={styles.currencyCode}>
              {monedaOrigen.codigo}
            </Text>

            <Text style={styles.currencyName}>
              {monedaOrigen.nombre}
            </Text>

          </View>

          <Text style={styles.arrow}>
            ▼
          </Text>

        </TouchableOpacity>


        {/* BOTÓN INTERCAMBIAR */}

        <TouchableOpacity
          style={styles.swapButton}
          onPress={intercambiarMonedas}
        >

          <Text style={styles.swapText}>
            ⇅
          </Text>

        </TouchableOpacity>


        {/* MONEDA DESTINO */}

        <Text style={styles.label}>
          A
        </Text>

        <TouchableOpacity
          style={styles.currencyButton}
          onPress={() => abrirSelector("destino")}
        >

          <Text style={styles.flag}>
            {monedaDestino.bandera}
          </Text>

          <View style={styles.currencyInfo}>

            <Text style={styles.currencyCode}>
              {monedaDestino.codigo}
            </Text>

            <Text style={styles.currencyName}>
              {monedaDestino.nombre}
            </Text>

          </View>

          <Text style={styles.arrow}>
            ▼
          </Text>

        </TouchableOpacity>


        {/* CANTIDAD */}

        <Text style={styles.label}>
          Cantidad
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ejemplo: 100"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={cantidad}
          onChangeText={setCantidad}
        />


        {/* BOTÓN CONVERTIR */}

        <TouchableOpacity
          style={styles.button}
          onPress={convertir}
        >

          <Text style={styles.buttonText}>
            Convertir
          </Text>

        </TouchableOpacity>


        {/* RESULTADO */}

        <View style={styles.resultBox}>

          <Text style={styles.resultLabel}>
            Resultado
          </Text>

          <Text style={styles.result}>
            {resultado === ""
              ? "0 " + monedaDestino.codigo
              : resultado + " " + monedaDestino.codigo
            }
          </Text>

        </View>

      </View>


      {/* MODAL PARA ELEGIR MONEDA */}

      <Modal
        visible={mostrarSelector}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMostrarSelector(false)}
      >

        <View style={styles.modalBackground}>

          <View style={styles.modal}>

            <Text style={styles.modalTitle}>
              Selecciona una moneda
            </Text>

            <FlatList
              data={monedas}
              keyExtractor={(item) => item.codigo}
              renderItem={({ item }) => (

                <TouchableOpacity
                  style={styles.option}
                  onPress={() => elegirMoneda(item)}
                >

                  <Text style={styles.optionFlag}>
                    {item.bandera}
                  </Text>

                  <View>

                    <Text style={styles.optionCode}>
                      {item.codigo}
                    </Text>

                    <Text style={styles.optionName}>
                      {item.nombre}
                    </Text>

                  </View>

                </TouchableOpacity>

              )}
            />

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setMostrarSelector(false)}
            >

              <Text style={styles.closeText}>
                Cancelar
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 20,
  },

  logo: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 15,
    marginTop: 6,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
  },

  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 20,
  },

  label: {
    color: "#64748B",
    fontSize: 14,
    marginBottom: 7,
    marginTop: 5,
  },

  currencyButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 12,
  },

  flag: {
    fontSize: 30,
    marginRight: 12,
  },

  currencyInfo: {
    flex: 1,
  },

  currencyCode: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0F172A",
  },

  currencyName: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 2,
  },

  arrow: {
    fontSize: 15,
    color: "#64748B",
  },

  swapButton: {
    alignSelf: "center",
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 8,
  },

  swapText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 18,
    color: "#0F172A",
  },

  button: {
    height: 55,
    backgroundColor: "#2563EB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  resultBox: {
    backgroundColor: "#EFF6FF",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 20,
  },

  resultLabel: {
    color: "#64748B",
    fontSize: 14,
  },

  result: {
    color: "#2563EB",
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 5,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },

  modal: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: "80%",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 15,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  optionFlag: {
    fontSize: 28,
    marginRight: 15,
  },

  optionCode: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0F172A",
  },

  optionName: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },

  closeButton: {
    backgroundColor: "#E2E8F0",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },

  closeText: {
    color: "#0F172A",
    fontWeight: "bold",
    fontSize: 16,
  },

});