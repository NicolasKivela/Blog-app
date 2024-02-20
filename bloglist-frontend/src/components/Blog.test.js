import React from 'react'
import { shallow } from 'enzyme'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


test('renders content', () => {
  const blog = {
    title: 'TESTI',
    author: 'TESTI',
    user:'',

  }
  render(<Blog blog={blog}/>)

  const element = screen.getAllByText('TESTI')

  expect(element).toBeDefined()
})

test('clicking the button show', async () => {
  const blog = {
    title: 'TESTI',
    author: 'author',
    user:'',
    url:'url',
    likes: 'likes'

  }

  render(
    <Blog blog={blog} />

  )
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const like = screen.getByText('likes')
  const authorElement = screen.getByText('author')
  const urlElement = screen.getByText('url')
  expect(like).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(urlElement).toBeDefined()
})

test('clicking the button 2', async () => {
  const blog = {
    title: 'TESTI',
    author: 'author',
    user:'',
    url:'url',
    likes: 0

  }

  const mockCallBack = jest.fn()
  render(
    <Blog blog={blog}/>

  )
  const user = userEvent.setup()
  const button = shallow((<button onClick={mockCallBack}>Like</button>))
  await user.click(button)

  expect(mockCallBack.mock.calls.lenght).toEqual(1)

})

