import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Layout from '../components/Layout'; // <-- Importamos tu Layout oficial
import { useLeadsFilter } from '../hooks/useLeadsFilter';

// Formateador de moneda en MXN (igual que en tus Oportunidades)
const currency = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });

const DATA_MOCK_LEADS = [
  { id: 1, nombre: 'Carlos Mendoza', empresa: 'TechSolutions', correo: 'carlos@tech.com', telefono: '331-234-5678', estatus: 'Prospecto', valorEstimado: 85000 },
  { id: 2, nombre: 'Ana María Gómez', empresa: 'Innovación Educativa', correo: 'ana.gomez@edu.mx', telefono: '334-987-6543', estatus: 'Propuesta', valorEstimado: 120000 },
  { id: 3, nombre: 'Sofía Villanueva', empresa: 'Grupo Comercial Jal', correo: 'sofia@comercialjal.com', telefono: '332-555-0199', estatus: 'Ganado', valorEstimado: 45000 },
];

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  // Integración limpia de tus Filtros
  const filteredLeads = DATA_MOCK_LEADS.filter((lead) => {
    const matchesSearch = 
      lead.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Todos' || lead.estatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Cálculos dinámicos utilizando tus clases
  const totalLeadsValue = filteredLeads.reduce((sum, lead) => sum + lead.valorEstimado, 0);

  const getBadgeColor = (status) => {
    const colors = {
      Prospecto: 'bg-blue-100 text-blue-800',
      Calificación: 'bg-purple-100 text-purple-800',
      Propuesta: 'bg-yellow-100 text-yellow-800',
      Ganado: 'bg-green-100 text-green-800',
      Perdido: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout
      title="Prospectos"
      subtitle="Administración de leads — gestiona y filtra los contactos de tu embudo comercial"
      actions={
        <button className="btn-primary">
          + Nuevo prospecto
        </button>
      }
    >
      {/* Tarjetas de Métricas usando tu clase .card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <p className="text-xs text-ink-500 font-medium">Valor Estimado de Leads</p>
          <p className="text-xl font-bold text-ink-950 mt-1">{currency.format(totalLeadsValue)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-ink-500 font-medium">Prospectos Filtrados</p>
          <p className="text-xl font-bold text-ink-950 mt-1">{filteredLeads.length}</p>
        </div>
      </div>

      {/* Barra de Búsqueda y Filtros usando tu clase .input */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre o empresa..."
          className="input sm:max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="input sm:max-w-xs"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="Todos">Todas las etapas</option>
          <option value="Prospecto">Prospecto</option>
          <option value="Calificación">Calificación</option>
          <option value="Propuesta">Propuesta</option>
          <option value="Ganado">Ganado</option>
          <option value="Perdido">Perdido</option>
        </select>
      </div>

      {/* Tabla Estilizada con el diseño unificado de tu CRM */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-medium tracking-wider">
              <tr>
                <th className="px-6 py-4">Nombre / Empresa</th>
                <th className="px-6 py-4">Contacto</th>
                <th className="px-6 py-4">Valor Estimado</th>
                <th className="px-6 py-4">Estatus</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700 bg-white">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{lead.nombre}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{lead.empresa}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600">{lead.correo}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{lead.telefono}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {currency.format(lead.valorEstimado)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getBadgeColor(lead.estatus)}`}>
                        {lead.estatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-xs font-medium">
                      <button className="text-gray-400 hover:text-gray-600 mr-4 transition-colors">Editar</button>
                      <button className="text-red-400 hover:text-red-600 transition-colors">Eliminar</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-12 text-gray-400 font-medium">
                    No se encontraron prospectos registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
