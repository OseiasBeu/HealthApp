import React from "react"
import { 
    View, 
    Text,
    TouchableOpacity,
    Share
} from "react-native"
import styles from "./style";

export default function ResultImc(props){
    const onShare = async ()=> {
        const result = await Share.share({
            message: "Meu imc hoje é: " + props.resultImc,
        })
    }
    return(
        <View style={styles.resultImc}>
            <View style={styles.boxShareButton}>
            <Text style={styles.information}>{props.messageResultImc}</Text>
            <Text style={styles.numberImc}>{props.ResultImc}</Text>
                {/* { props.ResultImc != null ? */}
                <TouchableOpacity 
                onPress={onShare}
                style={styles.shared}>
                    <Text style={styles.sheredText}>Share</Text>
                </TouchableOpacity>
                {/* :
                <View/>
                } */}
            </View>

        </View>
    );
}