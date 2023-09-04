import { useEffect, useState } from "react"

export default function UploadFiles(props) {
    const [uploadFile, setUploadFile] = useState([])
    const [pageToPrint, setPageToPrint] = useState('')
    const [count, setCount] = useState(0)
    const [colorPages, setColorPages] = useState('0')
    const [copyCount, setCopyCount] = useState(1)
    const [softBind, setSoftBind] = useState(false)
    const [backToBack, setBackToBack] = useState(false)
    const [description, setDescription] = useState('')
    const [cost, setCost] = useState(0)

    function handlePageCount(count) {
        setPageToPrint(count)
        if (count.toLowerCase() === 'all') {
            var reader = new FileReader();
            reader.readAsBinaryString(uploadFile);
            reader.onloadend = function () {
                var count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
                setCount(count)
            }
        } else {
            if (count.includes('-')) {
                let tempCount = 0
                try {
                    count = count.split(',')
                    count = count.map((ele) => (ele.split('-')))
                    count.forEach((ele) => {
                        if (ele[0] !== '' && ele[1] !== '') {
                            tempCount += (Math.abs(ele[0].toString() - ele[1].toString()) + 1)
                        }
                    })
                    console.log(count);
                    setCount(tempCount)
                } catch {
                    setCount(tempCount)
                }

            } else {
                setCount(0)
            }
        }
    }

    useEffect(() => {
        let colorPageCount = colorPages.toLowerCase().split(',').includes('all') ? count : 
                                colorPages.split(',').includes('0') || colorPages === '' ? 0: 
                                    colorPages.split(',').includes('') || colorPages.split(',').includes(' ')? colorPages.split(',').length - 1 :
                                        colorPages.split(',').length
        let bwPageCount = count - colorPageCount
        let totalCost = 0

        totalCost = colorPageCount * 5 + bwPageCount

        if (backToBack) totalCost /= 2
        if (softBind) totalCost += 15

        setCost(copyCount !== '' ? totalCost * copyCount : totalCost)

        props.collection({
            "index": props.file,
            "file": uploadFile,
            "page-to-print": pageToPrint,
            "page-with-color": colorPages,
            "number-of-copy": copyCount,
            "soft-bind": softBind,
            "back-to-back": backToBack,
            "description": description,
            "cost": cost
        })
    }, [count, colorPages, softBind, backToBack, copyCount, description, uploadFile, cost, pageToPrint])

    return (
        <div className="input-group mb-5 row">
            <div className="fs-4 text-decoration-underline col-12">Document {props.file}:</div>
            <div className="input-group col-12 ms-4">
                <label className="fs-5 my-2 w-100" htmlFor="input-file">Choose your file:</label>
                <input type="file" className="form-control" id="input-file" name={`file-${props.file}`} onChange={(e) => setUploadFile(e.target.files[0])} accept='.pdf' />
            </div>
            <div className="input-group col-12 ms-4">
                <label className="fs-5 my-2 w-100" htmlFor="input-file-range">Enter the page numbers from which page to page you want to print:</label>
                <input type="text" className="form-control" id="input-file-range" placeholder="'ALL' for all page, for custom print (eg: 1-2, 4-5, 10-20)" onChange={(e) => handlePageCount(e.target.value)} />
            </div>
            <div className="col-12 ms-4 my-3">
                <div className="fw-normal">Number of pages in the uploaded PDF: {count}</div>
            </div>
            <div className="input-group col-12 ms-4">
                <label className="fs-5 my-2 w-100" htmlFor="input-file">Enter the page numbers which you want colour print:</label>
                <input type="text" className="form-control" id="input-file" onChange={(e) => setColorPages(e.target.value)} placeholder="0 for no page, 'ALL' for all page, for indusual page enter page number (eg: 1, 2, 3)" />
            </div>
            <div className="ms-4 col-7 d-flex mt-5">
                <label className="fs-5 me-3 col-3" htmlFor="input-copy-number">Number of Copies:</label>
                <input type="number" className="form-control mb-4" id="input-copy-number" onChange={(e) => setCopyCount(e.target.value)} />
            </div>
            <div className="form-check col-2 ms-4 mt-5">
                <input className="form-check-input" type="checkbox" id="soft-bind" onChange={(e) => setSoftBind(e.target.checked)} />
                <label className="form-check-label fs-5" htmlFor="soft-bind">
                    Soft Bind Required
                </label>
            </div>
            <div className="form-check col-2 ms-4 mt-5">
                <input className="form-check-input" type="checkbox" id="soft-bind" onChange={(e) => setBackToBack(e.target.checked)} />
                <label className="form-check-label fs-5" htmlFor="soft-bind">
                    Back to Back print
                </label>
            </div>
            <div className="mb-3 ms-4">
                <label htmlFor="description" className="form-label fs-5">Description:</label>
                <textarea className="form-control" id="description" rows="3" onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
        </div>
    )
}
