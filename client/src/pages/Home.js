import { Link } from 'react-router-dom'
import '../assets/styles/stylesheet.css'

export default function Home() {
    return (
        <div>
            <div className="d-grid fuild-container text-start text-light p-5" id="section-1">
                <div className="row m-0">
                    <header className="col-12 fs-2 fw-bold">DSATM</header>
                    <section className="fuild-container col-5">
                        <header className="heading fw-bolder lh-1">College Printing Shop</header>
                        <p className="fs-4 my-5">
                            Get all your printing needs fulfilled at our college printing shop. We offer high-quality printing services for students, faculty, and staff.
                        </p>
                        <a href="#section-2" className="button py-3 px-5 rounded-pill fw-bold fs-5 text-light">Place your order</a>
                    </section>
                </div>
            </div>
            <div className="fuild-container text-start p-5 d-grid" id="section-2">
                <div className="row m-0">
                    <section className="col-6 d-flex flex-column justify-content-center align-items-start pe-5">
                        <header className="heading fw-bolder lh-1">Upload a File</header>
                        <p className="fs-4 my-5">
                            Easily upload your files and provide instructions for your printing job
                        </p>
                        <Link to='/upload' className="button py-3 px-5 rounded-pill text-light fw-bold fs-5">Upload Now</Link>
                    </section>
                    <aside className="col-6"></aside>
                </div>
            </div>
        </div>
    )
}
