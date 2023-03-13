import { StyleSheet, Text, View } from 'react-native';

export default function Header({ lengthIncomplete = 0, lengthCompleted = 0 }) {

  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  const date = new Date()

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{month[date.getMonth()]} {date.getDate()}, {date.getFullYear()}</Text>
      <Text style={styles.information}>{lengthIncomplete} incomplete, {lengthCompleted} completed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderColor: '#575767',
  },
  date: {
    color: '#DADADA',
    fontFamily: 'Inter-Bold',
    fontSize: 32,
  },
  information: {
    color: '#575767',
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
  }
})