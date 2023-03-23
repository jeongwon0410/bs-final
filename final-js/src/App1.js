import { useState } from 'react'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

import { storage } from '@components/atoms/firebase'
import { useEffect } from 'react'

const App = () => {
  const [files, setFileList] = useState([]) // 파일 리스트
  const [isUploading, setUploading] = useState(false) // 업로드 상태
  const [photoURL, setPhotosURL] = useState([]) // 업로드 완료된 사진 링크들
  const [url, setUrl] = useState() // 업로드 진행상태

  // 파일 선택시 파일리스트 상태 변경해주는 함수
  const handleImageChange = (e) => {
    for (const image of e.target.files) {
      setFileList((prevState) => [...prevState, image])
    }
  }

  useEffect(() => {
    getDownloadURL(ref(storage, '1.png'))
      .then((url) => {
        setUrl(url)
        // // `url` is the download URL for 'images/stars.jpg'
        // // This can be downloaded directly:
        // const xhr = new XMLHttpRequest()
        // xhr.responseType = 'blob'
        // xhr.onload = (event) => {
        //   const blob = xhr.response
        // }
        // xhr.open('GET', url)
        // xhr.send()
        // // Or inserted into an <img> element
        // const img = document.getElementById('myimg')
        // img.setAttribute('src', url)
      })
      .catch((error) => {
        // Handle any errors
      })
  }, [])

  return (
    <div>
      <form>
        {/* rc-progress의 Line 컴포넌트로 파일 업로드 상태 표시 */}
        {/* <Line percent={progress} strokeWidth={4} strokeColor="#ff567a" /> */}
        <label>
          파일:
          <input
            multiple
            accept="image/*"
            type="file"
            onChange={handleImageChange}
          />
        </label>
        <button type="submit">{isUploading ? '업로드중...' : '업로드'}</button>
      </form>
      {photoURL?.length > 0 && (
        <ul>
          {photoURL.map((url, index) => (
            <li key={index}>
              <img src={url} alt="사용자 첨부 이미지" />
            </li>
          ))}
        </ul>
      )}
      <img src={url} alt="사용자 첨부 이미지" />
    </div>
  )
}

export default App
