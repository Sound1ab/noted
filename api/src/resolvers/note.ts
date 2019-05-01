import { getConnection } from 'typeorm'
import { Note } from '../entities/Note'
import { Notebook } from '../entities/Notebook'
import { calculateNextOffset, configureRepository } from '../helpers'
import {
  MutationCreateNoteArgs,
  MutationDeleteNoteArgs,
  MutationUpdateNoteArgs,
  QueryListNotesArgs,
  QueryReadNoteArgs,
} from '../resolvers-types'

export async function NoteQueries() {
  return {
    listNotes: await configureRepository<Note, QueryListNotesArgs>(
      Note,
      async (repository, { filter, limit, offset }) => {
        const query = repository
          .createQueryBuilder('note')
          .innerJoinAndSelect('note.notebook', 'notebook')

        if (filter && filter.notebookId) {
          query.where('notebook.id = :id', { id: filter.notebookId.eq })
        }

        if (limit) {
          query.take(limit)
        }

        if (offset) {
          query.skip(offset)
        }

        const results = await query.getMany()

        return {
          items: results,
          nextOffset: calculateNextOffset(limit, offset),
        }
      }
    ),
    readNote: await configureRepository<Note, QueryReadNoteArgs>(
      Note,
      async (repository, { id }) => {
        return await repository.findOne({
          relations: ['notebook', 'notebook.user'],
          where: { id },
        })
      }
    ),
  }
}

export async function NoteMutations() {
  return {
    createNote: await configureRepository<Note, MutationCreateNoteArgs>(
      Note,
      async (
        repository,
        { input: { title, excerpt, markdown, notebookId } }
      ) => {
        const notebookRepository = await getConnection().getRepository(Notebook)
        const notebook = await notebookRepository.findOne(notebookId)
        if (!notebook) return null

        const note = new Note()
        note.title = title
        note.excerpt = excerpt
        note.markdown = markdown
        note.notebook = notebook

        return await repository.save(note)
      }
    ),
    deleteNote: await configureRepository<Note, MutationDeleteNoteArgs>(
      Note,
      async (repository, { input: { id } }) => {
        if (!id) return null
        const note = await repository.findOne(id)
        if (!note) return null

        return repository.remove(note)
      }
    ),
    updateNote: await configureRepository<Note, MutationUpdateNoteArgs>(
      Note,
      async (repository, { input: { id, title, excerpt, markdown } }) => {
        const note = await repository.findOne(id)
        if (!note) return null
        note.title = title || note.title
        note.excerpt = excerpt || note.excerpt
        note.markdown = markdown || note.markdown

        return repository.save(note)
      }
    ),
  }
}