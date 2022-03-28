import React, {useState} from 'react';
import db from "../database/firebase";
import { addDoc, collection } from "firebase/firestore";
import {View, Button, TextInput, ScrollView, StyleSheet} from 'react-native';

const Create = (props) => {
    const initalState = {
        nombre: '',
        email: '',
        telefono: ''
    };

    const [state, setState] = useState(initalState);

    const agregarUsuario = async () => {
        if(state.nombre === '' || state.email === ''){
            alert("Uno o varios de los campos de texto estan vacios!");
        } else {
            try{
                await addDoc(collection(db, "users"), {
                    nombre: state.nombre,
                    email: state.email,
                    telefono: state.telefono
                });
                props.navigation.navigate('Listar');
            } catch(error){
                console.log(error);
            }
        }
    };

    return(
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Nombre' onChangeText={(value) => setState({ ...state, nombre: value})} value={state.nombre}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Email' onChangeText={(value) => setState({ ...state, email: value})} value={state.email}/>
            </View>
            <View style={styles.inputGroup}>
                <TextInput placeholder='Teléfono' onChangeText={(value) => setState({ ...state, telefono: value})} value={state.telefono}/>
            </View>
            <View style={styles.inputGroup}>
                <Button title='Guardar' color="#29BA0F" onPress={() => agregarUsuario()}></Button>
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
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    },
    loader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
      }
});

export default Create;