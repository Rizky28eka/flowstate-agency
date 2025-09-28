import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { salesLeads as initialLeads } from "@/lib/mock-data";
import { DollarSign, User, Calendar } from "lucide-react";
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const pipelineStatuses = ["Prospect", "Qualified", "Proposal", "Negotiation"];

const statusColors: Record<string, string> = {
  Prospect: "bg-blue-100 text-blue-700 border border-blue-200",
  Qualified: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Proposal: "bg-orange-100 text-orange-700 border border-orange-200",
  Negotiation: "bg-purple-100 text-purple-700 border border-purple-200",
};

const DraggableLeadCard = ({ lead }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: lead.id });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Card className="mb-3 rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 cursor-grab">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-semibold text-gray-800">{lead.companyName}</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-2 text-sm text-gray-600">
          <div className="flex items-center mb-2"><User className="h-4 w-4 mr-2 text-gray-500" /><span>{lead.contactPerson}</span></div>
          <div className="flex items-center mb-2"><DollarSign className="h-4 w-4 mr-2 text-gray-500" /><span className="font-medium text-gray-700">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(lead.potentialValue)}</span></div>
          <div className="flex items-center text-xs text-gray-500"><Calendar className="h-4 w-4 mr-2" /><span>Last Contact: {lead.lastContactDate}</span></div>
          <Badge className="mt-3" variant="outline">Probability: {lead.probability}%</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

const DroppablePipelineColumn = ({ status, leads }) => {
  const { setNodeRef } = useDroppable({ id: status });
  const totalValue = leads.reduce((sum, lead) => sum + lead.potentialValue, 0);

  return (
    <div ref={setNodeRef} className="bg-white rounded-2xl border p-4 flex flex-col h-[80vh]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg flex items-center"><Badge className={`mr-2 text-sm px-3 py-1 ${statusColors[status]}`}>{status}</Badge><span className="text-gray-700">({leads.length})</span></h3>
        <span className="font-bold text-gray-700 text-sm">{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact" }).format(totalValue)}</span>
      </div>
      <div className="flex-1 overflow-y-auto pr-2">
        {leads.length > 0 ? leads.map((lead) => <DraggableLeadCard key={lead.id} lead={lead} />) : <p className="text-xs text-gray-400 text-center mt-6">Drop leads here</p>}
      </div>
    </div>
  );
};

const OwnerSalesPipeline = () => {
  const [salesLeads, setSalesLeads] = useState(initialLeads);

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (over) {
      const newStatus = over.id as string;
      setSalesLeads((prevLeads) => {
        const leadIndex = prevLeads.findIndex(lead => lead.id === active.id);
        if (leadIndex > -1) {
          const updatedLeads = [...prevLeads];
          updatedLeads[leadIndex] = { ...updatedLeads[leadIndex], status: newStatus };
          return updatedLeads;
        }
        return prevLeads;
      });
    }
  };

  const leadsByStatus = pipelineStatuses.reduce((acc, status) => {
    acc[status] = salesLeads.filter((lead) => lead.status === status);
    return acc;
  }, {} as Record<string, typeof salesLeads>);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-4 md:p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Sales Pipeline</h1>
          <p className="text-gray-500">Drag and drop leads to update their status in the pipeline.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pipelineStatuses.map((status) => (
            <DroppablePipelineColumn
              key={status}
              status={status}
              leads={leadsByStatus[status]}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default OwnerSalesPipeline;