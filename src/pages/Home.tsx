import { useNavigate } from "react-router-dom";

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from "../hooks/UseAuth";

export function Home() {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth()
    
    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        navigate('/rooms/new')
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire duvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="Let Me Ask For You" />
                    <button onClick={handleCreateRoom} className='create-room'>
                        <img src={googleIconImg} alt="" />
                        Crie sua sala com o google
                    </button>
                    <div className='separator'>Ou entre em uma sala</div>
                    <form action="">
                        <input 
                            type="text"
                            placeholder='Digite o codigo da sala'
                        />
                        <Button type='submit'>
                            Entre na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}