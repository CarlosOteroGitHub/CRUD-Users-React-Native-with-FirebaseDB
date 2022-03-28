import React, { useEffect, useState } from 'react';
import db from "../database/firebase";
import { collection, doc, getDocs } from "firebase/firestore";
import {View, Button, ScrollView, StyleSheet} from 'react-native';
import { ListItem, Avatar } from "react-native-elements";

const Listar = (props) => {

    const[users, setUsers] = useState([]);

    useEffect(()=>{
        const getUsers = async () => {
            const users = [];
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                const { nombre, email, telefono } = doc.data();
                users.push({
                    id: doc.id,
                    nombre,
                    email,
                    telefono,
                });
            });
            setUsers(users);
        };
        getUsers();
    },[]);

    return(
        <ScrollView style={styles.container}>
            <Button title="Crear Usuario" color="#29BA0F" onPress={() => props.navigation.navigate("Create")}/>
        {users.map((user) => {
            return (
                <ListItem key={user.id} bottomDivider onPress={() => props.navigation.navigate("Edit", { userId: user.id })}>
                    <ListItem.Chevron />
                    <Avatar source={{ uri: "https://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/prototypen/w_sexy_gr.jpg" }} rounded/>
                    <ListItem.Content>
                        <ListItem.Title>{user.nombre}</ListItem.Title>
                        <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                        <ListItem.Subtitle>{user.telefono}</ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            );
        })}
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
    }
});

export default Listar;