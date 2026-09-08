import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AddGalleryImage from './AddGalleryImage'
import GalleryList from './adminlogin/GalleryList'
import toast from 'react-hot-toast'
import { connectGoogleDrive } from '../../api/gallaryApi'

const GalleryImage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    const googleDriveStatus = searchParams.get("googleDrive")
    if (!googleDriveStatus) return

    const toastKey = `admin-gallery-google-drive-${window.location.search}`
    if (sessionStorage.getItem(toastKey)) return

    sessionStorage.setItem(toastKey, "handled")

    if (googleDriveStatus === "connected") {
      toast.success("Google Drive connected successfully.")
    } else if (googleDriveStatus === "error") {
      toast.error(searchParams.get("message") || "Google Drive connection failed.")
    }

    navigate("/admin/gallery", { replace: true })
  }, [navigate, searchParams])

  const handleConnectGoogleDrive = async () => {
    setConnecting(true)
    try {
      const data = await connectGoogleDrive()
      const authorizationUrl = data?.authorizationUrl

      if (!authorizationUrl) {
        throw new Error("Missing Google Drive authorization URL.")
      }

      window.location.assign(authorizationUrl)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to connect Google Drive.")
    } finally {
      setConnecting(false)
    }
  }

  return (
    <div className='bg-blue-50'>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between p-4 md:p-6">
        <div>
          <h1 className="text-xl md:text-3xl font-semibold text-blue-900">Gallery</h1>
          <p className="text-sm text-blue-700 mt-1">
            Manage uploaded images and connect Google Drive for admin access.
          </p>
        </div>
        <button
          type="button"
          onClick={handleConnectGoogleDrive}
          disabled={connecting}
          className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${
            connecting
              ? "bg-emerald-500/70 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {connecting ? "Connecting..." : "Connect Google Drive"}
        </button>
      </div>
        <AddGalleryImage/>
        <GalleryList/>
    </div>
  )
}

export default GalleryImage
