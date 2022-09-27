import React, { useEffect, useState, useRef } from 'react'
import { BrowserQRCodeReader } from '@zxing/browser'

export default function ScanQrCode () {
  const [data, setData] = useState('No result')
  const videoRef = useRef(null)
  const controlRef = useRef(null)

  useEffect(() => {
    console.log(data, 'data')
  }, [data])

  return (
        <div>
            <button onClick={async () => {
              const codeReader = new BrowserQRCodeReader()
              codeReader.decodeFromVideoDevice(
                undefined,
                videoRef.current,
                (result, error, controls) => {
                  // use the result and error values to choose your actions
                  // you can also use controls API in this scope like the controls
                  // returned from the method.
                  controlRef.current = controls
                  if (error) {
                    return
                  }
                  if (result) {
                    setData(result.text)
                    console.log(result, controls)
                    controls.stop()
                  }
                  controlRef.current = controls
                })
            }}>
                Barcode scan
            </button>
            <button onClick={() => {
              if (controlRef.current) {
                controlRef.current.stop()
                controlRef.current = null
              }
            }}>
                reset
            </button>
            <video
                style={{ maxWidth: '200px', maxHeight: '200px', height: '200px' }}
                ref={videoRef}
            />
            <p>scan result : {data}</p>
        </div>
  )
}
