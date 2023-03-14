import { StyleSheet, Text, View } from "react-native";
import CheckboxTask from "./CheckboxTask";

export default function Task({ title = 'Undefined', items = [] }) {
    const task = items === null ? [] : title === 'Incomplete' ? items.filter(item => !item.isFinish) : items.filter(item => item.isFinish)


    const ListTask = task.length > 0 ? (
        task.map(item => {
            return <CheckboxTask
                key={item.id}
                title={item.title}
                category={item.category}
                isFinish={item.isFinish}
            />
        })
    ) : null

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.taskContainer}>
                {ListTask !== null ? ListTask : (
                    <Text style={{ color: '#DADADA', fontSize: 18, fontFamily: 'Inter-Medium' }}>There is no task.</Text>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
    },
    title: {
        color: '#EBEBEB',
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        marginBottom: 10,
    },
    taskContainer: {
        gap: 10,
    }
})