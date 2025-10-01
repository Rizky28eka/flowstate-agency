import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useQueryClient } from '@tanstack/react-query';

const SOCKET_URL = 'http://localhost:3001'; // Your backend URL

let socket: Socket;

export const useRealtimeUpdates = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    // Initialize socket connection
    if (!socket) {
      socket = io(SOCKET_URL);

      socket.on('connect', () => {
        console.log('Connected to WebSocket server with ID:', socket.id);
      });

      // --- REAL-TIME EVENT LISTENERS ---

      // Listener for project updates
      socket.on('project_updated', (updatedProject) => {
        console.log('Received project_updated event:', updatedProject);
        
        // Invalidate the 'projects' query to trigger a re-fetch
        queryClient.invalidateQueries({ queryKey: ['projects'] });

        // You can also update a single project query if you have one
        queryClient.invalidateQueries({ queryKey: ['project', updatedProject.id] });
      });

      // Listener for employee updates
      socket.on('employee_updated', (updatedEmployee) => {
        console.log('Received employee_updated event:', updatedEmployee);
        queryClient.invalidateQueries({ queryKey: ['employees'] });
        queryClient.invalidateQueries({ queryKey: ['employee', updatedEmployee.id] });
      });

      // Listener for report updates
      socket.on('report_updated', (updatedReport) => {
        console.log('Received report_updated event:', updatedReport);
        queryClient.invalidateQueries({ queryKey: ['reports'] });
        queryClient.invalidateQueries({ queryKey: ['report', updatedReport.id] });
      });

      // Listener for analytics updates
      socket.on('analytics_updated', () => {
        console.log('Received analytics_updated event');
        queryClient.invalidateQueries({ queryKey: ['analytics'] });
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });
    }

    // Cleanup on component unmount
    return () => {
      if (socket && socket.connected) {
        // You might not want to disconnect on every unmount
        // depending on your app's structure.
        // For a global listener, you might initialize this in App.tsx
        // and never disconnect.
      }
    };
  }, [queryClient]);
};
