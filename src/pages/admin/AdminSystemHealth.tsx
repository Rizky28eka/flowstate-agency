import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Server, Database, Zap, HardDrive, Wifi, Globe, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, XCircle } from "lucide-react";

import { systemMetrics, services } from "@/lib/mock-data";

const AdminSystemHealth = () => {

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "warning": return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case "error": return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <CheckCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "text-green-600";
      case "warning": return "text-amber-600";
      case "critical": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const iconMap = {
    "CPU Utilization": Server,
    "Memory Usage": HardDrive,
    "Database Connections": Database,
    "API Response Time": Zap,
    "Network Throughput": Wifi,
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">System Health</h1>
        <p className="text-muted-foreground">Monitor system performance and service status</p>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">System Status</CardTitle>
            <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold text-green-600">Healthy</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Uptime</CardTitle>
            <Server className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Response Time</CardTitle>
            <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">245ms</div>
            <p className="text-xs text-muted-foreground">Average response time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-teal-600" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        {/* System Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">System Metrics</CardTitle>
            <CardDescription>Real-time system resource usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 sm:space-y-6">
              {systemMetrics.map((metric) => {
                const IconComponent = iconMap[metric.name as keyof typeof iconMap] || Activity;
                return (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 min-w-0">
                        <IconComponent className="w-4 h-4 shrink-0" />
                        <span className="font-medium text-sm sm:text-base truncate">{metric.name}</span>
                      </div>
                      <span className={`font-bold ${getStatusColor(metric.status)}`}>
                        {metric.name === 'API Response Time' ? `${metric.value}ms` : `${metric.value}%`}
                      </span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Service Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Service Status</CardTitle>
            <CardDescription>Status of all system services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
                    {getStatusIcon(service.status)}
                    <div className="min-w-0">
                      <p className="font-medium text-sm sm:text-base truncate">{service.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Uptime: {service.uptime}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={service.status === "running" ? "default" : "secondary"}>
                      {service.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1 hidden sm:block">{service.lastCheck}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSystemHealth;