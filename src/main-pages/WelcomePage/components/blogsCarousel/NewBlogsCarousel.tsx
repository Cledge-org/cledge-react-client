import { GetServerSidePropsContext } from 'next'
import React from 'react'
import { Carousel } from 'react-bootstrap'
import BlogCaroselItem from 'src/main-pages/WelcomePage/components/blogsCarousel/components/BlogCaroselItem'
import styles from './styles.module.scss'
function NewBlogsCarousel() {
  return (
    <div className={styles.mainContainer}>
      <h1>Get started with our free expert-written blogs</h1>
      <BlogCaroselItem image={"loll"} title="how to get into harvard?" />
    </div>
  )
}

export default NewBlogsCarousel