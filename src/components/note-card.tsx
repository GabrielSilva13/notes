import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

type Props = {
  note: {
    id: string
    createdAt: Date
    content: string
  }
  onNoteDeleted: (id: string) => void
}

export const NoteCard: React.FC<Props> = ({ note, onNoteDeleted }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md text-left bg-slate-800 p-5 gap-3 relative overflow-hidden flex flex-col outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 transition-all">
        {formatDistanceToNow(note.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
        <p className="text-sm leading-6 text-slate-400">{note.content}</p>

        <div className="absolute bottom-0 left-0 right-0 h-2/4 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/30" />
        <Dialog.Content className="fixed inset-0 md:inset-auto md:left-2/4 md:top-2/4 md:-translate-x-2/4 md:-translate-y-2/4 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute hover:text-slate-100 transition-colors right-1.5 top-1.5 bg-slate-800 p-1.5 text-slate-400">
            <X className="size-5" />
          </Dialog.Close>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <span className="text-sm font-medium text-slate-300">
              {formatDistanceToNow(note.createdAt, {
                locale: ptBR,
                addSuffix: true,
              })}
            </span>
            <p className="text-sm leading-6 text-slate-400">{note.content}</p>
          </div>

          <button
            type="button"
            className="w-full bg-slate-800 font-medium md:rounded-b-md py-4 text-center text-sm group text-slate-300 outline-none focus-visible:ring-2 focus-visible:ring-lime-400"
            onClick={() => onNoteDeleted(note.id)}
          >
            Deseja{' '}
            <span className="text-red-400 group-hover:underline">
              apagar essa nota
            </span>
            ?
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
