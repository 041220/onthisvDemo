import React, { Children, useRef, useState, Color, useEffect } from 'react'
import { filterData, mockData } from './mock';
import './index.css'
import { useParams } from 'react-router';
import axios from 'axios';


const Content = ({ data, setData }) => {
    const scroll = useRef([])
    const { userId } = useParams()
    const onScroll = (index) => {
        window.scrollTo({
            top: scroll.current[index].offsetTop,
            behavior: "smooth",
        })
    }
    const addToRef = (el) => {
        if (el && !scroll.current.includes(el)) {
            scroll.current.push(el)
        }
    }
    const [change, setChange] = useState(false);
    const listenScrollEvent = () => {
        if (window.scrollY >= 10) {
            setChange(true)

        }
        else {
            setChange(false)

        }

    }
    useEffect(() => {
        window.addEventListener('scroll', listenScrollEvent)
        // return (
        //     window.removeEventListener('scroll', listenScrollEvent)

        // )

    }
        , [])


    // console.log('data test', data);
    // console.log('use ref', scroll)
    return (
        <>
            <div className='header-second'>
                <div className={`${change ? 'header-second-active' : 'header-second-bg'} word-panel`} >

                    {mockData.find((e1) => e1?.id === userId).dataPage.map((value, index) => {
                        return (
                            <div key={value.key} onClick={() => { onScroll(index) }} className='anphal-word'>
                                {value.name}
                            </div>
                        )
                    })}

                </div>
            </div>
            <div className='container'>
                <div className='content-center'>


                    <div className='documents'>
                        <div className='center-documents'>
                            {mockData?.find((e1) => e1?.id === userId)?.dataPage.filter(item1 => item1.name === data.charAt(0) || data === '').map(value => {
                                return (

                                    <div ref={addToRef} className='word-h2'>

                                        <div className='word-documents'>
                                            {value.name}
                                        </div>
                                        <div >

                                            {value.Children.filter(item2 => item2.name.toLowerCase().includes(data.toLowerCase()) || data === '').map(item => {
                                                return (
                                                    <div className='word-a' key={item.key}>
                                                        {item.name}

                                                    </div>

                                                )
                                            })}
                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Content;