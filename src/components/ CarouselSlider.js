import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CarouselSlider() {

    const [colIndex, setColIndex] = useState(0)



    const pfpCollection = [['/almost-discord/imgs/bayc.png', '/almost-discord/imgs/bayc3.png', '/almost-discord/imgs/bayc4.png', '/almost-discord/imgs/bayc5.png', '/almost-discord/imgs/bayc6.png', '/almost-discord/imgs/bayc7.png',],
    ['/almost-discord/imgs/doodles.png', '/almost-discord/imgs/doodles2.png', '/almost-discord/imgs/doodles3.png', '/almost-discord/imgs/doodles4.png', '/almost-discord/imgs/doodles5.png', '/almost-discord/imgs/doodles6.png',],
    ['/almost-discord/imgs/cc.png', '/almost-discord/imgs/cc2.png', '/almost-discord/imgs/cc3.png', '/almost-discord/imgs/cc4.png', '/almost-discord/imgs/cc5.png', '/almost-discord/imgs/cc6.png',],
    ['/almost-discord/imgs/cx.jpeg', '/almost-discord/imgs/cx2.jpeg', '/almost-discord/imgs/cx3.png', '/almost-discord/imgs/cx4.png', '/almost-discord/imgs/cx5.png', '/almost-discord/imgs/cx6.png',]
    ]

    const [activeImage, setActiveImage] = useState(pfpCollection[0][0])


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
        localStorage.setItem("pfp", activeImage)
    }, [activeImage])

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

