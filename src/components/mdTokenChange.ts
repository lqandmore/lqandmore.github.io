import { h } from 'vue'
import { Token } from 'Tokens';
import { VNode } from 'vue';


export function mddivFactory (list: Token[]): VNode {
  const vnodes = tokenList2Vnodes(list)
  return h('div',vnodes)
}

function tokenList2Vnodes (list: Token[]): VNode[] {
  const children = []
  if (list.length === 0) return children

  list.forEach((token) => {
    const v = token2Vnode(token)
    children.push(v)
  })
  return children
}



function token2Vnode (token: Token): VNode {
  let children: VNode[]

  switch (token.type) {

    case 'space':
      return h('br')
    case 'code':
      return h('p', token.text)
    case "heading":
      children = tokenList2Vnodes(token.tokens)
      // const text = h(new Text(), token.text)
      // children.push(text)
      return h(`h${token.depth}`, children)
    case 'table':
      return h('p', token.raw)
    case 'hr':
      return h('p', token.raw)
    case 'blockquote':
      return h('br')
    case 'list':
      return h('p', token.raw)
    case 'list_item':
      return h('br')
    case 'paragraph':
      return h('p', token.text)
    case 'html':
      return h('html', token.text)
    case 'text':
      return token.text
    case 'def':
      return h('p', token.title)
    case 'escape':
      return h('br')
    case 'link':
      children = tokenList2Vnodes(token.tokens)
      return h('a', { href:token.href, title:token.title }, children)
    case 'image':
      return h('img', { src:token.href })
    case 'strong':
      return h('strong', token.text)
    case 'em':
      return h('p', token.text)
    case 'codespan':
      return h('p', token.text)
    case 'br':
      return h('br')
    case 'del':
      return h('delete', token.text)
    default:
      return h(`${token.type}`, token.raw)

  }
}
