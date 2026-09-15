import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AddGalleryImage from './AddGalleryImage'
import GalleryList from './adminlogin/GalleryList'
import toast from 'react-hot-toast'
import { connectGoogleDrive, completeGoogleDrive, getGoogleDriveStatus } from '../../api/gallaryApi'

const DRIVE_STATE_KEY = 'admin-gallery-drive-state'
const driveErrorMessage = (error) => error.response?.data?.message || (error.response?.status === 404
  ? 'Google Drive is unavailable. Please update the gallery backend.'
  : error.message || 'Failed to connect Google Drive.')

const GalleryImage = () => {
  const navigate = useNavigate()
  const [connecting, setConnecting] = useState(false)
  const [driveConnected, setDriveConnected] = useState(false)
  const [checkingDrive, setCheckingDrive] = useState(true)
  const [driveError, setDriveError] = useState('')
  const initialized = useRef(false)

  const handleDriveError = useCallback((error) => {
    if (error.code === 'ADMIN_LOGIN_REQUIRED' || error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      localStorage.removeItem('adminLoginAt')
      sessionStorage.removeItem(DRIVE_STATE_KEY)
      toast.error('Please log in again', { id: 'admin-drive-login-required' })
      navigate('/adminlogin', { replace: true })
      return
    }
    setDriveError(driveErrorMessage(error))
  }, [navigate])

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const initialize = async () => {
      const callback = new URLSearchParams(window.location.hash.slice(1))
      const isCallback = callback.get('googleDrive') === 'callback'
      try {
        if (isCallback) {
          const state = callback.get('state')
          const expectedState = sessionStorage.getItem(DRIVE_STATE_KEY)
          sessionStorage.removeItem(DRIVE_STATE_KEY)
          navigate('/admin/gallery', { replace: true })
          if (!state || state !== expectedState) throw new Error('Connection session expired. Please connect Google Drive again.')
          if (callback.get('error')) throw new Error('Google Drive connection was cancelled or denied.')
          const data = await completeGoogleDrive(callback.get('code'), state)
          setDriveConnected(Boolean(data.connected))
          toast.success('Google Drive connected. New images will be saved in TechnovaHub Gallery.')
        } else {
          const data = await getGoogleDriveStatus()
          setDriveConnected(Boolean(data.connected))
        }
      } catch (error) {
        handleDriveError(error)
      } finally {
        setCheckingDrive(false)
      }
    }
    initialize()
  }, [navigate, handleDriveError])

  const handleConnectGoogleDrive = async () => {
    setConnecting(true)
    setDriveError('')
    try {
      const data = await connectGoogleDrive()
      const authorizationUrl = data?.authUrl || data?.authorizationUrl

      if (!authorizationUrl) {
        throw new Error("Missing Google Drive authorization URL.")
      }

      const url = new URL(authorizationUrl)
      if (url.origin !== 'https://accounts.google.com') throw new Error('Invalid Google authorization URL.')
      // Some backends include state only in the OAuth URL.
      const state = data.state || url.searchParams.get('state')
      sessionStorage.removeItem(DRIVE_STATE_KEY)
      if (state) sessionStorage.setItem(DRIVE_STATE_KEY, state)
      window.location.assign(url.href)
    } catch (error) {
      handleDriveError(error)
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
            New images are saved in your connected Google Drive, in the TechnovaHub Gallery folder.
          </p>
        </div>
        <button
          type="button"
          onClick={handleConnectGoogleDrive}
          disabled={connecting || checkingDrive}
          className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${
            connecting
              ? "bg-emerald-500/70 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {checkingDrive ? 'Checking Google Drive...' : connecting ? "Connecting..." : driveConnected ? 'Reconnect Google Drive' : "Connect Google Drive"}
        </button>
      </div>
        <div className="px-4 md:px-6" role="status">
          {driveError ? <p className="text-sm text-red-700">{driveError}</p> : !checkingDrive && (
            <p className="text-sm text-blue-800">{driveConnected ? 'Google Drive connected. Ready to upload.' : 'Connect Google Drive to upload images.'}</p>
          )}
        </div>
        <AddGalleryImage driveConnected={driveConnected && !checkingDrive} checkingDrive={checkingDrive} driveError={driveError}/>
        <GalleryList/>
    </div>
  )
}

export default GalleryImage
