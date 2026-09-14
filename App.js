import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function App() {
  const [cantidad, setCantidad] = useState("");
  const [resultado, setResultado] = useState("");

  // Tasa de ejemplo
  const tasa = 4000;

  const convertir = () => {
    if (cantidad === "") {
      setResultado("");
      return;
    }

    const numero = parseFloat(cantidad);
    const conversion = numero * tasa;

    setResultado(conversion.toLocaleString("es-CO"));
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* ENCABEZADO */}
      <View style={styles.header}>
        <Text style={styles.logo}>🌎 WorldRate</Text>

        <Text style={styles.subtitle}>
          Convierte monedas fácilmente
        </Text>
      </View>

      {/* TARJETA DEL CONVERSOR */}
      <View style={styles.card}>

        <Text style={styles.cardTitle}>
          Conversor de divisas
        </Text>

        <Text style={styles.label}>
          Dólares estadounidenses
        </Text>

        <Text style={styles.currency}>
          USD 🇺🇸
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Ingresa una cantidad"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={cantidad}
          onChangeText={setCantidad}
        />

        <View style={styles.arrow}>
          <Text style={styles.arrowText}>↓</Text>
        </View>

        <Text style={styles.label}>
          Pesos colombianos
        </Text>

        <Text style={styles.currency}>
          COP 🇨🇴
        </Text>

        <View style={styles.resultBox}>
          <Text style={styles.result}>
            {resultado === "" ? "$ 0 COP" : `$ ${resultado} COP`}
          </Text>
        </View>

        <Text style={styles.rate}>
          1 USD = {tasa.toLocaleString("es-CO")} COP
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={convertir}
        >
          <Text style={styles.buttonText}>
            Convertir
          </Text>
        </TouchableOpacity>

      </View>

      {/* INFORMACIÓN */}
      <View style={styles.info}>
        <Text style={styles.infoTitle}>
          💱 WorldRate
        </Text>

        <Text style={styles.infoText}>
          Convierte tus monedas de manera rápida,
          sencilla y sin complicaciones.
        </Text>
      </View>

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
    marginTop: 30,
    marginBottom: 25,
  },

  logo: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  subtitle: {
    fontSize: 15,
    color: "#94A3B8",
    marginTop: 8,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
  },

  cardTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 6,
  },

  currency: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 10,
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

  arrow: {
    alignItems: "center",
    marginVertical: 12,
  },

  arrowText: {
    fontSize: 28,
    color: "#2563EB",
  },

  resultBox: {
    height: 60,
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },

  result: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#2563EB",
  },

  rate: {
    textAlign: "center",
    color: "#64748B",
    marginTop: 15,
  },

  button: {
    backgroundColor: "#2563EB",
    height: 55,
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

  info: {
    marginTop: 25,
    alignItems: "center",
  },

  infoTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  infoText: {
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 8,
    lineHeight: 21,
  },
});