import { View, StyleSheet, Text } from "react-native";
import Checkbox from "expo-checkbox"
import { useState } from "react";

export default function CheckboxTask({ title, category, isFinish }) {

    const [isCheked, setChecked] = useState(isFinish)

    return (
        <View style={styles.container}>
            <Checkbox value={isCheked} onValueChange={setChecked} style={styles.checkbox} />
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