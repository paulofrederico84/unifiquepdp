import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Substitui biblioteca antiga por Sidebar + painéis por tipo
import Sidebar from '../components/Sidebar';
import CameraPanel from '../components/CameraPanel';
import SwitchPanel from '../components/SwitchPanel';
import NvrPanel from '../components/NvrPanel';
import RouterPanel from '../components/RouterPanel';
import Canvas from '../components/Canvas';
import PropertiesPanel from '../components/PropertiesPanel';
import { saveProjectLayout, fetchProjectLayout, fetchProject } from '../services/api';

export default function Editor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [placedEquipments, setPlacedEquipments] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [projectName, setProjectName] = useState('Projeto sem nome');
  const [client, setClient] = useState('');
  const [owner, setOwner] = useState('');
  const [address, setAddress] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [imageZoom, setImageZoom] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [imageOffsetX, setImageOffsetX] = useState(0);
  const [imageOffsetY, setImageOffsetY] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTool, setActiveTool] = useState(null); // 'camera', 'switch', etc
  const [isLoading, setIsLoading] = useState(true);

  const selectedEquipment = placedEquipments.find((eq) => eq.instanceId === selectedId);

  // Carregar dados do projeto + layout ao montar
  useEffect(() => {
    let cancelled = false;
    const loadAll = async () => {
      try {
        const [projectData, layoutData] = await Promise.all([
          fetchProject(id).catch(() => ({})),
          fetchProjectLayout(id).catch(() => ({}))
        ]);
        if (cancelled) return;
        const name = layoutData.name || projectData.name;
        setProjectName(name || 'Projeto sem nome');
        setClient(layoutData.client || projectData.client || '');
        setOwner(layoutData.owner || projectData.owner || '');
        setAddress(layoutData.address || projectData.address || '');
        setPlacedEquipments(layoutData.equipments || []);
        setBackgroundImage(layoutData.backgroundImage || projectData.backgroundImage || null);
      } catch (err) {
        console.error('Erro ao carregar projeto/layout:', err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    loadAll();
    return () => { cancelled = true; };
  }, [id]);

  // Retry se nome não chegar na primeira tentativa
  useEffect(() => {
    if (!isLoading && projectName === 'Projeto sem nome') {
      const t = setTimeout(async () => {
        try {
          const projectData = await fetchProject(id).catch(() => ({}));
          if (projectData.name) setProjectName(projectData.name);
        } catch (e) {
          /* silencioso */
        }
      }, 800);
      return () => clearTimeout(t);
    }
  }, [isLoading, projectName, id]);

  const handleAddEquipment = (equipment) => {
    const instanced = { ...equipment, instanceId: equipment.instanceId || `${equipment.id || 'eq'}-${Date.now()}`, x: 120, y: 120 };
    setPlacedEquipments([...placedEquipments, instanced]);
    setSelectedId(instanced.instanceId);
  };

  const handleMoveEquipment = (instanceId, x, y) => {
    setPlacedEquipments(
      placedEquipments.map((eq) =>
        eq.instanceId === instanceId ? { ...eq, x, y } : eq
      )
    );
  };

  const handleUpdateProperty = (instanceId, field, value) => {
    setPlacedEquipments(
      placedEquipments.map((eq) =>
        eq.instanceId === instanceId ? { ...eq, [field]: value } : eq
      )
    );
  };

  const handleDeleteEquipment = (instanceId) => {
    setPlacedEquipments(placedEquipments.filter((eq) => eq.instanceId !== instanceId));
    setSelectedId(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveProjectLayout(id, placedEquipments);
      console.log('Layout salvo com sucesso');
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar o projeto. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  // Auto-save a cada 10 segundos - otimizado para não recriar interval
  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        if (placedEquipments.length > 0) {
          saveProjectLayout(id, placedEquipments).catch(err => console.error('Auto-save error:', err));
        }
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [id, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Carregando projeto...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white p-4 rounded shadow mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded transition-colors"
            >
              ← Voltar
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{projectName}</h1>
              <div className="flex gap-4 mt-1 text-sm text-gray-600">
                {client && <span><strong>Cliente:</strong> {client}</span>}
                {owner && <span><strong>Técnico:</strong> {owner}</span>}
              </div>
              {address && <div className="text-sm text-gray-500 mt-1">{address}</div>}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {isSaving ? 'Salvando...' : `${placedEquipments.length} equipamentos`}
            </div>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
            >
              {isSaving ? 'Salvando...' : 'Salvar Agora'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex gap-4" style={{ height: 'calc(100vh - 180px)' }}>
        {/* Nova Sidebar */}
        <div className="h-full">
          <Sidebar activeTool={activeTool} onSelect={(tool) => setActiveTool(tool === activeTool ? null : tool)} />
        </div>

        <main className="flex-1 bg-white rounded shadow p-4 flex flex-col">
          {backgroundImage && (
            <div className="flex items-center gap-4 mb-3 pb-3 border-b">
              <span className="text-sm font-medium text-gray-700">Imagem de fundo:</span>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-600">Zoom:</label>
                <button onClick={() => setImageZoom(Math.max(0.1, imageZoom - 0.1))} className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm">-</button>
                <span className="text-sm w-12 text-center">{Math.round(imageZoom * 100)}%</span>
                <button onClick={() => setImageZoom(imageZoom + 0.1)} className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm">+</button>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-600">Rotação:</label>
                <button onClick={() => setImageRotation(imageRotation - 15)} className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm">↶</button>
                <span className="text-sm w-12 text-center">{imageRotation}°</span>
                <button onClick={() => setImageRotation(imageRotation + 15)} className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm">↷</button>
              </div>
              <button onClick={() => { setImageZoom(1); setImageRotation(0); setImageOffsetX(0); setImageOffsetY(0); }} className="px-3 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded text-sm ml-auto">Resetar</button>
            </div>
          )}
          <div className="flex-1 overflow-hidden">
            <Canvas
              placedEquipments={placedEquipments}
              onAddEquipment={handleAddEquipment}
              selectedId={selectedId}
              onSelectEquipment={setSelectedId}
              onMoveEquipment={handleMoveEquipment}
              onDeleteEquipment={handleDeleteEquipment}
              backgroundImage={backgroundImage}
              imageZoom={imageZoom}
              imageRotation={imageRotation}
              imageOffsetX={imageOffsetX}
              imageOffsetY={imageOffsetY}
              onOffsetChange={(x, y) => { setImageOffsetX(x); setImageOffsetY(y); }}
            />
          </div>
        </main>

        {/* Painel flutuante de câmeras (Catálogo) */}
        {activeTool === 'camera' && (
          <CameraPanel
            onClose={() => setActiveTool(null)}
            onAddEquipment={handleAddEquipment}
            placedEquipments={placedEquipments}
            onDeleteEquipment={handleDeleteEquipment}
            onDuplicateEquipment={(eq) => handleAddEquipment({ ...eq, instanceId: undefined })}
          />
        )}
        {activeTool === 'switch' && (
          <SwitchPanel
            onClose={() => setActiveTool(null)}
            placedEquipments={placedEquipments}
            onDeleteEquipment={handleDeleteEquipment}
            onDuplicateEquipment={(eq) => handleAddEquipment({ ...eq, instanceId: undefined })}
          />
        )}
        {activeTool === 'nvr' && (
          <NvrPanel
            onClose={() => setActiveTool(null)}
            placedEquipments={placedEquipments}
            onDeleteEquipment={handleDeleteEquipment}
            onDuplicateEquipment={(eq) => handleAddEquipment({ ...eq, instanceId: undefined })}
          />
        )}
        {activeTool === 'router' && (
          <RouterPanel
            onClose={() => setActiveTool(null)}
            placedEquipments={placedEquipments}
            onDeleteEquipment={handleDeleteEquipment}
            onDuplicateEquipment={(eq) => handleAddEquipment({ ...eq, instanceId: undefined })}
          />
        )}

        {/* Painel de propriedades flutuante - aparece apenas quando equipamento selecionado */}
        {selectedEquipment && (
          <aside className="fixed right-6 top-32 w-80 bg-white p-4 rounded-lg shadow-2xl border-2 border-blue-400 z-30 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">Propriedades</h3>
              <button
                onClick={() => setSelectedId(null)}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
                title="Fechar"
              >
                ×
              </button>
            </div>
            <PropertiesPanel
              selectedEquipment={selectedEquipment}
              onUpdateProperty={handleUpdateProperty}
              onDelete={handleDeleteEquipment}
            />
          </aside>
        )}
      </div>
    </div>
  );
}
