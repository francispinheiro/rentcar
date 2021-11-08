import React , {
    createContext,
    useState,
    useContext,
    ReactNode,
    useEffect
} from 'react';

import { api } from '../services/api';
import { database } from '../database'
import { User as ModelUser } from '../database/model/User';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

// tudo que vem do banco 
interface User {
    id: string;
    user_id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
    token: string;
}

// estado de autenticacao
// interface AuthState {
//     token: string;
//     user: User;
// }

interface SignInCredentials {
    email: string;
    password: string;
}

// para o contexto, vou querer compartilhar com a aplicacao
interface AuthContextData {
    user: User; // Dados do usuario
    // meu signIn tem credenciais(credentials) e essas credenciais é SignInCredentials
    // função signIn não retorna nada
    signIn: (credentials: SignInCredentials) => Promise<void>; 

    // função sigOut
    signOut: () => Promise<void>;

    // função atualização / update
    updatedUser: (user: User) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

// Criaremos o contexto, falamos qual é o estado inicial do contexto que é um objeto vazio que 
// esperar o AuthContextData
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Vamos precisar prover para toda a aplicação o nosso context
// Esse context precisamos receber um children, então fazemos um interfaces
// e tipamos a frente do children { children } : AuthProviderProps
function AuthProvider({ children } : AuthProviderProps) {
    // Criamos para armazenar os dados de autenticacao
    // que tipo queremos guardar dentro deste estado<> que vai receber token e user
    // e começa com objeto vazio de AuthState
    const [data, setData] = useState<User>({} as User);

    // função de signIn, e vai receber de SignInCredentials o email e senha
    async function signIn({ email, password } : SignInCredentials) {    
        try {
            // Requeremos da Api, passando o email e a senha para que a nossa autenticação funcione
            const response = await api.post('/sessions', {
                email,
                password
            });

            // Como estamos utilizando o axios ele devolve dentro do data
            // console.log(response.data);

            // Vamos agora desestruturar esses dois objetos o token e o usuario
            const { token, user } = response.data;

            // Vamos add em todas a resquisições que forem feitas o token do usuario
            api.defaults.headers.authorization = `Bearer ${token}`;

            // Salvar no banco
            const userCollection = database.get<ModelUser>('users');
            await database.write(async () => {
                await userCollection.create(( newUser ) => {
                    newUser.user_id = user.id,
                    newUser.name = user.name,
                    newUser.email = user.email,
                    newUser.driver_license = user.driver_license,
                    newUser.avatar = user.avatar,
                    newUser.token = token
                })
            });            

            // salva o estado
            setData({ ...user, token  }); // atualizamos o estado

        } catch (error) {
            throw new Error(error);
        }
    }

    async function signOut() {
        try {
            const userCollection = database.get<ModelUser>('users');
            await database.write( async () => {
                // seleciona o usuario
                const userSelect = await userCollection.find(data.id);
                // remove o usuario do banco
                await userSelect.destroyPermanently();
            });

            // atualiza o estado passando um objeto vazio
            setData({} as User);

        } catch (error) {
            throw new Error(error);
        }
    }

    async function updatedUser(user: User) {

        try {
            const userCollection = database.get<ModelUser>('users');
            await database.write(async () => {
                const userSelected = await  userCollection.find(user.id);
                await userSelected.update((userData) => {
                    userData.name = user.name,
                    userData.driver_license = user.driver_license,
                    userData.avatar = user.avatar
                });
            });

            setData(user);

        } catch (error) {
            throw new Error(error);
        }
        
    }

    // Reconectar no app caso o usuario exista na base de dados    
    useEffect(() => {
        async function loadUserData(){
            const userCollection = database.get<ModelUser>('users');
            const response = await userCollection.query().fetch();

            // console.log("#### USUARIO LOGADO ####");
            // console.log(response);
            if( response.length > 0 ) {
                // temos um usuario, o raw é onde está os dados
                // e vamos passar ele para User e use esse macete que força o uso para um valor
                // desconhecido 'unknown' para depois apropriar no User
                // Isso é para força uma tipagem
                const userData = response[0]._raw as unknown as User;
                api.defaults.headers.authorization = `Bearer ${userData.token}`;
                setData(userData);
            }
        }

        loadUserData();
    })

    return (
        <AuthContext.Provider
            value={{
                    user: data,
                    signIn,
                    signOut,
                    updatedUser
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}

// Criamos o hook para usar em qq rota
function useAuth(): AuthContextData {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };