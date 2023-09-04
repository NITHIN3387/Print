import '../assets/styles/stylesheet.css'
import { useEffect, useState } from "react"
import UploadFiles from '../components/UploadFiles'

export default function Upload() {
    const [uploadFileNumber, setUploadFileNumber] = useState([])
    const [USN, setUSN] = useState('1DT')
    const [cost, setCost] = useState(0)
    const [collections, setCollections] = useState([])

    function handleFileUploadCount(count) {
        const countArray = []

        if (count < 0 || count > 5) {
            alert("you can upload upto 5 files only at a time")
            if (count < 0) { count = 1 }
            if (count > 5) { count = 5 }
        }

        for (let i = 1; i <= count; i++) {
            countArray.push(i)
        }
        setUploadFileNumber(countArray)
    }

    function pushCollection(index, collection) {
        setCollections((data) => {
            let tempCollections = [...data]
            tempCollections[index] = collection
            return tempCollections
        })
    }

    async function handleSendFiles() {
        // console.log(collections);
        let formData = new FormData()

        formData.append('USN', USN)
        formData.append('pageToPrint', collections[0]['page-to-print'])
        formData.append('colorPrintPage', collections[0]['page-with-color'])
        formData.append('copyCount', collections[0]['number-of-copy'])
        formData.append('softBind', collections[0]['soft-bind'])
        formData.append('bactToback', collections[0]['back-to-back'])
        formData.append('description', collections[0]['description'])
        formData.append('file', collections[0]['file'])

        await fetch('http://localhost:5000/upload/upload-file', {
            method: 'POST',
            body: formData
        })
    }

    useEffect(() => {
        let tempCost = 0
        if (Object.keys(collections).length) {
            for (let i = 0; i < Object.keys(collections).length; i++) {
                tempCost += collections[i].cost
            }
        }
        setCost(tempCost)
    }, [collections])

    return (
        <div className="fluid-container p-5 fw-bold">
            <div className="row">
                <div className="col-12 fs-2 mb-5">Upload Your Files</div>
            </div>
            <div className="input-group mb-2 row">
                <label className="col-12 fs-5 my-2" htmlFor="input-usn">Enter Your USN:</label>
                <input type="text" className="form-control mb-4" id="input-usn" defaultValue="1DT" onChange={(e) => setUSN(e.target.value)} />
            </div>
            <div className="input-group mb-3 row">
                <label className="col-12 fs-5 my-2" htmlFor="input-number">How many files do you want to upload:</label>
                <input type="number" className="form-control mb-4" id="input-number" onChange={(e) => handleFileUploadCount(e.target.value)} />
            </div>
            {
                uploadFileNumber.map((ele) => (
                    <div key={ele}>
                        <UploadFiles file={ele} collection={(data) => pushCollection(ele - 1, data)} temp={collections} />
                    </div>
                ))
            }
            <div className='row'>
                <div className="col-12">
                    <span className='me-2'>TOTAL COST: </span>
                    <span className='fs-3'> {cost.toString().includes('.') ? `₹ ${cost.toFixed(2)}` : `₹ ${cost}.00`}</span>
                </div>
            </div>
            <div className="row">
                <span className="col-2 button py-3 text-center rounded-pill text-light fw-bold my-3" onClick={handleSendFiles}>Send Now</span>
            </div>
        </div>
    )
}