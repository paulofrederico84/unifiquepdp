import React, { useState, lazy, Suspense } from 'react'
const Autocomplete = lazy(() => import('react-google-autocomplete'))
import { useNavigate } from 'react-router-dom'
import { createProject } from '../services/api'

export default function NewProject() {
  const [form, setForm] = useState({ name: '', client: '', owner: '', address: '', due_date: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [step, setStep] = useState(1)
  const [backgroundType, setBackgroundType] = useState('upload')
  const [googleMapsUrl, setGoogleMapsUrl] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  const [uploadedImageBase64, setUploadedImageBase64] = useState(null)
  const [locationMethod, setLocationMethod] = useState('current')
  const [manualAddress, setManualAddress] = useState('')
  const [mapCenter, setMapCenter] = useState({ lat: -23.550520, lng: -46.633308 }) // São Paulo default
  const [mapZoom, setMapZoom] = useState(15)
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (file) {
      setUploadedImage(file)
      const reader = new FileReader()
      reader.onload = (evt) => {
        setUploadedImageBase64(evt.target.result)
        console.log('Imagem carregada:', file.name)
      }
      reader.readAsDataURL(file)
    }
  }

  function handleNextFromBackgroundSelection() {
    if (backgroundType === 'maps') {
      setStep(3)
    } else {
      handleSubmit()
    }
  }

  function handleUseCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setMapCenter({ lat: latitude, lng: longitude })
          setMapZoom(18)
          setStep(4) // Ir para o mapa interativo
          console.log('Localização atual:', latitude, longitude)
        },
        (error) => {
          console.error('Erro ao obter localização:', error)
          alert('Não foi possível obter sua localização. Verifique as permissões do navegador.')
        }
      )
    } else {
      alert('Geolocalização não é suportada pelo seu navegador.')
    }
  }

  function handleAddressSelected(place) {
    if (place && place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()
      setManualAddress(place.formatted_address)
      setMapCenter({ lat, lng })
      setMapZoom(18)
      setStep(4) // Ir para o mapa interativo
    }
  }

  function handleNavigateToMap() {
    setStep(4) // Ir para o mapa interativo com centro padrão
  }

  function handleCaptureMapArea() {
    // TODO: Implementar captura da área do mapa
    // Por enquanto, apenas salva a URL e cria o projeto
    setGoogleMapsUrl(`https://www.google.com/maps/@${mapCenter.lat},${mapCenter.lng},${mapZoom}z`)
    handleSubmit()
  }

  async function handleSubmit(e) {
    if (e) e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const projectData = {
        ...form,
        backgroundType,
        backgroundSource: backgroundType === 'maps' ? googleMapsUrl : uploadedImage?.name,
        backgroundImage: backgroundType === 'upload' ? uploadedImageBase64 : null,
        locationMethod: backgroundType === 'maps' ? locationMethod : null
      }
      const result = await createProject(projectData)
      console.log('Project created:', result)
      navigate(`/projects/${result.id}/editor`)
    } catch (err) {
      setError(err.message || 'Erro ao criar projeto')
      console.error('Error creating project:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-4xl mx-auto">
        {step === 1 && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Novo Projeto</h2>
            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do projeto</label>
                <input
                  name="name"
                  placeholder="Digite o nome do projeto"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
                <input
                  name="client"
                  placeholder="Nome do cliente"
                  value={form.client}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Responsável técnico</label>
                <input
                  name="owner"
                  placeholder="Nome do responsável"
                  value={form.owner}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço</label>
                <input
                  name="address"
                  placeholder="Endereço completo do projeto"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Previsão de Entrega</label>
                <input
                  name="due_date"
                  type="date"
                  value={form.due_date}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2"
                >
                  Próximo
                  <span>→</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Iniciar Novo Projeto</h2>
            <h3 className="text-xl font-semibold mb-6 text-green-600">Selecionar fundo</h3>

            <div className="space-y-4">
              <label className={`block p-6 border-2 rounded-lg cursor-pointer transition-all ${backgroundType === 'upload' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                <div className="flex items-start gap-4">
                  <input type="radio" name="backgroundType" value="upload" checked={backgroundType === 'upload'} onChange={(e) => setBackgroundType(e.target.value)} className="mt-1 w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">📤</span>
                      <h4 className="text-lg font-bold">Carregar arquivo</h4>
                    </div>
                    <p className="text-sm text-gray-600">Faça upload do seu próprio arquivo com imagem de fundo. Formatos disponíveis: JPG, PNG, PDF</p>
                    {backgroundType === 'upload' && (
                      <div className="mt-4">
                        <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded" />
                        {uploadedImage && <p className="text-sm text-green-600 mt-2">✓ {uploadedImage.name}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </label>

              <label className={`block p-6 border-2 rounded-lg cursor-pointer transition-all ${backgroundType === 'maps' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                <div className="flex items-start gap-4">
                  <input type="radio" name="backgroundType" value="maps" checked={backgroundType === 'maps'} onChange={(e) => setBackgroundType(e.target.value)} className="mt-1 w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🗺️</span>
                      <h4 className="text-lg font-bold">Google Maps</h4>
                    </div>
                    <p className="text-sm text-gray-600">Selecione imagem de satélite do Google Maps.</p>
                  </div>
                </div>
              </label>

              <label className={`block p-6 border-2 rounded-lg cursor-pointer transition-all ${backgroundType === 'blank' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                <div className="flex items-start gap-4">
                  <input type="radio" name="backgroundType" value="blank" checked={backgroundType === 'blank'} onChange={(e) => setBackgroundType(e.target.value)} className="mt-1 w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">📋</span>
                      <h4 className="text-lg font-bold">Fundo vazio</h4>
                    </div>
                    <p className="text-sm text-gray-600">Iniciar com fundo vazio com tamanho e cor predefinidos.</p>
                  </div>
                </div>
              </label>

              <label className={`block p-6 border-2 rounded-lg cursor-pointer transition-all ${backgroundType === 'existing' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}>
                <div className="flex items-start gap-4">
                  <input type="radio" name="backgroundType" value="existing" checked={backgroundType === 'existing'} onChange={(e) => setBackgroundType(e.target.value)} className="mt-1 w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">📁</span>
                      <h4 className="text-lg font-bold">Abrir projeto existente</h4>
                    </div>
                    <p className="text-sm text-gray-600">Abrir projeto existente da sua conta.</p>
                  </div>
                </div>
              </label>
            </div>

            <div className="flex justify-between gap-3 pt-6 mt-6 border-t">
              <button type="button" onClick={() => setStep(1)} className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium">← Voltar</button>
              <button type="button" onClick={handleNextFromBackgroundSelection} disabled={loading} className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2 disabled:bg-gray-400">
                {loading ? 'Criando...' : 'Próximo'} <span>→</span>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="border-2 border-green-500 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📍</span>
                <h2 className="text-2xl font-bold text-gray-800">Selecionar endereço</h2>
              </div>
              <p className="text-gray-600">Encontre o local digitando o endereço na caixa de pesquisa</p>

              <div className="mt-4">
                <Suspense fallback={<input
                  type="text"
                  placeholder="Digite o endereço"
                  value={manualAddress}
                  onChange={(e) => { setManualAddress(e.target.value); setLocationMethod('address') }}
                  className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />}>
                  <Autocomplete
                    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                    libraries={["places"]}
                    placeholder="Digite o endereço"
                    className="w-full p-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onPlaceSelected={handleAddressSelected}
                    options={{
                      types: ['address'],
                      componentRestrictions: { country: 'br' }
                    }}
                    value={manualAddress}
                    onChange={(e) => {
                      setManualAddress(e.target.value);
                      setLocationMethod('address');
                    }}
                  />
                </Suspense>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleUseCurrentLocation}
                className={`w-full p-6 border-2 rounded-lg text-left transition-all ${locationMethod === 'current' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">📍</span>
                  <div>
                    <h4 className="text-lg font-bold text-blue-600 mb-1">Usar minha localização atual</h4>
                    <p className="text-sm text-gray-600">Permite acesso à sua localização para encontrar automaticamente</p>
                  </div>
                </div>
              </button>

              <button
                onClick={handleNavigateToMap}
                className={`w-full p-6 border-2 rounded-lg text-left transition-all ${locationMethod === 'navigate' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'
                  }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">🗺️</span>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold mb-1">Navegue no mapa</h4>
                    <p className="text-sm text-gray-600">Navegue até o local desejado no mapa interativo</p>
                  </div>
                  <span className="text-2xl">→</span>
                </div>
              </button>
            </div>

            <div className="flex justify-between gap-3 pt-6 mt-6 border-t">
              <button type="button" onClick={() => setStep(2)} className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium flex items-center gap-2"><span>←</span> Voltar</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Selecionar área no mapa</h2>

            <div className="mb-6">
              <div className="w-full h-[600px] border-2 border-gray-300 rounded-lg overflow-hidden">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&center=${mapCenter.lat},${mapCenter.lng}&zoom=${mapZoom}&maptype=satellite`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <p className="text-sm text-gray-600 mt-2">Navegue no mapa para selecionar a área desejada. Use os controles para ajustar zoom e posição.</p>
            </div>

            <div className="flex justify-between gap-3 pt-6 mt-6 border-t">
              <button type="button" onClick={() => setStep(3)} className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium flex items-center gap-2"><span>←</span> Voltar</button>
              <button type="button" onClick={handleCaptureMapArea} disabled={loading} className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center gap-2 disabled:bg-gray-400">
                {loading ? 'Criando...' : 'Próximo'} <span>→</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
