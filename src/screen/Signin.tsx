import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { propsStack } from '../routes/model'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { api } from '../api/api'
import * as SecureStore from 'expo-secure-store'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
  email: yup.string().email('Email Invalido').required('Campo obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha deve ter no minimo 8 caracteres')
    .required('Campo obrigatório'),
})

export default function Signin() {
  const navegation = useNavigation<propsStack>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  async function handleCreaterUser(data) {
    const { email, password } = data
    handleOAuthCode(email, password)
  }

  async function handleOAuthCode(email: string, password: string) {
    try {
      const response = await api.post('/login', {
        email,
        password,
      })
      console.log('TESTE')
      console.log(response.data)
      const { token } = response.data
      console.log(token)
      await SecureStore.setItemAsync('token', token)
      navegation.navigate('Home')
    } catch (error) {
      if (error.response) {
        // O servidor retornou um código de status diferente de 200
        alert('Email ou senha invalidos, tente novamente!')
        console.error('Erro de resposta do servidor:', error.response.data)
        console.error('Status do erro:', error.response.status)
        const invalido = true
        return invalido
      } else if (error.request) {
        // A solicitação foi feita, mas não recebeu resposta
        console.error('Erro de solicitação:', error.request)
      } else {
        // Ocorreu um erro ao configurar a solicitação
        console.error('Erro ao configurar a solicitação:', error.message)
      }
    }
  }

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.TextHeader}>Bem-vindo(a)</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.TextForm}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  borderWidth: errors.email && 1,
                  borderColor: errors.email && '#ff375b',
                },
              ]}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              placeholder="Digite seu email"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.textmenssage}>{errors.email?.message}</Text>
        )}

        <Text style={styles.TextForm}>Senha</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  borderWidth: errors.password && 1,
                  borderColor: errors.password && '#ff375b',
                },
              ]}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry={true}
              placeholder="Digite sua senha"
            />
          )}
        />
        {errors.password && (
          <Text style={styles.textmenssage}>{errors.password?.message}</Text>
        )}
        <TouchableOpacity
          style={styles.buttonacessar}
          onPress={handleSubmit(handleCreaterUser)}
        >
          <Text style={styles.textacessar}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttoncriarconta}
          onPress={() => {
            navegation.navigate('Signup')
          }}
        >
          <Text style={styles.textcriarconta}>
            Não possui uma conta ? Cadastra-se
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D9488',
  },
  containerHeader: {
    marginTop: '14%',
    marginBottom: '8%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  TextHeader: {
    fontSize: 37,
    fontWeight: 'bold',
    paddingLeft: '6%',
    color: '#fff',
  },
  containerForm: {
    flex: 1,
    backgroundColor: 'white',
    borderTopEndRadius: 25,
    borderTopStartRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  TextForm: {
    fontSize: 20,
    fontWeight: '400',
    marginTop: 20,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 5,
    padding: 1,
    height: 40,
    fontSize: 18,
    fontWeight: '300',
  },
  buttonacessar: {
    marginTop: '10%',
    width: '100%',
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#0D9488',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textacessar: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'white',
  },
  buttoncriarconta: {
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textcriarconta: {
    color: '#b7bcc4',
  },
  textmenssage: {
    position: 'relative',
    color: 'red',
  },
})
