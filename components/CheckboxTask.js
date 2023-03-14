import { View, StyleSheet, Text } from "react-native";
import Checkbox from "expo-checkbox"
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CheckboxTask({ title, category, isFinish }) {

    const [isCheked, setChecked] = useState(isFinish)

    const changeCheck = async (value) => {
        try {
            const data = await AsyncStorage.getItem('task')
            const dataParse = JSON.parse(data)

            const updateData = dataParse.map(item => {
                if (item.title === title) {
                    return {
                        ...item,
                        isFinish: value
                    }
                }

                return item
            })

            setChecked(value)

            await AsyncStorage.setItem('task', JSON.stringify(updateData))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <Checkbox value={isCheked} onValueChange={changeCheck} style={styles.checkbox} />
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.category}>{category}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-start",
        flexDirection: "row",
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
    }
})