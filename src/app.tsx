import { useState, ChangeEvent } from 'react'

import logo from './assets/logo-nlw-expert.svg'

import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'
import { toast } from 'sonner'

type Props = {
  id: string
  content: string
  createdAt: Date
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Props[]>(() => {
    const notesOnStorage = localStorage.getItem('@nlw-expert-v1-notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      content,
      createdAt: new Date(),
    }

    setNotes((prevNotes) => {
      return [newNote, ...prevNotes]
    })

    localStorage.setItem(
      '@nlw-expert-v1-notes',
      JSON.stringify([newNote, ...notes]),
    )
  }

  function onNoteDeleted(id: string) {
    setNotes((prevNotes) => {
      return prevNotes?.filter((note) => note.id !== id)
    })

    localStorage.setItem(
      '@nlw-expert-v1-notes',
      JSON.stringify(notes?.filter((note) => note.id !== id)),
    )

    toast.success('Nota deletada com sucesso!')
  }

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    const query = e.target.value

    setSearch(query)
  }

  const filteredNotes = notes?.filter((note) => {
    return note.content.toLowerCase().includes(search.toLowerCase()) || !search
  })

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-slate-500 outline-none"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 auto-rows-card">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes?.map((note) => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} />
        ))}
      </div>
    </div>
  )
}
