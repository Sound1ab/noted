import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faSoundcloud } from '@fortawesome/free-brands-svg-icons'
import {
  faBook,
  faChevronDown,
  faChevronRight,
  faComment,
  faEllipsisH,
  faEnvelope,
  faExternalLinkAlt,
  faGripLinesVertical,
  faMoon,
  faPenSquare,
  faPlusCircle,
  faSync,
  faTimes,
  faTrash,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import React, { ReactNode } from 'react'

library.add(
  faGithub as any,
  faSoundcloud as any,
  faEnvelope,
  faUser,
  faMoon,
  faComment,
  faPenSquare,
  faBook,
  faPlusCircle,
  faSync,
  faTrash,
  faTimes,
  faExternalLinkAlt,
  faChevronRight,
  faChevronDown,
  faEllipsisH,
  faGripLinesVertical
)

interface IIconProvider {
  children?: ReactNode
}

export function IconProvider({ children }: IIconProvider) {
  return <>{children}</>
}
