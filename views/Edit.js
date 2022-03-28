import React, { useEffect, useState } from "react";
import db from "../database/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import { ScrollView, Button, View, Alert, ActivityIndicator, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Edit = (props) => {
    const initialState = {
        id: '',
        nombre: '',
        email: '',
        telefono: '',
    };

    const [user, setUser] = useState(initialState);
    const [loading, setLoading] = useState(true);

    const handleTextChange = (value, prop) => {
        setUser({ ...user, [prop]: value });
    };

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection("users").doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({ ...user, id: doc.id });
        setLoading(false);
    };

    const openConfirmationAlert = () => {
        Alert.alert("Alerta", "¿Estas seguro de eliminar el usuario?", 
            [ 
                { text: "Yes", onPress: () => deleteUser() }, 
                { text: "No", onPress: () => console.log("canceled") }, 
            ],
            {
                cancelable: true,
            }
        );
    };

    const deleteUser = async () => {
        setLoading(true)
        const dbRef = firebase.db
            .collection("users")
            .doc(props.route.params.userId);
        await dbRef.delete();
        setLoading(false)
        props.navigation.navigate("Listar");
    };

    useEffect(() => {
        getUserById(props.route.params.userId);
    }, []);

    return(
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Nombre' onChangeText={(value) => handleTextChange(value, "nombre")} value={user.nombre}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Email' onChangeText={(value) => handleTextChange(value, "email")} value={user.email}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Teléfono' onChangeText={(value) => handleTextChange(value, "telefono")} value={user.telefono}/>
            </View>
            <View style={styles.inputGroup}>
                <Button title='Guardar' color="#3090DC" onPress={() => agregarUsuario()}></Button>
            </View>
            <View style={styles.inputGroup}>
                <Button title='Eliminar' color='#DE743B' onPress={() => openConfirmationAlert()}></Button>
            </View>
            <View style={styles.inputGroup}>
                <Button title='Cancelar' color='#C63116' onPress={() => props.navigation.navigate("Listar")}></Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35,
    },
    loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
    },
    btn: {
        marginBottom: 7,
    },
});

export default Edit;