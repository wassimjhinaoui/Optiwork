// utils/metrics.ts

interface DateData {
    started: string;
    finished: string;
    issued: string;
    deadline: string;
    Tasks: {
      weight: string;
      state: string;
    };
  }
  
  export interface MetricsResult {
    productivity: number;
    onTime: boolean;
    timeSpent: number; // in hours
    remainingTime: number; // in hours
    progress: number; // percentage
    efficiency: number; // weighted productivity
    status: 'ahead' | 'behind' | 'on-track';
  }
  
  export const calculateMetrics = (dateData: DateData): MetricsResult => {
    // Convert strings to Date objects
    const start = new Date(dateData.started);
    const finish = dateData.finished ? new Date(dateData.finished) : new Date();
    const issued = new Date(dateData.issued);
    const deadline = new Date(dateData.deadline);
  
    // Calculate time differences in milliseconds
    const actualTime = finish.getTime() - start.getTime();
    const allocatedTime = deadline.getTime() - issued.getTime();
    
    // Calculate productivity (ratio of actual time to allocated time)
    const productivity = 1 - (actualTime / allocatedTime);
    
    // Calculate if task was completed on time
    const onTime = finish <= deadline;
    
    // Calculate time spent in hours
    const timeSpent = actualTime / (1000 * 60 * 60);
    
    // Calculate remaining time in hours
    const remainingTime = (deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60);
    
    // Calculate progress based on time spent vs allocated time
    const progress = Math.min((actualTime / allocatedTime) * 100, 100);
    
    // Calculate efficiency (productivity weighted by task weight)
    const efficiency = productivity * Number(dateData.Tasks.weight);
    
    // Determine status
    let status: 'ahead' | 'behind' | 'on-track';
    if (productivity > 0.1) {
      status = 'ahead';
    } else if (productivity < -0.1) {
      status = 'behind';
    } else {
      status = 'on-track';
    }
  
    return {
      productivity: Number((productivity * 100).toFixed(2)),
      onTime,
      timeSpent: Number(timeSpent.toFixed(2)),
      remainingTime: Number(remainingTime.toFixed(2)),
      progress: Number(progress.toFixed(2)),
      efficiency: Number(efficiency.toFixed(2)),
      status
    };
  };
  
  export const calculateTeamMetrics = (datesData: DateData[]): {
    averageProductivity: number;
    tasksOnTime: number;
    totalTasks: number;
    averageEfficiency: number;
  } => {
    const metrics = datesData.map(calculateMetrics);
    
    return {
      averageProductivity: Number((metrics.reduce((acc, m) => acc + m.productivity, 0) / metrics.length).toFixed(2)),
      tasksOnTime: metrics.filter(m => m.onTime).length,
      totalTasks: metrics.length,
      averageEfficiency: Number((metrics.reduce((acc, m) => acc + m.efficiency, 0) / metrics.length).toFixed(2))
    };
  };
  
  // Function to get formatted duration
  export const getFormattedDuration = (hours: number): string => {
    const days = Math.floor(hours / 24);
    const remainingHours = Math.floor(hours % 24);
    const minutes = Math.floor((hours * 60) % 60);
  
    if (days > 0) {
      return `${days}d ${remainingHours}h`;
    }
    if (remainingHours > 0) {
      return `${remainingHours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };