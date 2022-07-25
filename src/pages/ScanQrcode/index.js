import { useEffect, useState, useRef } from 'react';
import { QrReader } from 'react-qr-reader';
// import QrReader from 'react-qr-scanner';
import { BrowserQRCodeReader } from "@zxing/library";

const previewStyle = {
    height: 240,
    width: 320,
}
const codeReader = new BrowserQRCodeReader();
console.log(codeReader);

function QRCodeReader({ onResult }) {
    const lastResult = useRef()

    const onReadResult = (result, error) => {
        if (!result) return;
        if (lastResult.current === result.text) {
            return
        }
        lastResult.current = result.text;
        onResult(result.text);
    };

    useEffect(() => {
        console.log('load scan');
        return () => {
            console.log('scan close');
        }
    }, [])

    return (
        <QrReader onResult={onReadResult} style={{ width: '300px', height: '100px' }} />
    )
}


export default function ScanQrCode() {

    const [data, setData] = useState('No result');
    const [qrShow, QrShow] = useState(false);
    const [shouldRender, setShouldRender] = useState(false)
    const lastResult = useRef();
    const videoRef = useRef(null)
    const controlRef = useRef(null);

    useEffect(() => {
        console.log(data, 'data');
    }, [data])

    const handleScan = (result) => {
        console.log(result, 'handle scan');
        if (!result) return;

        if (lastResult.current === result.text) {
            return
        }

        lastResult.current = result.text;
        setData(result.text);
    }
    const handleError = (err) => {
        console.error(err, 'handle error')
    }

    useEffect(() => {
        console.log(controlRef, 'controlRef');
    }, [controlRef])

    return (
        <div>
            <button onClick={async () => {
                const codeReader = new BrowserQRCodeReader();
                codeReader.decodeFromVideoDevice(
                    undefined,
                    videoRef.current,
                    (result, error, controls) => {
                        // use the result and error values to choose your actions
                        // you can also use controls API in this scope like the controls
                        // returned from the method.
                        // console.log(result, error, controls);
                        if (error) {
                            return
                        }
                        if (result) {
                            setData(result.text);
                            console.log(result, controls);
                        }
                        controlRef.current = controls
                    });
            }}>
                Barcode scan
            </button>
            <button onClick={() => {
                const codeReader = new BrowserQRCodeReader();
                console.log(codeReader, 'codeReader');
                console.log(controlRef, 'controlRef');
                codeReader.reset();
                codeReader.stopAsyncDecode();
                codeReader.stopStreams();
                codeReader.stopContinuousDecode();
                console.log(videoRef, 'videoRef');
                videoRef.current = null
            }}>
                check ref
            </button>
            <video
                style={{ maxWidth: "200px", maxHeight: "200px", height: "200px" }}
                ref={videoRef}
            />
            <button
                onClick={() => {
                    QrShow(!qrShow);
                }}
            >
                打開相機
            </button>
            {qrShow && (
                <QrReader
                    className='qr-container'
                    onResult={(result, error) => {
                        // console.log(result, error);
                        // if (!!result) {
                        //     setData(result?.text);
                        // }
                        if (!qrShow) {
                            return
                        }
                        if (!result) return;

                        if (lastResult.current === result.text) {
                            return
                        }

                        lastResult.current = result.text;
                        setData(result.text);
                    }}
                    scanDelay={200}
                    style={{ width: '300px', height: '100px' }}
                />
            )}
            <p>{data}</p>
            {shouldRender && <QRCodeReader onResult={setData} />}
            <button onClick={() => setShouldRender(!shouldRender)}>
                Render QR Reader
            </button>
            {/* <QrReader
                delay={100}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
                onLoad={(load) => {
                    console.log(load, 'load');
                }}
            /> */}
            <p>{data}</p>
        </div>
    )
}

