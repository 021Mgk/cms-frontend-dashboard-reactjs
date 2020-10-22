import React, { useRef, useEffect } from 'react';

export default function Scroll() {
    const refs1 = useRef()
    const refs2 = useRef()
    const refs3 = useRef()
    const refs4 = useRef()
    const refs5 = useRef()
    const scrollToRef = (ref) => {
        //scroll({ behavior: "smooth" })

        window.scrollTo(0, ref.current.offsetTop)
        //scrollToRef(ref)
    }

    const addClassToElement = () => {
        if (window.pageYOffset + 200 >= refs4.current.offsetTop) {
            document.getElementById("s4").classList.add("mj")
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', addClassToElement);
        return () => {
            window.removeEventListener('scroll', addClassToElement)
        }
    }, []);


    return (
        <div>
            <div className="level1">
                <div className="s1" ref={refs1} id="s1">
                    <button onClick={() => scrollToRef(refs2)}> goooo</button>
                </div>
                <div className="s11"></div>
            </div>

            <div className="level2">
                <div className="s22"></div>
                <div className="s2" ref={refs2} id="s2">
                    <button onClick={() => scrollToRef(refs3)}> goooo</button>
                </div>
            </div>


            <div className="level3">
                <div className="s3" ref={refs3} id="s3">
                    <button onClick={() => scrollToRef(refs4)}> goooo</button>
                </div>
                <div className="s33"></div>
            </div>



            <div className="level4">
                <div className="s44"></div>
                <div className="s4" ref={refs4} id="s4">
                    <button onClick={() => scrollToRef(refs5)}> goooo</button>
                </div>
            </div>




            <div className="s5" ref={refs5} id="s5">
                <button onClick={() => scrollToRef(refs1)}> goooo</button>
            </div>

        </div>
    )
}
