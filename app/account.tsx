import { Link } from 'expo-router'
import { Text, View } from 'native-base'

export default function Account() {
    return (
        <View>
            <Link href={'/signup'}>Sign up</Link>
        </View>
    )
}
