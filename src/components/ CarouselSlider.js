import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CarouselSlider({ }) {

    const [activeImage, setActiveImage] = useState()
    const [imageIndex, setImageIndex] = useState(0)
    const [colIndex, setColIndex] = useState(0)
    const [indexes, setIndexes] = useState({
        image: 0,
        col: 0,
    })



    const pfpCollection = [['/imgs/bayc.png', '/imgs/bayc3.png', '/imgs/bayc4.png', '/imgs/bayc5.png', '/imgs/bayc6.png', '/imgs/bayc7.png',],
    ['/imgs/doodles.png', '/imgs/doodles2.png', '/imgs/doodles3.png', '/imgs/doodles4.png', '/imgs/doodles5.png', '/imgs/doodles6.png',],
    ['imgs/cc.png', 'imgs/cc2.png', 'imgs/cc3.png', 'imgs/cc4.png', 'imgs/cc5.png', 'imgs/cc6.png',],
    ['imgs/cx.jpeg', 'imgs/cx2.jpeg', 'imgs/cx3.png', 'imgs/cx4.png', 'imgs/cx5.png', 'imgs/cx6.png',]
    ]
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 0 },
            items: 1
        }
    };




    const colClick = (index) => {
        setColIndex(index)
    }

    useEffect(() => {
        setIndexes({ image: imageIndex, col: colIndex })
        setIndexes((prevState) => {
            const newIndexes = { ...prevState, image: imageIndex, col: colIndex }
            localStorage.setItem("pfp", pfpCollection[newIndexes.col][newIndexes.image])
        })
    }, [imageIndex, colIndex])

    const pfpClick = (index) => {
        setActiveImage(pfpCollection[colIndex][index])
    }

    return (
        <div>
            <Carousel
                swipeable={false}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true}
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >


                {pfpCollection.map((col, index) => {
                    return <div onMouseEnter={() => colClick(index)} className='flex flex-wrap justify-center align-middle my-4'>
                        {col.map((item, index) => {
                            return (

                                <div key={index} className='image-div'>
                                    <img onClick={() => pfpClick(index)}
                                        className={`pfp ${activeImage === item ? 'active' : 'inactive'}`} src={item} alt="" />
                                </div>
                            )
                        })}
                    </div>
                })
                }
            </Carousel>
        </div>
    )
}

