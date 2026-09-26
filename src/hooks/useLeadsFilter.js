import { useState, useMemo } from 'react';

export function useLeadsFilter(initialLeads = []) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  // Filtrado eficiente usando useMemo
  const filteredLeads = useMemo(() => {
    return initialLeads.filter((lead) => {
      const matchesSearch = 
        lead.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.correo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.empresa.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'Todos' || lead.estatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [initialLeads, searchTerm, statusFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredLeads,
  };
}
