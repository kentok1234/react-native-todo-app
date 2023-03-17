import { View, StyleSheet, Text, Pressable, TouchableHighlight } from "react-native";
import Checkbox from "expo-checkbox"
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons'
import { useState } from "react";

export default function CheckboxTask({ id, title, category, isFinish, onSelect }) {

    const [isCheked, setChecked] = useState(isFinish)

    const onCheck = (value) => {
        onSelect({ id, title, category, isFinish: value, action: 'update' })
        setChecked(value)
    }

    const onDelete = () => {
        onSelect({ id, title, category, isFinish, action: 'delete' })
    }

    return (
        <View style={styles.container}>
            <View style={styles.checkboxContainer}>
                <Checkbox value={isCheked} onValueChange={onCheck} style={styles.checkbox} />
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.category}>{category}</Text>
                </View>
            </View>
            <TouchableHighlight activeOpacity={1} underlayColor='red' style={styles.buttonDelete} onPress={onDelete}>
                <MaterialsIcon name="delete" color={'white'} size={30} />
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    checkboxContainer: {
        flexDirection: "row",
        alignContent: "flex-start",
        gap: 20,
    },
    title: {
        color: '#DADADA',
        fontSize: 18,
        fontFamily: 'Inter-Medium',
    },
    category: {
        color: '#575767',
        fontSize: 14,
        fontFamily: 'Inter-SemiBold',
    },
    checkbox: {
        borderRadius: 6,
    },
    buttonDelete: {
        borderRadius: 6,
        padding: 3,
    },
})