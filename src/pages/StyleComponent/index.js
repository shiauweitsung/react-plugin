import styled from 'styled-components'
import rwd from './rwd'

const Title = styled.h1`
  
  text-align: center;
  color: palevioletred;
  @media (max-width:${rwd.desktop}){
    font-size: 1.5em;
  }
  @media (max-width:${rwd.mobile}){
    font-size: 1em;
  }
`

const Link = styled.a`
    color: blue;
    font-size: 1.2em;
`

export default function StyleComponent () {
  return (
        <div>
            <Title>
                StyleComponent 組件
            </Title>
            <Link
                href="https://styled-components.com/docs/basics#"
                target="_blank"
            >
                document
            </Link>
        </div>
  )
}
