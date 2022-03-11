import React, { useState, useEffect } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function CarouselSlider() {

    const [colIndex, setColIndex] = useState(0)



    const pfpCollection = [['/discord-chat/imgs/bayc.png', '/discord-chat/imgs/bayc3.png', '/discord-chat/imgs/bayc4.png', '/discord-chat/imgs/bayc5.png', '/discord-chat/imgs/bayc6.png', '/discord-chat/imgs/bayc7.png',],
    ['/discord-chat/imgs/doodles.png', '/discord-chat/imgs/doodles2.png', '/discord-chat/imgs/doodles3.png', '/discord-chat/imgs/doodles4.png', '/discord-chat/imgs/doodles5.png', '/discord-chat/imgs/doodles6.png',],
    ['/discord-chat/imgs/cc.png', '/discord-chat/imgs/cc2.png', '/discord-chat/imgs/cc3.png', '/discord-chat/imgs/cc4.png', '/discord-chat/imgs/cc5.png', '/discord-chat/imgs/cc6.png',],
    ['/discord-chat/imgs/cx.jpeg', '/discord-chat/imgs/cx2.jpeg', '/discord-chat/imgs/cx3.png', '/discord-chat/imgs/cx4.png', '/discord-chat/imgs/cx5.png', '/discord-chat/imgs/cx6.png',]
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

