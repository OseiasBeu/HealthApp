import { registerRootComponent } from "expo"
import React, { useState } from "react"
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    Vibration,
    Pressable,
    Keyboard,
    FlatList
} from "react-native"
import ResultImc from './ResultImc/'
import styles from "./style"
export default function Form(){


const [height, setHeight] = useState(null)
const [weight, setWeight] = useState(null)
const [messageImc, setMessageImc] = useState("Preencha o peso e altura:")
const [imc, setImc] = useState(null)
const [textButton, setTextButton] = useState("Calcular")
const [errorMessage, setErrorMessage] = useState(null)
const [imcList, setImclist] = useState([])


function imcCalculator(){
    let heightFormat = height.replace(",",".")
    let weightFormat = weight.replace(",",".")
    let totalImc= (weightFormat/(heightFormat*heightFormat)).toFixed(2)
    setImclist ((arr)=> [...arr,{id: new Date().getTime(), imc:totalImc}])
    return setImc(totalImc)
}

function verificationImc(){
    if(imc == null){
        Vibration.vibrate();
        setErrorMessage('campo obrigatório*')
    }
}

function validatorImc(){
    console.log(imcList)
    if(weight != null && height != null){
        imcCalculator()
        setHeight(null)
        setWeight(null)
        setMessageImc("Seu imc é igual:")
        setTextButton("Calcular Novamente")
        setErrorMessage(null)        
    }else{
    verificationImc()
    setImc(null)
    setTextButton("Calcular")
    setMessageImc('Preencha o peso e altura')

    }
    
    
}
    return(
        // <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
            <View style={styles.formContext}>
                {imc == null ?
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setHeight} 
                value={height}
                placeholder="Ex. 1.75"
                keyboardType="numeric"
                />

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput 
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder="Ex. 75.365"
                keyboardType="numeric"                
                />

                {/* <Button
                onPress={() => validatorImc()}
                title={textButton}
                /> */}
                <TouchableOpacity
                style={styles.ButtonCalculator}
                onPress={() => {validatorImc()}}
                >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>

            </Pressable>
            :
            <View style={styles.exibitionResultImc}>
            <ResultImc messageResultImc={messageImc} ResultImc={imc}/>
             <TouchableOpacity
                style={styles.ButtonCalculator}
                onPress={() => {validatorImc()}}
                >
                <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            }
            <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.listImcs}
            data={imcList.reverse()}
            renderItem={({item}) =>{
            return(
                <Text style={styles.textResultItemList}>
                    Resultado IMC = 
                        <Text style={styles.resultImcItem}>{item.imc}</Text>
                </Text>
            )
            }}
            keyExtractor={(item)=>{
                item.id
            }
            }   
            >

            </FlatList>
        </View>
    );
}