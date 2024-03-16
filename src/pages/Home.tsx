import { useNavigate } from "react-router-dom";

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import { Button } from '../components/Button'

import { useAuth } from "../hooks/UseAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";

import '../styles/auth.scss'

export function Home() {
    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('')
    
    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        navigate('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists')
            return;
        }

        if (roomRef.val().endedAt) {
            alert('Room already closed')
            return;
        }

        navigate(`/rooms/${roomCode}`)
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
                    <form action="" onSubmit={handleJoinRoom}>
                        <input 
                            type="text"
                            placeholder='Digite o codigo da sala'
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
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