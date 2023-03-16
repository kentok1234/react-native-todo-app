
import { StyleSheet, Text, View } from "react-native";
import CheckboxTask from "./CheckboxTask";

export default function Task({ title = 'Undefined', children, setSelectedTask }) {
    // const task = items === null ? [] : title === 'Incomplete' ? items.filter(item => !item.isFinish) : items.filter(item => item.isFinish)
    // const ListTask = task.length > 0 ? (
    //     task.map(item => {
    //         return <CheckboxTask
    //             key={item.id}
    //             title={item.title}
    //             category={item.category}
    //             isFinish={item.isFinish}
    //             onSelect={setSelectedTask}
    //         />
    //     })
    // ) : null

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.taskContainer}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        height: 'auto',
    },
    title: {
        color: '#EBEBEB',
        fontSize: 18,
        fontFamily: 'Inter-Bold',
        marginBottom: 10,
    },
    taskContainer: {
        gap: 10,
        flex: 1,
        minHeight: 100
    }
})