import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { propsStack } from '../routes/model'
import * as Animatable from 'react-native-animatable'
import Icon from '@expo/vector-icons/Feather'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { api } from '../api/api'

const schema = yup.object({
  email: yup.string().email('Email Invalido').required('Campo obrigatório'),
  name: yup.string().required('Informar seu Nome'),
  password: yup
    .string()
    .min(8, 'A senha deve ter no minimo 8 caracteres')
    .required('Campo obrigatório'),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem coincidir')
    .required('Confirmação de senha é obrigatória'),
})

export default function Signup() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  async function verifyEmail(email: string) {
    const response = await api.post('/verifyemail', { email })
    if (response.data === null) {
      const data = response.data
      return data
    } else {
      const dataerror = response.data
      return dataerror
    }
  }
  async function createUser(email: string, name: string, password: string) {
    const response = await api.post('/createUser', {
      email,
      name,
      password,
    })

    return response.data
  }
  async function handleCreaterUser(data) {
    const { email, name, password } = data
    const verifyemail = await verifyEmail(email)
    if (verifyemail != null) {
      alert('Email ja esta sendo utlizado, use outro!')
    } else {
      const createuser = await createUser(email, name, password)
      console.log(createuser)
      if (createuser != null) {
        navegation.navigate('ConfirmUser')
      }
    }
  }

  const navegation = useNavigation<propsStack>()
  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.TextHeader}>Crie sua Conta</Text>
        <Icon style={styles.iconuser} name="user" size={50} color="white" />
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
        <Text style={styles.TextForm}>Nome</Text>
        <Controller
          control={control}
          name="name"
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
              placeholder="Digite seu Nome"
            />
          )}
        />
        {errors.name && (
          <Text style={styles.textmenssage}>{errors.name?.message}</Text>
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
                  borderWidth: errors.email && 1,
                  borderColor: errors.email && '#ff375b',
                },
              ]}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              secureTextEntry={true}
              placeholder="Digite seu Nome"
            />
          )}
        />
        {errors.password && (
          <Text style={styles.textmenssage}>{errors.password?.message}</Text>
        )}

        <Text style={styles.TextForm}>Confirmar Senha</Text>
        <Controller
          control={control}
          name="confirmpassword"
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
              secureTextEntry={true}
              placeholder="Digite seu Nome"
            />
          )}
        />
        {errors.confirmpassword && (
          <Text style={styles.textmenssage}>
            {errors.confirmpassword?.message}
          </Text>
        )}
        <TouchableOpacity
          style={styles.buttonacessar}
          onPress={handleSubmit(handleCreaterUser)}
        >
          <Text style={styles.textacessar}>Criar Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttoncriarconta}
          onPress={() => {
            navegation.navigate('SignIn')
          }}
        >
          <Text style={styles.textcriarconta}>Voltar</Text>
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
    borderWidth: 1,
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
  iconuser: {
    position: 'absolute',
    marginLeft: '68%',
    marginBottom: '5%',
  },
  textmenssage: {
    position: 'relative',
    color: 'red',
  },
  formArea: {},
})
