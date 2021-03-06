import React from 'react'
import { COLOR } from '../../../enums'
import { useStore } from '../../../hooks'
import { styled } from '../../../theme'
import { Container, Heading, Icon } from '../../atoms'
import { Navigation, NewRepo, Profile } from '../../molecules'
import { Authorize } from '../../molecules/Authorize/Authorize'

const Style = styled.div`
  grid-area: sidebar;
  position: relative;
  flex: 0 0 auto;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background.tertiary};

  .Sidebar-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: ${({ theme }) => theme.spacing.s};
    height: 100%;
  }

  .Sidebar-title-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`

export function Sidebar() {
  const [state] = useStore()

  return (
    <Style>
      <Container className="Sidebar-wrapper">
        {state.user.isAuthorized ? <Profile /> : <Authorize />}
        <NewRepo />
        <div className="Sidebar-title-wrapper">
          <Icon icon="book" prefix="fa" marginRight />
          <Heading
            color={COLOR.DARK}
            className="category-heading"
            type="h4"
            textTransform="uppercase"
          >
            Repos
          </Heading>
        </div>
        {state.user.isAuthorized && state.user.username && <Navigation />}
      </Container>
    </Style>
  )
}
