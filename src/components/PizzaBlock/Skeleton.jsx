import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = () => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={260}
    height={460}
    viewBox='0 0 260 460'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'>
    <circle cx='120' cy='120' r='120' />
    <rect x='20' y='270' rx='5' ry='5' width='220' height='20' />
    <rect x='0' y='315' rx='5' ry='5' width='280' height='88' />
    <rect x='0' y='420' rx='10' ry='10' width='110' height='35' />
    <rect x='130' y='420' rx='15' ry='15' width='130' height='40' />
  </ContentLoader>
)

export default Skeleton
