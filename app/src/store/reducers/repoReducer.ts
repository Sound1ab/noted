import {
  REPO_ACTIONS,
  TRepoActions,
  TReturnOfActiveFile,
  TReturnOfActiveRepo,
  TReturnOfResetRepo,
} from '..'
import {
  File,
  Repo,
} from '../../components/apollo/generated_components_typings'

const emptyFile: File = {
  _links: {
    html: '',
  },
  content: '',
  excerpt: '',
  filename: '',
  path: '',
  sha: '',
}

const emptyRepo: Repo = {
  description: '',
  full_name: '',
  id: 0,
  name: '',
  node_id: '',
}

export const initialRepoState = {
  activeFile: emptyFile,
  activeRepo: emptyRepo,
}

export function repoReducer(
  state: typeof initialRepoState,
  action: TRepoActions
) {
  switch (action.type) {
    case REPO_ACTIONS.ACTIVE_FILE:
      return {
        ...state,
        activeFile: (action as TReturnOfActiveFile).payload.file,
      }
    case REPO_ACTIONS.ACTIVE_REPO:
      return {
        ...state,
        activeRepo: (action as TReturnOfActiveRepo).payload.repo,
      }
    case REPO_ACTIONS.RESET_REPO:
      const { repo, file } = (action as TReturnOfResetRepo).payload
      if ((repo && file) || (!repo && !file)) {
        return initialRepoState
      }
      if (repo) {
        return {
          ...state,
          activeRepo: emptyRepo,
        }
      }
      if (file) {
        return {
          ...state,
          activeFile: emptyFile,
        }
      }
      break
    default:
      return state
  }
}
