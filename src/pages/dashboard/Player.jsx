import Video from '@/components/player/Video'
import React from 'react'
import { useLocation } from 'react-router-dom'

export function Player() {
  const page = useLocation()
  // console.log(page.state)
  return (
    <Video videoLink={page.state} />
  )
}

export default Player